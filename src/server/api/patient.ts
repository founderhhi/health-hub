import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';
import { createMeetingToken, deleteRoom } from '../integrations/daily';

export const patientRouter = Router();

async function cleanupDailyRoom(roomUrl: string | null | undefined): Promise<void> {
  if (!roomUrl) {
    return;
  }

  try {
    await deleteRoom(roomUrl);
  } catch (error) {
    console.error('Daily room cleanup error:', error);
  }
}

function getDailyRoomName(roomUrl: string | null | undefined): string | null {
  if (!roomUrl) {
    return null;
  }

  try {
    const parsed = new URL(roomUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    return segments.length > 0 ? segments[0] : null;
  } catch {
    return null;
  }
}

function withMeetingToken(roomUrl: string | null | undefined, token: string | null): string | null {
  if (!roomUrl) {
    return null;
  }
  if (!token) {
    return roomUrl;
  }

  try {
    const parsed = new URL(roomUrl);
    parsed.searchParams.set('t', token);
    return parsed.toString();
  } catch {
    const separator = roomUrl.includes('?') ? '&' : '?';
    return `${roomUrl}${separator}t=${encodeURIComponent(token)}`;
  }
}

patientRouter.post('/consults', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const { mode, symptoms } = req.body as { mode?: string; symptoms?: unknown };
    const user = (req as any).user;

    const insert = await db.query(
      `insert into consult_requests (patient_id, mode, symptoms)
       values ($1, $2, $3) returning *`,
      [user.userId, mode || 'video', symptoms || {}]
    );

    const request = insert.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        user.userId,
        'consult.requested',
        'Your GP request has been submitted.',
        JSON.stringify({ requestId: request.id })
      ]
    );
    broadcastToRole('gp', 'queue.updated', { request });
    broadcastToRole('doctor', 'queue.updated', { request });
    broadcastToUser(user.userId, 'patient.consult.requested', { request });

    return res.json({ request });
  } catch (error) {
    console.error('Create consult request error', error);
    return res.status(500).json({ error: 'Unable to create consult request' });
  }
});

patientRouter.get('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      'select id, role, phone, display_name, created_at from users where id = $1',
      [user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user profile error', error);
    return res.status(500).json({ error: 'Unable to fetch profile' });
  }
});

// API-08: Update patient profile
patientRouter.put('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { displayName, firstName, lastName } = req.body as {
      displayName?: string;
      firstName?: string;
      lastName?: string;
    };

    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (displayName !== undefined) {
      fields.push(`display_name = $${idx++}`);
      values.push(displayName);
    }
    if (firstName !== undefined) {
      fields.push(`first_name = $${idx++}`);
      values.push(firstName);
    }
    if (lastName !== undefined) {
      fields.push(`last_name = $${idx++}`);
      values.push(lastName);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(user.userId);
    const result = await db.query(
      `update users set ${fields.join(', ')} where id = $${idx} returning id, role, phone, display_name, first_name, last_name, created_at`,
      values
    );

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Update profile error', error);
    return res.status(500).json({ error: 'Unable to update profile' });
  }
});

patientRouter.get('/referrals', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select r.*, u.display_name as specialist_name, u.phone as specialist_phone
       from referrals r
       left join users u on u.id = r.to_specialist_id
       where r.patient_id = $1
       order by r.created_at desc`,
      [user.userId]
    );
    return res.json({ referrals: result.rows });
  } catch (error) {
    console.error('List patient referrals error', error);
    return res.status(500).json({ error: 'Unable to list referrals' });
  }
});

patientRouter.get('/lab-orders', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select lo.*, u.display_name as specialist_name
       from lab_orders lo
       left join users u on u.id = lo.specialist_id
       where lo.patient_id = $1
       order by lo.created_at desc`,
      [user.userId]
    );
    return res.json({ orders: result.rows });
  } catch (error) {
    console.error('List patient lab orders error', error);
    return res.status(500).json({ error: 'Unable to list lab orders' });
  }
});

patientRouter.get('/consults', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      'select * from consult_requests where patient_id = $1 order by created_at desc',
      [user.userId]
    );
    return res.json({ requests: result.rows });
  } catch (error) {
    console.error('List consult requests error', error);
    return res.status(500).json({ error: 'Unable to list consult requests' });
  }
});

// Issue 1: Get active consult request with consultation details (for recovery after refresh/WS drop)
patientRouter.get('/consults/active', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    // Find the most recent waiting or accepted request, and join consultation if accepted
    const result = await db.query(
      `select cr.*,
              c.id as consultation_id,
              c.daily_room_url,
              c.status as consultation_status,
              u.display_name as gp_name
       from consult_requests cr
       left join consultations c on c.request_id = cr.id and c.status = 'active'
       left join users u on u.id = c.gp_id
       where cr.patient_id = $1
         and (
           cr.status = 'waiting'
           or (cr.status = 'accepted' and c.id is not null)
         )
       order by cr.created_at desc
       limit 1`,
      [user.userId]
    );

    if (result.rows.length === 0) {
      return res.json({ active: null });
    }

    const active = { ...result.rows[0] } as Record<string, any>;
    if (active['status'] === 'accepted' && active['daily_room_url']) {
      const roomName = getDailyRoomName(active['daily_room_url'] as string);
      if (roomName) {
        const token = await createMeetingToken(roomName, user.userId);
        active['daily_room_url'] = withMeetingToken(active['daily_room_url'] as string, token);
      }
    }

    return res.json({ active });
  } catch (error) {
    console.error('Get active consult error', error);
    return res.status(500).json({ error: 'Unable to fetch active consult' });
  }
});

// Issue 3: Cancel a consult request (patient-initiated)
patientRouter.post('/consults/:id/cancel', requireAuth, requireRole(['patient']), async (req, res) => {
  const client = await db.connect();

  try {
    const user = (req as any).user;
    const { id } = req.params;
    let endedConsultation: any = null;
    let cancelledRequest: any = null;

    await client.query('BEGIN');

    const requestResult = await client.query(
      `select * from consult_requests
       where id = $1 and patient_id = $2
       for update`,
      [id, user.userId]
    );

    if (requestResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Consult request not found' });
    }

    const request = requestResult.rows[0];
    if (!['waiting', 'accepted'].includes(request.status)) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Request can no longer be cancelled' });
    }

    const cancelledResult = await client.query(
      `update consult_requests
       set status = 'cancelled'
       where id = $1
       returning *`,
      [id]
    );
    cancelledRequest = cancelledResult.rows[0];

    if (request.status === 'accepted') {
      const consultationResult = await client.query(
        `update consultations
         set status = 'ended', ended_at = now()
         where request_id = $1 and patient_id = $2 and status = 'active'
         returning *`,
        [id, user.userId]
      );
      endedConsultation = consultationResult.rows[0] || null;

      if (endedConsultation?.gp_id) {
        await client.query(
          `insert into notifications (user_id, type, message, data)
           values ($1, $2, $3, $4)`,
          [
            endedConsultation.gp_id,
            'consult.cancelled',
            'Patient cancelled the consultation.',
            JSON.stringify({ consultationId: endedConsultation.id, requestId: id })
          ]
        );
      }
    }

    await client.query('COMMIT');

    if (endedConsultation?.daily_room_url) {
      await cleanupDailyRoom(endedConsultation.daily_room_url);
    }

    if (endedConsultation) {
      // Notify both sides so open consult shells close immediately.
      broadcastToUser(user.userId, 'consult.completed', { consultation: endedConsultation });
      if (endedConsultation.gp_id) {
        broadcastToUser(endedConsultation.gp_id, 'consult.completed', { consultation: endedConsultation });
      }
    }

    broadcastToRole('gp', 'queue.updated', { cancelledId: id });
    broadcastToRole('doctor', 'queue.updated', { cancelledId: id });

    return res.json({ success: true, request: cancelledRequest, consultation: endedConsultation });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // no-op
    }
    console.error('Cancel consult request error', error);
    return res.status(500).json({ error: 'Unable to cancel request' });
  } finally {
    client.release();
  }
});

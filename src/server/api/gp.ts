import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createDailyRoom, createMeetingToken, deleteRoom } from '../integrations/daily';
import { broadcastToUser, broadcastToRole } from '../realtime/ws';

export const gpRouter = Router();

type MeetingTokenPayload = {
  token: string | null;
  expiresAt: string | null;
  roomName: string | null;
};

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

async function generateMeetingToken(roomUrl: string | null | undefined, userId: string): Promise<MeetingTokenPayload> {
  const roomName = getDailyRoomName(roomUrl);

  if (!roomName) {
    return {
      token: null,
      expiresAt: null,
      roomName
    };
  }

  try {
    const token = await createMeetingToken(roomName, userId);
    const expiresAt = token ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : null;

    return {
      token,
      expiresAt,
      roomName
    };
  } catch (error) {
    console.error('Daily meeting token generation error:', error);
    return {
      token: null,
      expiresAt: null,
      roomName
    };
  }
}

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

gpRouter.get('/queue', requireAuth, requireRole(['gp', 'doctor']), async (_req, res) => {
  try {
    const result = await db.query(
      `select cr.*, u.display_name, u.first_name, u.last_name, u.phone
       from consult_requests cr
       join users u on u.id = cr.patient_id
       where cr.status = 'waiting'
       order by cr.created_at asc`
    );
    return res.json({ queue: result.rows });
  } catch (error) {
    console.error('Queue fetch error', error);
    return res.status(500).json({ error: 'Unable to fetch queue' });
  }
});

gpRouter.post('/queue/:id/accept', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const client = await db.connect();
    let request: any = null;
    let consultation: any = null;

    try {
      await client.query('BEGIN');

      const requestResult = await client.query(
        `select * from consult_requests where id = $1 for update`,
        [id]
      );

      if (requestResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Request not found' });
      }

      request = requestResult.rows[0];

      if (request.status !== 'waiting') {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'Request already accepted or no longer waiting' });
      }

      const roomUrl = await createDailyRoom();

      await client.query(
        `update consult_requests
         set status = 'accepted', accepted_at = now()
         where id = $1`,
        [id]
      );

      const consultResult = await client.query(
        `insert into consultations (request_id, patient_id, gp_id, daily_room_url)
         values ($1, $2, $3, $4)
         returning *`,
        [request.id, request.patient_id, user.userId, roomUrl]
      );

      consultation = consultResult.rows[0];

      await client.query(
        `insert into notifications (user_id, type, message, data)
         values ($1, $2, $3, $4)`,
        [
          request.patient_id,
          'consult.accepted',
          'A GP accepted your request. Join the consultation.',
          JSON.stringify({ consultationId: consultation.id })
        ]
      );

      await client.query('COMMIT');
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch {
      }
      throw error;
    } finally {
      client.release();
    }

    const gpMeetingToken = await generateMeetingToken(consultation.daily_room_url, user.userId);
    const patientMeetingToken = await generateMeetingToken(consultation.daily_room_url, request.patient_id);
    const gpJoinUrl = withMeetingToken(consultation.daily_room_url, gpMeetingToken.token);
    const patientJoinUrl = withMeetingToken(consultation.daily_room_url, patientMeetingToken.token);
    const consultationForGp = {
      ...consultation,
      daily_room_url: gpJoinUrl
    };
    const consultationForPatient = {
      ...consultation,
      daily_room_url: patientJoinUrl
    };

    broadcastToUser(request.patient_id, 'consult.accepted', {
      requestId: request.id,
      consultation: consultationForPatient,
      roomUrl: patientJoinUrl
    });
    broadcastToRole('gp', 'queue.updated', { acceptedId: request.id });
    broadcastToRole('doctor', 'queue.updated', { acceptedId: request.id });

    return res.json({
      consultation: consultationForGp,
      roomUrl: gpJoinUrl,
      meetingToken: gpMeetingToken
    });
  } catch (error) {
    console.error('Accept consult error', error);
    return res.status(500).json({ error: 'Unable to accept consult' });
  }
});

// Delete patient from queue (manual or timeout)
gpRouter.post('/queue/:id/delete', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body as { reason?: 'timeout' | 'manual' };
    const user = (req as any).user;

    // Get the request details before deleting
    const requestResult = await db.query(
      `select * from consult_requests where id = $1`,
      [id]
    );

    if (requestResult.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const request = requestResult.rows[0];

    // Update the request status to removed
    await db.query(
      `update consult_requests
       set status = 'removed', removed_at = now(), removed_reason = $2, removed_by = $3
       where id = $1`,
      [id, reason || 'manual', user.userId]
    );

    // Notify the patient
    const message = reason === 'timeout'
      ? 'Your consultation request has timed out after 15 minutes. Please request again.'
      : 'A GP has declined your consultation request. You can try again.';

    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        request.patient_id,
        reason === 'timeout' ? 'consult.timeout' : 'consult.declined',
        message,
        JSON.stringify({ requestId: request.id, reason })
      ]
    );

    broadcastToUser(request.patient_id, 'consult.removed', {
      requestId: request.id,
      reason: reason || 'manual'
    });

    broadcastToRole('gp', 'queue.updated', { removedId: request.id });
    broadcastToRole('doctor', 'queue.updated', { removedId: request.id });

    return res.json({ success: true, message: 'Request removed from queue' });
  } catch (error) {
    console.error('Delete from queue error', error);
    return res.status(500).json({ error: 'Unable to remove from queue' });
  }
});

// Update GP operational status
gpRouter.post('/status', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { operational } = req.body as { operational?: boolean };

    if (typeof operational !== 'boolean') {
      return res.status(400).json({ error: 'operational field is required' });
    }

    // Update user operational status
    await db.query(
      `update users set is_operating = $1 where id = $2`,
      [operational, user.userId]
    );

    // Broadcast status change
    broadcastToRole('gp', 'gp.status.changed', {
      gpId: user.userId,
      operational
    });
    broadcastToRole('doctor', 'gp.status.changed', {
      gpId: user.userId,
      operational
    });

    return res.json({ success: true, operational });
  } catch (error) {
    console.error('Update status error', error);
    return res.status(500).json({ error: 'Unable to update status' });
  }
});

// Get consultation history
gpRouter.get('/consultations/history', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const user = (req as any).user;

    const result = await db.query(
      `select c.*, 
        u.display_name as patient_name,
        u.first_name as patient_first_name,
        u.last_name as patient_last_name,
        c.notes as diagnosis,
        COALESCE(c.completed_at, c.ended_at) as completed_at,
        extract(epoch from (COALESCE(c.completed_at, c.ended_at) - c.started_at))/60 as duration_minutes
       from consultations c
       join users u on u.id = c.patient_id
       where c.gp_id = $1 and c.status in ('completed', 'ended') and c.gp_deleted = false
       order by COALESCE(c.completed_at, c.ended_at) desc nulls last
       limit 50`,
      [user.userId]
    );

    const history = result.rows.map((row) => {
      const lastInitial = row.patient_last_name ? `${row.patient_last_name.charAt(0)}.` : '';
      const fallbackName = `${row.patient_first_name || ''} ${lastInitial}`.trim();

      return {
        id: row.id,
        patientName: row.patient_name || fallbackName || 'Patient',
        diagnosis: row.diagnosis || 'No diagnosis recorded',
        completedAt: row.completed_at,
        duration: Math.round(row.duration_minutes || 0)
      };
    });

    return res.json({ history });
  } catch (error) {
    console.error('Get consultation history error', error);
    return res.status(500).json({ error: 'Unable to fetch consultation history' });
  }
});

// API-09: Complete a consultation
gpRouter.post('/consultations/:id/complete', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { notes } = req.body as { notes?: string };

    const result = await db.query(
      `update consultations
       set status = 'completed', completed_at = now(), notes = COALESCE($3::jsonb, notes)
       where id = $1 and gp_id = $2 and status = 'active'
       returning *`,
      [id, user.userId, notes ? JSON.stringify(notes) : null]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Active consultation not found or not assigned to you' });
    }

    const consultation = result.rows[0];

    if (consultation.request_id) {
      await db.query(
        `update consult_requests
         set status = 'completed'
         where id = $1 and status in ('waiting', 'accepted')`,
        [consultation.request_id]
      );
    }

    // Notify patient
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        consultation.patient_id,
        'consult.completed',
        'Your consultation has been completed.',
        JSON.stringify({ consultationId: consultation.id })
      ]
    );

    await cleanupDailyRoom(consultation.daily_room_url);

    broadcastToUser(consultation.patient_id, 'consult.completed', { consultation });
    if (consultation.gp_id) {
      // Keep GP tabs in sync when completion happens from another tab/device.
      broadcastToUser(consultation.gp_id, 'consult.completed', { consultation });
    }

    // Issue 4: Notify all GPs so their queue/stats refresh
    broadcastToRole('gp', 'queue.updated', { completedId: consultation.id });
    broadcastToRole('doctor', 'queue.updated', { completedId: consultation.id });

    return res.json({ consultation });
  } catch (error) {
    console.error('Complete consultation error', error);
    return res.status(500).json({ error: 'Unable to complete consultation' });
  }
});

// Delete consultation record from GP view (soft delete)
gpRouter.delete('/consultations/:id', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    // Mark as deleted from GP view (but keep in database)
    await db.query(
      `update consultations
       set gp_deleted = true, gp_deleted_at = now()
       where id = $1 and gp_id = $2`,
      [id, user.userId]
    );

    return res.json({ success: true, message: 'Record deleted from your view' });
  } catch (error) {
    console.error('Delete consultation record error', error);
    return res.status(500).json({ error: 'Unable to delete record' });
  }
});

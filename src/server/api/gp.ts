import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createDailyRoom, deleteRoom } from '../integrations/daily';
import { broadcastToUser, broadcastToRole } from '../realtime/ws';

export const gpRouter = Router();
const WAITING_TIMEOUT_MINUTES = 15;

type QueueRemovalReason = 'timeout' | 'manual';
type ExpiredQueueRequest = {
  id: string;
  patient_id: string;
};

function isConsultRequestConstraintError(error: unknown): boolean {
  const dbError = error as { code?: string; constraint?: string };
  return dbError.code === '23514' && dbError.constraint === 'consult_requests_status_check';
}

function isSchemaError(error: unknown): boolean {
  const dbError = error as { code?: string };
  return dbError.code === '42P01' || dbError.code === '42703';
}

function normalizeConsultNotes(notes: unknown): string | null {
  if (typeof notes !== 'string') {
    return null;
  }
  const trimmed = notes.trim();
  if (!trimmed) {
    return null;
  }
  return JSON.stringify({ summary: trimmed });
}

function getNotesSummary(notes: unknown): string {
  if (typeof notes === 'string') {
    const trimmed = notes.trim();
    return trimmed || 'No diagnosis recorded';
  }

  if (!notes || typeof notes !== 'object') {
    return 'No diagnosis recorded';
  }

  const payload = notes as Record<string, unknown>;
  if (typeof payload['summary'] === 'string' && payload['summary'].trim()) {
    return payload['summary'].trim();
  }

  const entries = Object.entries(payload);
  if (entries.length === 0) {
    return 'No diagnosis recorded';
  }

  try {
    return JSON.stringify(payload);
  } catch {
    return 'No diagnosis recorded';
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

async function expireStaleWaitingRequests(): Promise<ExpiredQueueRequest[]> {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const expiredResult = await client.query(
      `update consult_requests
       set status = 'removed',
           removed_at = coalesce(removed_at, now()),
           removed_reason = coalesce(removed_reason, 'timeout')
       where status = 'waiting'
         and created_at < now() - ($1::interval)
       returning id, patient_id`,
      [`${WAITING_TIMEOUT_MINUTES} minutes`]
    );

    for (const expired of expiredResult.rows as ExpiredQueueRequest[]) {
      await client.query(
        `insert into notifications (user_id, type, message, data)
         values ($1, $2, $3, $4)`,
        [
          expired.patient_id,
          'consult.timeout',
          'Your consultation request has timed out after 15 minutes. Please request again.',
          JSON.stringify({ requestId: expired.id, reason: 'timeout' })
        ]
      );
    }

    await client.query('COMMIT');
    return expiredResult.rows;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
    }
    throw error;
  } finally {
    client.release();
  }
}

gpRouter.get('/queue', requireAuth, requireRole(['gp', 'doctor']), async (_req, res) => {
  try {
    const expired = await expireStaleWaitingRequests();
    if (expired.length > 0) {
      for (const request of expired) {
        broadcastToUser(request.patient_id, 'consult.removed', {
          requestId: request.id,
          reason: 'timeout'
        });
      }
      const expiredIds = expired.map((request) => request.id);
      broadcastToRole('gp', 'queue.updated', { expiredIds });
      broadcastToRole('doctor', 'queue.updated', { expiredIds });
    }

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
    if (isConsultRequestConstraintError(error)) {
      return res.status(503).json({
        error: 'Queue schema is incompatible with removed request status',
        code: 'SCHEMA_ERROR'
      });
    }
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
    let reused = false;

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
        if (request.status === 'accepted') {
          const existingConsultationResult = await client.query(
            `select *
             from consultations
             where request_id = $1 and status = 'active'
             order by created_at desc
             limit 1`,
            [id]
          );

          const existingConsultation = existingConsultationResult.rows[0];
          if (!existingConsultation) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'Request already accepted or no longer waiting' });
          }

          if (existingConsultation.gp_id !== user.userId) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'Request has already been accepted by another GP' });
          }

          consultation = existingConsultation;
          reused = true;
          await client.query('COMMIT');
        } else {
          await client.query('ROLLBACK');
          return res.status(409).json({ error: 'Request already accepted or no longer waiting' });
        }
      } else {
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
      }
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch {
      }
      throw error;
    } finally {
      client.release();
    }

    const roomUrl = consultation.daily_room_url || null;

    if (!reused) {
      broadcastToUser(request.patient_id, 'consult.accepted', {
        requestId: request.id,
        consultation,
        roomUrl
      });
      broadcastToRole('gp', 'queue.updated', { acceptedId: request.id });
      broadcastToRole('doctor', 'queue.updated', { acceptedId: request.id });
    }

    return res.json({
      consultation,
      roomUrl,
      reused
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
    const normalizedReason: QueueRemovalReason = reason === 'timeout' ? 'timeout' : 'manual';
    const client = await db.connect();
    let request: { id: string; patient_id: string } | null = null;

    try {
      await client.query('BEGIN');

      const requestResult = await client.query(
        `select id, patient_id, status
         from consult_requests
         where id = $1
         for update`,
        [id]
      );

      if (requestResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          code: 'NOT_FOUND',
          message: 'Request not found'
        });
      }

      const existing = requestResult.rows[0];
      if (existing.status !== 'waiting') {
        await client.query('ROLLBACK');
        return res.status(409).json({
          success: false,
          code: 'NOT_WAITING',
          message: 'Request is no longer in waiting status'
        });
      }

      const updateResult = await client.query(
        `update consult_requests
         set status = 'removed', removed_at = now(), removed_reason = $2, removed_by = $3
         where id = $1 and status = 'waiting'
         returning id, patient_id`,
        [id, normalizedReason, user.userId]
      );

      if (updateResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(409).json({
          success: false,
          code: 'NOT_WAITING',
          message: 'Request is no longer in waiting status'
        });
      }

      const removedRequest = updateResult.rows[0] as { id: string; patient_id: string };
      request = removedRequest;
      const message = normalizedReason === 'timeout'
        ? 'Your consultation request has timed out after 15 minutes. Please request again.'
        : 'A GP has declined your consultation request. You can try again.';

      await client.query(
        `insert into notifications (user_id, type, message, data)
         values ($1, $2, $3, $4)`,
        [
          removedRequest.patient_id,
          normalizedReason === 'timeout' ? 'consult.timeout' : 'consult.declined',
          message,
          JSON.stringify({ requestId: removedRequest.id, reason: normalizedReason })
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

    if (!request) {
      return res.status(500).json({
        success: false,
        code: 'UNKNOWN',
        message: 'Unable to remove from queue'
      });
    }

    broadcastToUser(request.patient_id, 'consult.removed', {
      requestId: request.id,
      reason: normalizedReason
    });
    broadcastToRole('gp', 'queue.updated', { removedId: request.id });
    broadcastToRole('doctor', 'queue.updated', { removedId: request.id });

    return res.json({ success: true, requestId: request.id });
  } catch (error) {
    console.error('Delete from queue error', error);
    if (isConsultRequestConstraintError(error)) {
      return res.status(503).json({
        success: false,
        code: 'SCHEMA_ERROR',
        message: 'Queue schema is incompatible with removed request status'
      });
    }
    return res.status(500).json({
      success: false,
      code: 'UNKNOWN',
      message: 'Unable to remove from queue'
    });
  }
});

gpRouter.get('/status', requireAuth, requireRole(['gp', 'doctor']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select
          case
            when pp.notes ? 'operational' and (pp.notes ->> 'operational') in ('true', 'false')
              then (pp.notes ->> 'operational')::boolean
            else true
          end as operational
       from provider_profiles pp
       where pp.user_id = $1
       limit 1`,
      [user.userId]
    );

    const operational = result.rows[0]?.operational ?? true;
    return res.json({ operational });
  } catch (error) {
    console.error('Get status error', error);
    return res.status(500).json({ error: 'Unable to fetch status' });
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

    // Persist queue-availability status outside auth-critical account status.
    // `users.is_operating` is reserved for account enable/disable controls.
    await db.query(
      `insert into provider_profiles (user_id, notes)
       values ($1, jsonb_build_object('operational', $2::boolean))
       on conflict (user_id)
       do update set notes = jsonb_set(
         coalesce(provider_profiles.notes, '{}'::jsonb),
         '{operational}',
         to_jsonb($2::boolean),
         true
       )`,
      [user.userId, operational]
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
        diagnosis: getNotesSummary(row.diagnosis),
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
    const normalizedNotes = normalizeConsultNotes(notes);

    const currentResult = await db.query(
      `select id, gp_id, status
       from consultations
       where id = $1
       limit 1`,
      [id]
    );

    if (currentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Consultation not found', code: 'NOT_FOUND' });
    }

    const current = currentResult.rows[0] as { gp_id: string | null; status: string };
    if (current.gp_id !== user.userId) {
      return res.status(403).json({ error: 'Consultation is not assigned to this GP', code: 'NOT_ASSIGNED' });
    }

    if (current.status !== 'active') {
      return res.status(409).json({ error: 'Consultation is not active', code: 'NOT_ACTIVE' });
    }

    const result = await db.query(
      `update consultations
       set status = 'completed', completed_at = now(), notes = COALESCE($3::jsonb, notes)
       where id = $1 and gp_id = $2 and status = 'active'
       returning *`,
      [id, user.userId, normalizedNotes]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({ error: 'Consultation is no longer active', code: 'NOT_ACTIVE' });
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
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Consultation schema is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to complete consultation', code: 'UNKNOWN' });
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

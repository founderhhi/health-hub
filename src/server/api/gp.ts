import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createDailyRoom } from '../integrations/daily';
import { broadcastToUser, broadcastToRole } from '../realtime/ws';

export const gpRouter = Router();

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

    const update = await db.query(
      `update consult_requests
       set status = 'accepted', accepted_at = now()
       where id = $1 and status = 'waiting'
       returning *`,
      [id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found or already accepted' });
    }

    const request = update.rows[0];
    const roomUrl = await createDailyRoom();

    const consult = await db.query(
      `insert into consultations (request_id, patient_id, gp_id, daily_room_url)
       values ($1, $2, $3, $4) returning *`,
      [request.id, request.patient_id, user.userId, roomUrl]
    );

    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        request.patient_id,
        'consult.accepted',
        'A GP accepted your request. Join the consultation.',
        JSON.stringify({ consultationId: consult.rows[0].id })
      ]
    );
    broadcastToUser(request.patient_id, 'consult.accepted', {
      requestId: request.id,
      consultation: consult.rows[0]
    });
    broadcastToRole('gp', 'queue.updated', { acceptedId: request.id });
    broadcastToRole('doctor', 'queue.updated', { acceptedId: request.id });

    return res.json({ consultation: consult.rows[0], roomUrl });
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
        c.completed_at,
        extract(epoch from (c.completed_at - c.created_at))/60 as duration_minutes
       from consultations c
       join users u on u.id = c.patient_id
       where c.gp_id = $1 and c.status = 'completed'
       order by c.completed_at desc
       limit 50`,
      [user.userId]
    );

    const history = result.rows.map(row => ({
      id: row.id,
      patientName: row.patient_name || `${row.patient_first_name} ${row.patient_last_name?.charAt(0)}.`,
      diagnosis: row.diagnosis || 'No diagnosis recorded',
      completedAt: row.completed_at,
      duration: Math.round(row.duration_minutes || 0)
    }));

    return res.json({ history });
  } catch (error) {
    console.error('Get consultation history error', error);
    return res.status(500).json({ error: 'Unable to fetch consultation history' });
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

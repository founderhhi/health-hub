import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createDailyRoom } from '../integrations/daily';
import { broadcastToUser, broadcastToRole } from '../realtime/ws';

export const gpRouter = Router();

gpRouter.get('/queue', requireAuth, requireRole(['gp', 'doctor']), async (_req, res) => {
  try {
    const result = await db.query(
      `select cr.*, u.display_name, u.phone
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

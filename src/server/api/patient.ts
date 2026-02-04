import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

export const patientRouter = Router();

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

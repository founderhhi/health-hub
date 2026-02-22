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

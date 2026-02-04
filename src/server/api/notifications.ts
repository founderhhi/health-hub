import { Router } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';

export const notificationsRouter = Router();

notificationsRouter.get('/', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select * from notifications where user_id = $1 order by created_at desc`,
      [user.userId]
    );
    return res.json({ notifications: result.rows });
  } catch (error) {
    console.error('List notifications error', error);
    return res.status(500).json({ error: 'Unable to fetch notifications' });
  }
});

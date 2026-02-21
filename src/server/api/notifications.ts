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

// API-06: Mark single notification as read
notificationsRouter.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const result = await db.query(
      `update notifications set read = true where id = $1 and user_id = $2 returning *`,
      [id, user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    return res.json({ notification: result.rows[0] });
  } catch (error) {
    console.error('Mark notification read error', error);
    return res.status(500).json({ error: 'Unable to mark notification as read' });
  }
});

// API-07: Mark all notifications as read
notificationsRouter.post('/read-all', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `update notifications set read = true where user_id = $1 and read = false returning id`,
      [user.userId]
    );
    return res.json({ updated: result.rowCount });
  } catch (error) {
    console.error('Mark all notifications read error', error);
    return res.status(500).json({ error: 'Unable to mark notifications as read' });
  }
});

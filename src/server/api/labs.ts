import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const labsRouter = Router();

labsRouter.post('/', requireAuth, requireRole(['specialist']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { patientId, tests } = req.body as { patientId?: string; tests?: unknown[] };
    if (!patientId || !tests) {
      return res.status(400).json({ error: 'patientId and tests required' });
    }

    const insert = await db.query(
      `insert into lab_orders (patient_id, specialist_id, tests)
       values ($1, $2, $3) returning *`,
      [patientId, user.userId, JSON.stringify(tests)]
    );

    const order = insert.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        patientId,
        'lab.ordered',
        'A lab order has been created.',
        JSON.stringify({ labOrderId: order.id })
      ]
    );
    broadcastToUser(patientId, 'lab.status.updated', { order });

    return res.json({ order });
  } catch (error) {
    console.error('Create lab order error', error);
    return res.status(500).json({ error: 'Unable to create lab order' });
  }
});

labsRouter.get('/diagnostics', requireAuth, requireRole(['lab_tech', 'radiologist', 'pathologist']), async (_req, res) => {
  try {
    const result = await db.query(
      `select lo.*, u.display_name as patient_name, u.phone as patient_phone
       from lab_orders lo
       join users u on u.id = lo.patient_id
       order by lo.created_at desc`
    );
    return res.json({ orders: result.rows });
  } catch (error) {
    console.error('List lab orders error', error);
    return res.status(500).json({ error: 'Unable to list lab orders' });
  }
});

labsRouter.post('/diagnostics/:id/status', requireAuth, requireRole(['lab_tech', 'radiologist', 'pathologist']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resultNotes } = req.body as { status?: string; resultNotes?: string };

    const update = await db.query(
      `update lab_orders set status = $1, result_notes = $2 where id = $3 returning *`,
      [status || 'in_progress', resultNotes || null, id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = update.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        order.patient_id,
        'lab.status',
        `Lab order status updated to ${order.status}.`,
        JSON.stringify({ labOrderId: order.id, status: order.status })
      ]
    );
    broadcastToUser(order.patient_id, 'lab.status.updated', { order });

    return res.json({ order });
  } catch (error) {
    console.error('Update lab status error', error);
    return res.status(500).json({ error: 'Unable to update lab status' });
  }
});

import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const labsRouter = Router();

// GET /labs/centres — list active diagnostic centres (accessible to specialists)
labsRouter.get('/centres', requireAuth, async (_req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, display_distance FROM diagnostic_centres WHERE is_active = true ORDER BY name`
    );
    return res.json({ centres: result.rows });
  } catch (error) {
    console.error('List diagnostic centres error', error);
    return res.status(500).json({ error: 'Unable to list diagnostic centres' });
  }
});

labsRouter.post('/', requireAuth, requireRole(['specialist']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { patientId, tests, centreId } = req.body as { patientId?: string; tests?: unknown[]; centreId?: string };
    if (!patientId || !tests) {
      return res.status(400).json({ error: 'patientId and tests required' });
    }

    const insert = await db.query(
      `insert into lab_orders (patient_id, specialist_id, tests, diagnostic_centre_id)
       values ($1, $2, $3, $4) returning *`,
      [patientId, user.userId, JSON.stringify(tests), centreId || null]
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

    // Notify diagnostic staff at the selected centre
    if (centreId) {
      try {
        const staffResult = await db.query(
          `SELECT pp.user_id FROM provider_profiles pp WHERE pp.centre_id = $1`,
          [centreId]
        );
        for (const row of staffResult.rows) {
          broadcastToUser(row.user_id, 'lab.new_order', { order });
        }
      } catch (wsError) {
        console.error('Centre WS notification error', wsError);
      }
    }

    return res.json({ order });
  } catch (error) {
    console.error('Create lab order error', error);
    return res.status(500).json({ error: 'Unable to create lab order' });
  }
});

labsRouter.get('/diagnostics', requireAuth, requireRole(['lab_tech', 'radiologist', 'pathologist']), async (req, res) => {
  try {
    const user = (req as any).user;

    // Look up current user's centre_id from provider_profiles
    const profileResult = await db.query(
      `SELECT centre_id FROM provider_profiles WHERE user_id = $1`,
      [user.userId]
    );
    const centreId = profileResult.rows[0]?.centre_id || null;

    let result;
    if (centreId) {
      // Filter orders to only those assigned to this centre
      result = await db.query(
        `SELECT lo.*, u.display_name AS patient_name, u.phone AS patient_phone
         FROM lab_orders lo
         JOIN users u ON u.id = lo.patient_id
         WHERE lo.diagnostic_centre_id = $1
         ORDER BY lo.created_at DESC`,
        [centreId]
      );
    } else {
      // Legacy users without a centre see all orders (backwards compatible)
      result = await db.query(
        `SELECT lo.*, u.display_name AS patient_name, u.phone AS patient_phone
         FROM lab_orders lo
         JOIN users u ON u.id = lo.patient_id
         ORDER BY lo.created_at DESC`
      );
    }
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

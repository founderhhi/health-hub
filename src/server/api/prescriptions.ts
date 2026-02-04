import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const prescriptionsRouter = Router();

function generateCode() {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RX-${rand}`;
}

prescriptionsRouter.post('/', requireAuth, requireRole(['gp', 'doctor', 'specialist']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { patientId, items } = req.body as { patientId?: string; items?: unknown[] };
    if (!patientId || !items) {
      return res.status(400).json({ error: 'patientId and items required' });
    }

    const code = generateCode();
    const insert = await db.query(
      `insert into prescriptions (patient_id, provider_id, code, items)
       values ($1, $2, $3, $4) returning *`,
      [patientId, user.userId, code, JSON.stringify(items)]
    );

    const prescription = insert.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        patientId,
        'prescription.created',
        `A prescription is ready. Code: ${prescription.code}`,
        JSON.stringify({ prescriptionId: prescription.id, code: prescription.code })
      ]
    );
    broadcastToUser(patientId, 'prescription.created', { prescription });

    return res.json({ prescription });
  } catch (error) {
    console.error('Create prescription error', error);
    return res.status(500).json({ error: 'Unable to create prescription' });
  }
});

prescriptionsRouter.get('/', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const patientId = (req.query['patientId'] as string) || user.userId;
    const result = await db.query(
      `select * from prescriptions where patient_id = $1 order by created_at desc`,
      [patientId]
    );
    return res.json({ prescriptions: result.rows });
  } catch (error) {
    console.error('List prescriptions error', error);
    return res.status(500).json({ error: 'Unable to list prescriptions' });
  }
});

prescriptionsRouter.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`select * from prescriptions where id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    return res.json({ prescription: result.rows[0] });
  } catch (error) {
    console.error('Get prescription error', error);
    return res.status(500).json({ error: 'Unable to get prescription' });
  }
});

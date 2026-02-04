import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const pharmacyRouter = Router();

pharmacyRouter.get('/prescriptions/:code', requireAuth, requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const { code } = req.params;
    const result = await db.query(`select * from prescriptions where code = $1`, [code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    return res.json({ prescription: result.rows[0] });
  } catch (error) {
    console.error('Lookup prescription error', error);
    return res.status(500).json({ error: 'Unable to lookup prescription' });
  }
});

pharmacyRouter.post('/prescriptions/:id/claim', requireAuth, requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { dispensedItems } = req.body as { dispensedItems?: unknown[] };

    const update = await db.query(
      `update prescriptions set status = 'claimed' where id = $1 returning *`,
      [id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    const prescription = update.rows[0];
    await db.query(
      `insert into pharmacy_claims (prescription_id, pharmacy_id, dispensed_items)
       values ($1, $2, $3)`,
      [id, user.userId, JSON.stringify(dispensedItems || [])]
    );

    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        prescription.patient_id,
        'prescription.claimed',
        'Your prescription is being prepared by the pharmacy.',
        JSON.stringify({ prescriptionId: prescription.id })
      ]
    );
    broadcastToUser(prescription.patient_id, 'prescription.claimed', { prescription });

    return res.json({ prescription });
  } catch (error) {
    console.error('Claim prescription error', error);
    return res.status(500).json({ error: 'Unable to claim prescription' });
  }
});

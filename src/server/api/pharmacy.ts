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

    const client = await db.connect();
    let prescription: any = null;

    try {
      await client.query('BEGIN');

      const update = await client.query(
        `update prescriptions
         set status = 'claimed'
         where id = $1 and status = 'active'
         returning *`,
        [id]
      );

      if (update.rows.length === 0) {
        const existing = await client.query(
          `select status from prescriptions where id = $1`,
          [id]
        );

        await client.query('ROLLBACK');

        if (existing.rows.length === 0) {
          return res.status(404).json({ error: 'Prescription not found' });
        }

        return res.status(409).json({
          error: `Prescription cannot be claimed from status '${existing.rows[0].status}'`
        });
      }

      prescription = update.rows[0];

      await client.query(
        `insert into pharmacy_claims (prescription_id, pharmacy_id, dispensed_items)
         values ($1, $2, $3)`,
        [id, user.userId, JSON.stringify(dispensedItems || [])]
      );

      await client.query(
        `insert into notifications (user_id, type, message, data)
         values ($1, $2, $3, $4)`,
        [
          prescription.patient_id,
          'prescription.claimed',
          'Your prescription is being prepared by the pharmacy.',
          JSON.stringify({ prescriptionId: prescription.id })
        ]
      );

      await client.query('COMMIT');
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch {
      }
      throw error;
    } finally {
      client.release();
    }

    broadcastToUser(prescription.patient_id, 'prescription.claimed', { prescription });

    return res.json({ prescription });
  } catch (error) {
    console.error('Claim prescription error', error);
    return res.status(500).json({ error: 'Unable to claim prescription' });
  }
});

// API-10: Dispense a claimed prescription
pharmacyRouter.post('/prescriptions/:id/dispense', requireAuth, requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const client = await db.connect();
    let prescription: any = null;

    try {
      await client.query('BEGIN');

      const update = await client.query(
        `update prescriptions
         set status = 'fulfilled'
         where id = $1 and status = 'claimed'
         returning *`,
        [id]
      );

      if (update.rows.length === 0) {
        const existing = await client.query(`select status from prescriptions where id = $1`, [id]);
        await client.query('ROLLBACK');

        if (existing.rows.length === 0) {
          return res.status(404).json({ error: 'Prescription not found' });
        }

        return res.status(409).json({
          error: `Prescription cannot be dispensed from status '${existing.rows[0].status}'`
        });
      }

      prescription = update.rows[0];

      const claimResult = await client.query(
        `select pc.id
         from pharmacy_claims pc
         where pc.prescription_id = $1 and pc.pharmacy_id = $2
         order by pc.claimed_at desc
         limit 1
         for update`,
        [id, user.userId]
      );

      if (claimResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(409).json({
          error: 'Prescription claim not found for this pharmacy'
        });
      }

      await client.query(
        `update pharmacy_claims
         set dispensed_at = now()
         where id = $1`,
        [claimResult.rows[0].id]
      );

      await client.query(
        `insert into notifications (user_id, type, message, data)
         values ($1, $2, $3, $4)`,
        [
          prescription.patient_id,
          'prescription.dispensed',
          'Your prescription has been dispensed and is ready for pickup.',
          JSON.stringify({ prescriptionId: prescription.id })
        ]
      );

      await client.query('COMMIT');
    } catch (error) {
      try {
        await client.query('ROLLBACK');
      } catch {
      }
      throw error;
    } finally {
      client.release();
    }

    broadcastToUser(prescription.patient_id, 'prescription.dispensed', { prescription });

    return res.json({ prescription });
  } catch (error) {
    console.error('Dispense prescription error', error);
    return res.status(500).json({ error: 'Unable to dispense prescription' });
  }
});

// API-11: Get pharmacy claim/dispense history
pharmacyRouter.get('/history', requireAuth, requireRole(['pharmacist', 'pharmacy_tech']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select pc.*, p.code, p.items, p.status as prescription_status,
               p.patient_id, u.display_name as patient_name, u.phone as patient_phone,
               p.created_at as prescription_date,
               pc.dispensed_at
        from pharmacy_claims pc
        join prescriptions p on p.id = pc.prescription_id
        join users u on u.id = p.patient_id
       where pc.pharmacy_id = $1
       order by pc.claimed_at desc
       limit 100`,
      [user.userId]
    );
    return res.json({ history: result.rows });
  } catch (error) {
    console.error('Pharmacy history error', error);
    return res.status(500).json({ error: 'Unable to fetch pharmacy history' });
  }
});

import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

export const prescriptionsRouter = Router();

const providerRoles = new Set([
  'gp',
  'doctor',
  'specialist',
  'pharmacist',
  'pharmacy_tech',
  'lab_tech',
  'radiologist',
  'pathologist'
]);

const pharmacyRoles = new Set(['pharmacist', 'pharmacy_tech']);

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
    const requestedPatientId = req.query['patientId'] as string | undefined;
    let result;

    if (user.role === 'admin') {
      if (requestedPatientId) {
        result = await db.query(
          `select * from prescriptions where patient_id = $1 order by created_at desc`,
          [requestedPatientId]
        );
      } else {
        result = await db.query(`select * from prescriptions order by created_at desc`);
      }
    } else if (user.role === 'patient') {
      result = await db.query(
        `select * from prescriptions where patient_id = $1 order by created_at desc`,
        [user.userId]
      );
    } else if (pharmacyRoles.has(user.role)) {
      result = await db.query(
        `select p.*
         from prescriptions p
         join pharmacy_claims pc on pc.prescription_id = p.id
         where pc.pharmacy_id = $1
         order by p.created_at desc`,
        [user.userId]
      );
    } else if (providerRoles.has(user.role)) {
      if (requestedPatientId) {
        result = await db.query(
          `select *
           from prescriptions
           where provider_id = $1 and patient_id = $2
           order by created_at desc`,
          [user.userId, requestedPatientId]
        );
      } else {
        result = await db.query(
          `select * from prescriptions where provider_id = $1 order by created_at desc`,
          [user.userId]
        );
      }
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json({ prescriptions: result.rows });
  } catch (error) {
    console.error('List prescriptions error', error);
    return res.status(500).json({ error: 'Unable to list prescriptions' });
  }
});

prescriptionsRouter.get('/:id', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const result = await db.query(
      `select p.*,
         exists(
           select 1 from pharmacy_claims pc
           where pc.prescription_id = p.id and pc.pharmacy_id = $2
         ) as claimed_by_requester
       from prescriptions p
       where p.id = $1`,
      [id, user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    const prescription = result.rows[0];
    const isAllowed =
      user.role === 'admin' ||
      prescription.patient_id === user.userId ||
      prescription.provider_id === user.userId ||
      prescription.claimed_by_requester === true;

    if (!isAllowed) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { claimed_by_requester, ...visiblePrescription } = prescription;
    return res.json({ prescription: visiblePrescription });
  } catch (error) {
    console.error('Get prescription error', error);
    return res.status(500).json({ error: 'Unable to get prescription' });
  }
});

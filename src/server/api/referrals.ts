import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

export const referralsRouter = Router();

referralsRouter.post('/', requireAuth, requireRole(['gp', 'doctor', 'specialist']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { patientId, toSpecialistId, urgency, reason, appointmentDate, appointmentTime, consultationMode, location, specialty } = req.body as {
      patientId?: string;
      toSpecialistId?: string;
      urgency?: string;
      reason?: string;
      appointmentDate?: string;
      appointmentTime?: string;
      consultationMode?: string;
      location?: string;
      specialty?: string;
    };

    if (!patientId) {
      return res.status(400).json({ error: 'patientId required' });
    }

    // Auto-assign specialist based on specialty if not explicitly provided
    let resolvedSpecialistId = toSpecialistId || null;
    if (!resolvedSpecialistId && specialty) {
      const specResult = await db.query(
        `select pp.user_id from provider_profiles pp
         join users u on u.id = pp.user_id
         where u.role = 'specialist' and lower(pp.specialty) = lower($1)
         limit 1`,
        [specialty]
      );
      if (specResult.rows.length > 0) {
        resolvedSpecialistId = specResult.rows[0].user_id;
      } else {
        // Fallback: assign to any specialist
        const fallback = await db.query(
          `select id from users where role = 'specialist' limit 1`
        );
        if (fallback.rows.length > 0) {
          resolvedSpecialistId = fallback.rows[0].id;
        }
      }
    }

    const insert = await db.query(
      `insert into referrals (patient_id, from_provider_id, to_specialist_id, urgency, reason, appointment_date, appointment_time, consultation_mode, location, specialty)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`,
      [patientId, user.userId, resolvedSpecialistId, urgency || 'routine', reason || null,
       appointmentDate || null, appointmentTime || null, consultationMode || 'online', location || null, specialty || null]
    );

    const referral = insert.rows[0];

    // Build a richer notification message
    const specialtyLabel = specialty ? ` (${specialty})` : '';
    const dateLabel = appointmentDate ? ` on ${appointmentDate}` : '';
    const notifMsg = `A specialist referral${specialtyLabel} was created for you${dateLabel}.`;

    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        patientId,
        'referral.created',
        notifMsg,
        JSON.stringify({ referralId: referral.id, specialty, appointmentDate, appointmentTime, consultationMode })
      ]
    );
    broadcastToRole('specialist', 'referral.created', { referral });
    broadcastToUser(patientId, 'referral.created', { referral });

    return res.json({ referral });
  } catch (error) {
    console.error('Create referral error', error);
    return res.status(500).json({ error: 'Unable to create referral' });
  }
});

referralsRouter.get('/specialist', requireAuth, requireRole(['specialist']), async (_req, res) => {
  try {
    const result = await db.query(
      `select r.*, u.display_name as patient_name, u.phone as patient_phone
       from referrals r
       join users u on u.id = r.patient_id
       order by r.created_at desc`
    );
    return res.json({ referrals: result.rows });
  } catch (error) {
    console.error('List referrals error', error);
    return res.status(500).json({ error: 'Unable to list referrals' });
  }
});

referralsRouter.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `select r.*, u.display_name as patient_name, u.phone as patient_phone
       from referrals r
       join users u on u.id = r.patient_id
       where r.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    return res.json({ referral: result.rows[0] });
  } catch (error) {
    console.error('Get referral error', error);
    return res.status(500).json({ error: 'Unable to load referral' });
  }
});

referralsRouter.post('/:id/status', requireAuth, requireRole(['specialist']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status?: string };
    const update = await db.query(
      `update referrals set status = $1 where id = $2 returning *`,
      [status || 'accepted', id]
    );
    if (update.rows.length === 0) {
      return res.status(404).json({ error: 'Referral not found' });
    }

    const referral = update.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        referral.patient_id,
        'referral.status',
        `Referral status updated to ${referral.status}.`,
        JSON.stringify({ referralId: referral.id, status: referral.status })
      ]
    );
    broadcastToUser(referral.patient_id, 'referral.status', { referral });
    return res.json({ referral });
  } catch (error) {
    console.error('Update referral status error', error);
    return res.status(500).json({ error: 'Unable to update referral' });
  }
});

import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

export const referralsRouter = Router();

referralsRouter.post('/', requireAuth, requireRole(['gp', 'doctor', 'specialist']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { patientId, toSpecialistId, urgency, reason } = req.body as {
      patientId?: string;
      toSpecialistId?: string;
      urgency?: string;
      reason?: string;
    };

    if (!patientId) {
      return res.status(400).json({ error: 'patientId required' });
    }

    const insert = await db.query(
      `insert into referrals (patient_id, from_provider_id, to_specialist_id, urgency, reason)
       values ($1, $2, $3, $4, $5) returning *`,
      [patientId, user.userId, toSpecialistId || null, urgency || 'routine', reason || null]
    );

    const referral = insert.rows[0];
    await db.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        patientId,
        'referral.created',
        'A specialist referral was created for you.',
        JSON.stringify({ referralId: referral.id })
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

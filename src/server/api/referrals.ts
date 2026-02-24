import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

export const referralsRouter = Router();

referralsRouter.post('/', requireAuth, requireRole(['gp']), async (req, res) => { // [AGENT_ROLES] ISS-07: only GPs create referrals, removed legacy 'doctor' and 'specialist'
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

referralsRouter.get('/specialist', requireAuth, requireRole(['specialist', 'admin']), async (req, res) => {
  try {
    const user = (req as any).user;
    const specialistId = req.query['specialistId'] as string | undefined;
    const params: string[] = [];
    let whereClause = '';

    if (user.role === 'specialist') {
      whereClause = 'where r.to_specialist_id = $1';
      params.push(user.userId);
    } else if (specialistId) {
      whereClause = 'where r.to_specialist_id = $1';
      params.push(specialistId);
    } else {
      return res.status(400).json({ error: 'specialistId query parameter is required for admin' });
    }

    const result = await db.query(
      `select r.*, u.display_name as patient_name, u.phone as patient_phone, c.daily_room_url
       from referrals r
       join users u on u.id = r.patient_id
       left join consultations c on c.id = r.consultation_id
       ${whereClause}
       order by r.created_at desc`,
      params
    );
    return res.json({ referrals: result.rows });
  } catch (error) {
    console.error('List referrals error', error);
    return res.status(500).json({ error: 'Unable to list referrals' });
  }
});

referralsRouter.get('/:id', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const result = await db.query(
      `select r.*, u.display_name as patient_name, u.phone as patient_phone, c.daily_room_url
       from referrals r
       join users u on u.id = r.patient_id
       left join consultations c on c.id = r.consultation_id
       where r.id = $1
         and (
           $2 = 'admin' or
           r.patient_id = $3 or
           r.from_provider_id = $3 or
           r.to_specialist_id = $3
         )`,
      [id, user.role, user.userId]
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
  const client = await db.connect();
  let transactionStarted = false;
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status } = req.body as { status?: string };
    const resolvedStatus = status || 'accepted';

    await client.query('begin');
    transactionStarted = true;

    const current = await client.query(
      `select * from referrals where id = $1 for update`,
      [id]
    );
    if (current.rows.length === 0) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(404).json({ error: 'Referral not found' });
    }

    const referral = current.rows[0] as {
      id: string;
      patient_id: string;
      from_provider_id: string;
      to_specialist_id: string | null;
      consultation_id: string | null;
      status: string;
    };

    // Allow only the assigned specialist to mutate referral status.
    // For unassigned referrals, the first acting specialist claims it.
    if (referral.to_specialist_id && referral.to_specialist_id !== user.userId) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(403).json({ error: 'Forbidden' });
    }

    let consultationId = referral.consultation_id;
    let dailyRoomUrl: string | null = null;

    // Create and persist consultation link exactly once when accepting referral.
    if (resolvedStatus === 'accepted') {
      if (!consultationId) {
        const consult = await client.query(
          `insert into consultations (patient_id, specialist_id, status, notes, daily_room_url)
           values ($1, $2, 'active', $3, $4)
           returning id, daily_room_url`,
          [
            referral.patient_id,
            user.userId,
            JSON.stringify({ referral_id: referral.id }),
            process.env['DAILY_FALLBACK_ROOM'] || null
          ]
        );
        consultationId = consult.rows[0].id as string;
        dailyRoomUrl = (consult.rows[0].daily_room_url as string | null) || null;
      } else {
        const consult = await client.query(
          `select daily_room_url from consultations where id = $1`,
          [consultationId]
        );
        dailyRoomUrl = (consult.rows[0]?.daily_room_url as string | null) || null;
      }
    }

    const update = await client.query(
      `update referrals
       set status = $1,
           consultation_id = coalesce($2, consultation_id),
           to_specialist_id = coalesce(to_specialist_id, $3)
       where id = $4
       returning *`,
      [resolvedStatus, consultationId, user.userId, id]
    );
    const updatedReferral = update.rows[0] as Record<string, unknown>;
    if (consultationId) {
      updatedReferral['consultation_id'] = consultationId;
    }
    if (dailyRoomUrl) {
      updatedReferral['daily_room_url'] = dailyRoomUrl;
    }

    await client.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        updatedReferral['patient_id'],
        'referral.status',
        `Referral status updated to ${String(updatedReferral['status'])}.`,
        JSON.stringify({
          referralId: updatedReferral['id'],
          status: updatedReferral['status'],
          consultationId: updatedReferral['consultation_id'] || null
        })
      ]
    );

    await client.query('commit');
    transactionStarted = false;

    broadcastToUser(String(updatedReferral['patient_id']), 'referral.status', { referral: updatedReferral });
    return res.json({ referral: updatedReferral });
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query('rollback');
      } catch (rollbackError) {
        console.error('Referral status rollback failed', rollbackError);
      }
    }
    console.error('Update referral status error', error);
    return res.status(500).json({ error: 'Unable to update referral' });
  } finally {
    client.release();
  }
});

referralsRouter.post('/:id/request-info', requireAuth, requireRole(['specialist']), async (req, res) => {
  const client = await db.connect();
  let transactionStarted = false;
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { message } = req.body as { message?: string };
    const trimmedMessage = message?.trim();

    if (!trimmedMessage) {
      return res.status(400).json({ error: 'message is required' });
    }

    await client.query('begin');
    transactionStarted = true;

    const current = await client.query(
      `select * from referrals where id = $1 for update`,
      [id]
    );
    if (current.rows.length === 0) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(404).json({ error: 'Referral not found' });
    }

    const referral = current.rows[0] as {
      id: string;
      patient_id: string;
      from_provider_id: string;
      to_specialist_id: string | null;
    };

    if (referral.to_specialist_id && referral.to_specialist_id !== user.userId) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(403).json({ error: 'Forbidden' });
    }

    const update = await client.query(
      `update referrals
       set to_specialist_id = coalesce(to_specialist_id, $2),
           requested_info_note = $3,
           requested_info_at = now(),
           requested_info_by = $2
       where id = $1
       returning *`,
      [id, user.userId, trimmedMessage]
    );
    const updatedReferral = update.rows[0];

    await client.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        updatedReferral.from_provider_id,
        'referral.request_info',
        'Specialist requested additional information for a referral.',
        JSON.stringify({ referralId: updatedReferral.id, message: trimmedMessage })
      ]
    );

    await client.query('commit');
    transactionStarted = false;

    broadcastToUser(updatedReferral.from_provider_id, 'referral.request_info', {
      referral: updatedReferral,
      request: { message: trimmedMessage, requestedAt: updatedReferral.requested_info_at }
    });

    return res.json({
      referral: updatedReferral,
      request: {
        message: trimmedMessage,
        requestedAt: updatedReferral.requested_info_at
      }
    });
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query('rollback');
      } catch (rollbackError) {
        console.error('Referral request-info rollback failed', rollbackError);
      }
    }
    console.error('Request referral info error', error);
    return res.status(500).json({ error: 'Unable to request more information' });
  } finally {
    client.release();
  }
});

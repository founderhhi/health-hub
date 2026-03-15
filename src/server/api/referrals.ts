import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createDailyRoom, deleteRoom } from '../integrations/daily';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

export const referralsRouter = Router();

async function cleanupDailyRoom(roomUrl: string | null | undefined): Promise<void> {
  if (!roomUrl) {
    return;
  }

  try {
    await deleteRoom(roomUrl);
  } catch (error) {
    console.error('Referral Daily room cleanup error:', error);
  }
}

const REFERRAL_SELECT = `
  select r.*,
         patient.display_name as patient_name,
         patient.phone as patient_phone,
         specialist.display_name as specialist_name,
         specialist.phone as specialist_phone,
         specialist_profile.specialty as specialist_specialty,
         referring.display_name as referring_provider_name,
         referring.role as referring_provider_role,
         referring_profile.specialty as referring_provider_specialty,
         referring_profile.facility_name as referring_provider_facility,
         c.daily_room_url,
         c.status as consultation_status,
         c.started_at as consultation_started_at,
         coalesce(c.completed_at, c.ended_at) as consultation_completed_at
    from referrals r
    join users patient on patient.id = r.patient_id
    left join users specialist on specialist.id = r.to_specialist_id
    left join provider_profiles specialist_profile on specialist_profile.user_id = r.to_specialist_id
    left join users referring on referring.id = r.from_provider_id
    left join provider_profiles referring_profile on referring_profile.user_id = r.from_provider_id
    left join consultations c on c.id = r.consultation_id
`;

referralsRouter.post('/', requireAuth, requireRole(['gp', 'specialist']), async (req, res) => { // allow GPs and specialists to create referrals; specialists use this to refer patients to other specialists
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
      `${REFERRAL_SELECT}
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
      `${REFERRAL_SELECT}
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
        const roomUrl = await createDailyRoom();
        const consult = await client.query(
          `insert into consultations (patient_id, specialist_id, status, notes, daily_room_url, started_at)
           values ($1, $2, 'ready', $3, $4, null)
           returning id, daily_room_url`,
          [
            referral.patient_id,
            user.userId,
            JSON.stringify({ referral_id: referral.id }),
            roomUrl
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

    const hydratedResult = await db.query(
      `${REFERRAL_SELECT}
       where r.id = $1
       limit 1`,
      [id]
    );
    const hydratedReferral = hydratedResult.rows[0] || updatedReferral;

    broadcastToUser(String(updatedReferral['patient_id']), 'referral.status', { referral: hydratedReferral });
    if (updatedReferral['from_provider_id']) {
      broadcastToUser(String(updatedReferral['from_provider_id']), 'referral.status', { referral: hydratedReferral });
    }
    if (updatedReferral['to_specialist_id']) {
      broadcastToUser(String(updatedReferral['to_specialist_id']), 'referral.status', { referral: hydratedReferral });
    }
    return res.json({ referral: hydratedReferral });
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

referralsRouter.post('/:id/schedule', requireAuth, requireRole(['specialist']), async (req, res) => {
  const client = await db.connect();
  let transactionStarted = false;

  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { appointmentDate, appointmentTime, consultationMode, location } = req.body as {
      appointmentDate?: string;
      appointmentTime?: string;
      consultationMode?: string;
      location?: string;
    };

    const normalizedDate = typeof appointmentDate === 'string' && appointmentDate.trim() ? appointmentDate.trim() : null;
    const normalizedTime = typeof appointmentTime === 'string' && appointmentTime.trim() ? appointmentTime.trim() : null;
    const normalizedMode = typeof consultationMode === 'string' && consultationMode.trim() ? consultationMode.trim() : null;
    const normalizedLocation = typeof location === 'string' && location.trim() ? location.trim() : null;

    if (normalizedMode && normalizedMode !== 'online' && normalizedMode !== 'offline') {
      return res.status(400).json({ error: 'consultationMode must be online or offline' });
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
      consultation_id: string | null;
      status: string;
      appointment_date: string | null;
      appointment_time: string | null;
      consultation_mode: 'online' | 'offline' | null;
      location: string | null;
    };

    if (referral.to_specialist_id && referral.to_specialist_id !== user.userId) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(403).json({ error: 'Forbidden' });
    }

    const nextMode = (normalizedMode || referral.consultation_mode || 'online') as 'online' | 'offline';
    const nextLocation = nextMode === 'offline'
      ? (normalizedLocation || referral.location || null)
      : null;

    if (nextMode === 'offline' && !nextLocation) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(400).json({ error: 'location is required for offline appointments' });
    }

    let nextConsultationId = referral.consultation_id;
    let roomToCleanup: string | null = null;
    let endedConsultation: Record<string, unknown> | null = null;

    const linkedConsultation = referral.consultation_id
      ? await client.query(
          `select id, patient_id, gp_id, specialist_id, status, daily_room_url, notes
           from consultations
           where id = $1
           for update`,
          [referral.consultation_id]
        )
      : null;
    const consultation = linkedConsultation?.rows[0] as
      | {
          id: string;
          patient_id: string;
          gp_id: string | null;
          specialist_id: string | null;
          status: string;
          daily_room_url: string | null;
          notes: Record<string, unknown> | null;
        }
      | undefined;

    if (consultation && (consultation.status === 'completed' || consultation.status === 'ended')) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(409).json({ error: 'Completed consultations cannot be rescheduled from this view' });
    }

    if (nextMode === 'offline' && consultation) {
      const endedResult = await client.query(
        `update consultations
         set status = 'ended',
             ended_at = now()
         where id = $1
         returning *`,
        [consultation.id]
      );
      endedConsultation = endedResult.rows[0] || consultation;
      roomToCleanup = consultation.daily_room_url;
      nextConsultationId = null;
    } else if (nextMode === 'online' && !consultation) {
      const roomUrl = await createDailyRoom();
      const consult = await client.query(
        `insert into consultations (patient_id, specialist_id, status, notes, daily_room_url, started_at)
         values ($1, $2, 'ready', $3, $4, null)
         returning id, daily_room_url`,
        [
          referral.patient_id,
          user.userId,
          JSON.stringify({ referral_id: referral.id }),
          roomUrl
        ]
      );
      nextConsultationId = consult.rows[0].id as string;
    }

    let nextStatus = referral.status;
    if (referral.status !== 'declined') {
      if (nextMode === 'offline') {
        nextStatus = 'confirmed';
      } else if (referral.status === 'confirmed') {
        nextStatus = 'confirmed';
      } else if (referral.status === 'accepted') {
        nextStatus = 'accepted';
      }
    }

    const update = await client.query(
      `update referrals
       set to_specialist_id = coalesce(to_specialist_id, $2),
           appointment_date = coalesce($3::date, appointment_date),
           appointment_time = coalesce($4::time, appointment_time),
           consultation_mode = coalesce($5, consultation_mode),
           location = $6,
           status = $7,
           consultation_id = $8
       where id = $1
       returning *`,
      [id, user.userId, normalizedDate, normalizedTime, normalizedMode, nextLocation, nextStatus, nextConsultationId]
    );

    const updatedReferral = update.rows[0];

    await client.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        updatedReferral.patient_id,
        'referral.status',
        'Your specialist appointment details were updated.',
        JSON.stringify({
          referralId: updatedReferral.id,
          status: updatedReferral.status,
          appointmentDate: updatedReferral.appointment_date,
          appointmentTime: updatedReferral.appointment_time,
          consultationMode: updatedReferral.consultation_mode,
          location: updatedReferral.location
        })
      ]
    );

    await client.query('commit');
    transactionStarted = false;

    await cleanupDailyRoom(roomToCleanup);

    const hydratedResult = await db.query(
      `${REFERRAL_SELECT}
       where r.id = $1
       limit 1`,
      [id]
    );
    const hydratedReferral = hydratedResult.rows[0] || updatedReferral;

    broadcastToUser(updatedReferral.patient_id, 'referral.status', { referral: hydratedReferral });
    broadcastToUser(updatedReferral.from_provider_id, 'referral.status', { referral: hydratedReferral });
    if (updatedReferral.to_specialist_id) {
      broadcastToUser(updatedReferral.to_specialist_id, 'referral.status', { referral: hydratedReferral });
    }
    if (endedConsultation) {
      const participantIds = Array.from(
        new Set([
          endedConsultation['patient_id'],
          endedConsultation['gp_id'],
          endedConsultation['specialist_id']
        ].filter(Boolean))
      ) as string[];
      for (const participantId of participantIds) {
        broadcastToUser(participantId, 'consult.completed', { consultation: endedConsultation });
      }
    }

    return res.json({ referral: hydratedReferral });
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query('rollback');
      } catch (rollbackError) {
        console.error('Referral schedule rollback failed', rollbackError);
      }
    }
    console.error('Update referral schedule error', error);
    return res.status(500).json({ error: 'Unable to update referral schedule' });
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

    const hydratedResult = await db.query(
      `${REFERRAL_SELECT}
       where r.id = $1
       limit 1`,
      [id]
    );
    const hydratedReferral = hydratedResult.rows[0] || updatedReferral;

    broadcastToUser(updatedReferral.from_provider_id, 'referral.request_info', {
      referral: hydratedReferral,
      request: { message: trimmedMessage, requestedAt: updatedReferral.requested_info_at }
    });

    return res.json({
      referral: hydratedReferral,
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

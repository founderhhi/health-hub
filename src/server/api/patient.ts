import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';
import { deleteRoom } from '../integrations/daily';

export const patientRouter = Router();

function normalizeOptionalText(value: unknown): string | null {
  const normalized = String(value || '').trim();
  return normalized ? normalized : null;
}

function normalizeServiceRequestType(type: unknown, subType: unknown): string {
  const normalizedType = String(type || '').trim().toLowerCase();
  const normalizedSubType = String(subType || '').trim().toLowerCase();

  if (normalizedType === 'travel' && normalizedSubType) {
    return `travel_${normalizedSubType}`;
  }

  if (normalizedType) {
    return normalizedType;
  }

  return 'general';
}

async function createPatientServiceRequest(
  patientId: string,
  payload: {
    type?: unknown;
    subType?: unknown;
    region?: unknown;
    city?: unknown;
    hospital?: unknown;
    hospitalName?: unknown;
    notes?: unknown;
  }
) {
  const type = normalizeServiceRequestType(payload.type, payload.subType);
  const region = normalizeOptionalText(payload.region);
  const city = normalizeOptionalText(payload.city);
  const hospitalName = normalizeOptionalText(payload.hospitalName ?? payload.hospital);
  const notes = normalizeOptionalText(payload.notes);

  const result = await db.query(
    `insert into service_requests (patient_id, type, region, city, hospital_name, notes)
     values ($1, $2, $3, $4, $5, $6)
     returning *`,
    [patientId, type, region, city, hospitalName, notes]
  );

  const request = result.rows[0];
  const admins = await db.query(`select id from users where role = 'admin'`);
  const destination = [region, city, hospitalName].filter(Boolean).join(' / ');
  const message = destination
    ? `New service request: ${type.replace(/_/g, ' ')} (${destination})`
    : `New service request: ${type.replace(/_/g, ' ')}`;
  const notificationData = JSON.stringify({
    patientId,
    serviceRequestId: request.id,
    type,
    region,
    city,
    hospitalName,
    notes,
  });

  for (const admin of admins.rows) {
    await db.query(
      `insert into notifications (user_id, type, message, data) values ($1, $2, $3, $4)`,
      [admin.id, 'service_request.created', message, notificationData]
    );
  }

  return request;
}

async function cleanupDailyRoom(roomUrl: string | null | undefined): Promise<void> {
  if (!roomUrl) {
    return;
  }

  try {
    await deleteRoom(roomUrl);
  } catch (error) {
    console.error('Daily room cleanup error:', error);
  }
}

patientRouter.post('/consults', requireAuth, requireRole(['patient']), async (req, res) => {
  const client = await db.connect();
  try {
    const { mode, symptoms } = req.body as { mode?: string; symptoms?: unknown };
    const user = (req as any).user;

    await client.query('BEGIN');
    // Serialize consult creation per patient to prevent duplicate open requests.
    await client.query(`select pg_advisory_xact_lock(hashtext($1))`, [user.userId]);

    const existingOpen = await client.query(
      `select cr.*,
              c.id as consultation_id,
              c.daily_room_url,
              c.status as consultation_status,
              u.display_name as gp_name
       from consult_requests cr
       left join consultations c on c.request_id = cr.id and c.status in ('ready', 'active')
       left join users u on u.id = c.gp_id
       where cr.patient_id = $1
         and cr.status in ('waiting', 'accepted')
       order by
         case
           when cr.status = 'accepted' and c.id is not null then 0
           when cr.status = 'accepted' then 1
           else 2
         end,
         cr.created_at desc
       limit 1`,
      [user.userId]
    );

    if (existingOpen.rows.length > 0) {
      await client.query('COMMIT');
      return res.json({ request: existingOpen.rows[0], reused: true });
    }

    const insert = await client.query(
      `insert into consult_requests (patient_id, mode, symptoms)
       values ($1, $2, $3) returning *`,
      [user.userId, mode || 'video', symptoms || {}]
    );

    const request = insert.rows[0];
    await client.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        user.userId,
        'consult.requested',
        'Your Health Expert request has been submitted.',
        JSON.stringify({ requestId: request.id })
      ]
    );

    await client.query('COMMIT');

    broadcastToRole('gp', 'queue.updated', { request });
    broadcastToRole('doctor', 'queue.updated', { request });
    broadcastToUser(user.userId, 'patient.consult.requested', { request });

    return res.json({ request, reused: false });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // no-op
    }
    console.error('Create consult request error', error);
    return res.status(500).json({ error: 'Unable to create consult request' });
  } finally {
    client.release();
  }
});

patientRouter.get('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      'select id, role, phone, display_name, created_at from users where id = $1',
      [user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get user profile error', error);
    return res.status(500).json({ error: 'Unable to fetch profile' });
  }
});

// API-08: Update patient profile
patientRouter.put('/me', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { displayName, firstName, lastName } = req.body as {
      displayName?: string;
      firstName?: string;
      lastName?: string;
    };

    const fields: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (displayName !== undefined) {
      fields.push(`display_name = $${idx++}`);
      values.push(displayName);
    }
    if (firstName !== undefined) {
      fields.push(`first_name = $${idx++}`);
      values.push(firstName);
    }
    if (lastName !== undefined) {
      fields.push(`last_name = $${idx++}`);
      values.push(lastName);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(user.userId);
    const result = await db.query(
      `update users set ${fields.join(', ')} where id = $${idx} returning id, role, phone, display_name, first_name, last_name, created_at`,
      values
    );

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Update profile error', error);
    return res.status(500).json({ error: 'Unable to update profile' });
  }
});

patientRouter.get('/referrals', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select r.*,
              u.display_name as specialist_name,
              u.phone as specialist_phone,
              pp.specialty as specialist_specialty,
              c.status as consultation_status,
              c.started_at as consultation_started_at,
              coalesce(c.completed_at, c.ended_at) as consultation_completed_at,
              c.daily_room_url
       from referrals r
       left join users u on u.id = r.to_specialist_id
       left join provider_profiles pp on pp.user_id = r.to_specialist_id
       left join consultations c on c.id = r.consultation_id
       where r.patient_id = $1
       order by r.created_at desc`,
      [user.userId]
    );
    return res.json({ referrals: result.rows });
  } catch (error) {
    console.error('List patient referrals error', error);
    return res.status(500).json({ error: 'Unable to list referrals' });
  }
});

patientRouter.get('/lab-orders', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select lo.*, u.display_name as specialist_name
       from lab_orders lo
       left join users u on u.id = lo.specialist_id
       where lo.patient_id = $1
       order by lo.created_at desc`,
      [user.userId]
    );
    return res.json({ orders: result.rows });
  } catch (error) {
    console.error('List patient lab orders error', error);
    return res.status(500).json({ error: 'Unable to list lab orders' });
  }
});

patientRouter.get('/consults', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      'select * from consult_requests where patient_id = $1 order by created_at desc',
      [user.userId]
    );
    return res.json({ requests: result.rows });
  } catch (error) {
    console.error('List consult requests error', error);
    return res.status(500).json({ error: 'Unable to list consult requests' });
  }
});

// Issue 1: Get active consult request with consultation details (for recovery after refresh/WS drop)
patientRouter.get('/consults/active', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    // Find the most recent waiting or accepted request, and join consultation if accepted
    const result = await db.query(
      `select cr.*,
              c.id as consultation_id,
              c.daily_room_url,
              c.status as consultation_status,
              u.display_name as gp_name
       from consult_requests cr
       left join consultations c on c.request_id = cr.id and c.status in ('ready', 'active')
       left join users u on u.id = c.gp_id
       where cr.patient_id = $1
         and cr.status in ('waiting', 'accepted')
       order by
         case
           when cr.status = 'accepted' and c.id is not null then 0
           when cr.status = 'accepted' then 1
           else 2
         end,
         cr.created_at desc
       limit 1`,
      [user.userId]
    );

    if (result.rows.length === 0) {
      return res.json({ active: null });
    }

    return res.json({ active: result.rows[0] });
  } catch (error) {
    console.error('Get active consult error', error);
    return res.status(500).json({ error: 'Unable to fetch active consult' });
  }
});

// Issue 3: Cancel a consult request (patient-initiated)
// GET /patient/details — extended profile including patient_profiles fields
patientRouter.get('/details', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      `select u.id, u.phone, u.display_name, u.first_name, u.last_name, u.created_at,
              pp.email, pp.date_of_birth, pp.gender, pp.address, pp.emergency_contact, pp.notes
       from users u
       left join patient_profiles pp on pp.user_id = u.id
       where u.id = $1`,
      [user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ details: result.rows[0] });
  } catch (error) {
    console.error('Get patient details error', error);
    return res.status(500).json({ error: 'Unable to fetch patient details' });
  }
});

// PUT /patient/details — update extended profile
patientRouter.put('/details', requireAuth, requireRole(['patient']), async (req, res) => {
  const client = await db.connect();
  try {
    const user = (req as any).user;
    const { displayName, firstName, lastName, email, dateOfBirth, gender, address, emergencyContact } = req.body as {
      displayName?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      dateOfBirth?: string;
      gender?: string;
      address?: string;
      emergencyContact?: Record<string, unknown>;
    };

    await client.query('BEGIN');

    // Update users table fields
    const userFields: string[] = [];
    const userValues: unknown[] = [];
    let idx = 1;
    if (displayName !== undefined) { userFields.push(`display_name = $${idx++}`); userValues.push(displayName); }
    if (firstName !== undefined) { userFields.push(`first_name = $${idx++}`); userValues.push(firstName); }
    if (lastName !== undefined) { userFields.push(`last_name = $${idx++}`); userValues.push(lastName); }

    if (userFields.length > 0) {
      userValues.push(user.userId);
      await client.query(
        `update users set ${userFields.join(', ')} where id = $${idx}`,
        userValues
      );
    }

    // Upsert patient_profiles
    const ppFields: string[] = [];
    const ppValues: unknown[] = [user.userId];
    let ppIdx = 2;
    if (email !== undefined) { ppFields.push(`email = $${ppIdx++}`); ppValues.push(email); }
    if (dateOfBirth !== undefined) { ppFields.push(`date_of_birth = $${ppIdx++}`); ppValues.push(dateOfBirth || null); }
    if (gender !== undefined) { ppFields.push(`gender = $${ppIdx++}`); ppValues.push(gender); }
    if (address !== undefined) { ppFields.push(`address = $${ppIdx++}`); ppValues.push(address); }
    if (emergencyContact !== undefined) { ppFields.push(`emergency_contact = $${ppIdx++}`); ppValues.push(JSON.stringify(emergencyContact)); }

    if (ppFields.length > 0) {
      await client.query(
        `insert into patient_profiles (user_id, ${ppFields.map(f => f.split(' = ')[0]).join(', ')})
         values ($1, ${ppFields.map((_, i) => `$${i + 2}`).join(', ')})
         on conflict (user_id) do update set ${ppFields.join(', ')}`,
        ppValues
      );
    }

    await client.query('COMMIT');

    const updated = await db.query(
      `select u.id, u.phone, u.display_name, u.first_name, u.last_name, u.created_at,
              pp.email, pp.date_of_birth, pp.gender, pp.address, pp.emergency_contact
       from users u
       left join patient_profiles pp on pp.user_id = u.id
       where u.id = $1`,
      [user.userId]
    );
    return res.json({ details: updated.rows[0] });
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { /* no-op */ }
    console.error('Update patient details error', error);
    return res.status(500).json({ error: 'Unable to update patient details' });
  } finally {
    client.release();
  }
});

// GET /patient/billing — payment methods + recent transactions
patientRouter.get('/billing', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const [methodsResult, txResult] = await Promise.all([
      db.query(
        `select * from patient_payment_methods where user_id = $1 order by is_default desc, created_at desc`,
        [user.userId]
      ),
      db.query(
        `select * from payment_transactions where user_id = $1 order by created_at desc limit 50`,
        [user.userId]
      )
    ]);
    return res.json({
      paymentMethods: methodsResult.rows,
      transactions: txResult.rows
    });
  } catch (error) {
    console.error('Get billing info error', error);
    return res.status(500).json({ error: 'Unable to fetch billing info' });
  }
});

// POST /patient/billing/methods — add mock payment method (no real processing)
patientRouter.post('/billing/methods', requireAuth, requireRole(['patient']), async (req, res) => {
  const client = await db.connect();
  try {
    const user = (req as any).user;
    const { cardBrand, cardLast4, cardExpiry, cardHolder, makeDefault } = req.body as {
      cardBrand?: string;
      cardLast4: string;
      cardExpiry: string;
      cardHolder?: string;
      makeDefault?: boolean;
    };

    if (!cardLast4 || cardLast4.length !== 4 || !/^\d{4}$/.test(cardLast4)) {
      return res.status(400).json({ error: 'Invalid card last 4 digits' });
    }
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      return res.status(400).json({ error: 'Invalid card expiry (MM/YY)' });
    }

    await client.query('BEGIN');

    if (makeDefault) {
      await client.query(
        `update patient_payment_methods set is_default = false where user_id = $1`,
        [user.userId]
      );
    }

    const countResult = await client.query(
      `select count(*) from patient_payment_methods where user_id = $1`,
      [user.userId]
    );
    const isFirstCard = parseInt(countResult.rows[0].count, 10) === 0;

    const insert = await client.query(
      `insert into patient_payment_methods (user_id, card_brand, card_last4, card_expiry, card_holder, is_default)
       values ($1, $2, $3, $4, $5, $6) returning *`,
      [user.userId, cardBrand || 'visa', cardLast4, cardExpiry, cardHolder || null, makeDefault || isFirstCard]
    );

    await client.query('COMMIT');
    return res.status(201).json({ paymentMethod: insert.rows[0] });
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch { /* no-op */ }
    console.error('Add payment method error', error);
    return res.status(500).json({ error: 'Unable to add payment method' });
  } finally {
    client.release();
  }
});

// DELETE /patient/billing/methods/:id — remove payment method
patientRouter.delete('/billing/methods/:id', requireAuth, requireRole(['patient']), async (req, res) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const result = await db.query(
      `delete from patient_payment_methods where id = $1 and user_id = $2 returning id`,
      [id, user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error('Remove payment method error', error);
    return res.status(500).json({ error: 'Unable to remove payment method' });
  }
});

patientRouter.post('/consults/:id/cancel', requireAuth, requireRole(['patient']), async (req, res) => {
  const client = await db.connect();

  try {
    const user = (req as any).user;
    const { id } = req.params;
    let endedConsultation: any = null;
    let cancelledRequest: any = null;

    await client.query('BEGIN');

    const requestResult = await client.query(
      `select * from consult_requests
       where id = $1 and patient_id = $2
       for update`,
      [id, user.userId]
    );

    if (requestResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Consult request not found' });
    }

    const request = requestResult.rows[0];
    if (!['waiting', 'accepted'].includes(request.status)) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Request can no longer be cancelled' });
    }

    const cancelledResult = await client.query(
      `update consult_requests
       set status = 'cancelled'
       where id = $1
       returning *`,
      [id]
    );
    cancelledRequest = cancelledResult.rows[0];

    if (request.status === 'accepted') {
      const consultationResult = await client.query(
        `update consultations
         set status = 'ended', ended_at = now()
         where request_id = $1 and patient_id = $2 and status in ('ready', 'active')
         returning *`,
        [id, user.userId]
      );
      endedConsultation = consultationResult.rows[0] || null;

      if (endedConsultation?.gp_id) {
        await client.query(
          `insert into notifications (user_id, type, message, data)
           values ($1, $2, $3, $4)`,
          [
            endedConsultation.gp_id,
            'consult.cancelled',
            'Patient cancelled the consultation.',
            JSON.stringify({ consultationId: endedConsultation.id, requestId: id })
          ]
        );
      }
    }

    await client.query('COMMIT');

    if (endedConsultation?.daily_room_url) {
      await cleanupDailyRoom(endedConsultation.daily_room_url);
    }

    if (endedConsultation) {
      // Notify both sides so open consult shells close immediately.
      broadcastToUser(user.userId, 'consult.completed', { consultation: endedConsultation });
      if (endedConsultation.gp_id) {
        broadcastToUser(endedConsultation.gp_id, 'consult.completed', { consultation: endedConsultation });
      }
    }

    broadcastToRole('gp', 'queue.updated', { cancelledId: id });
    broadcastToRole('doctor', 'queue.updated', { cancelledId: id });

    return res.json({ success: true, request: cancelledRequest, consultation: endedConsultation });
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // no-op
    }
    console.error('Cancel consult request error', error);
    return res.status(500).json({ error: 'Unable to cancel request' });
  } finally {
    client.release();
  }
});

// ── Service Requests / Callback Requests ────────────────────────────────────
const createServiceRequestHandler = async (req: any, res: any) => {
  try {
    const user = req.user;
    const request = await createPatientServiceRequest(user.userId, req.body || {});
    return res.json({ ok: true, request });
  } catch (error) {
    console.error('Service request error', error);
    return res.status(500).json({ error: 'Unable to submit service request' });
  }
};

patientRouter.post('/service-requests', requireAuth, requireRole(['patient']), createServiceRequestHandler);
patientRouter.post('/callback-request', requireAuth, requireRole(['patient']), createServiceRequestHandler);

// ── Specialists List ─────────────────────────────────────────────────────────
patientRouter.get('/specialists', requireAuth, requireRole(['patient']), async (_req, res) => {
  try {
    const result = await db.query(`
      select u.id,
             nullif(trim(u.display_name), '') as display_name,
             nullif(trim(u.first_name), '') as first_name,
             nullif(trim(u.last_name), '') as last_name,
             nullif(trim(pp.specialty), '') as specialty,
             nullif(trim(pp.facility_name), '') as facility_name,
             nullif(trim(coalesce(pp.notes->>'bio', '')), '') as bio
      from users u
      left join provider_profiles pp on pp.user_id = u.id
      where u.role = 'specialist' and u.is_operating = true
      order by coalesce(
        nullif(trim(u.display_name), ''),
        concat_ws(' ', nullif(trim(u.first_name), ''), nullif(trim(u.last_name), '')),
        u.phone
      )
    `);
    const specialists = result.rows.map((row) => {
      const fallbackName = [row.first_name, row.last_name].filter(Boolean).join(' ').trim();
      return {
        ...row,
        display_name: row.display_name || fallbackName || 'Specialist',
        specialty: row.specialty || 'General Specialist',
      };
    });
    return res.json({ specialists });
  } catch (error) {
    console.error('Specialists list error', error);
    return res.json({ specialists: [] });
  }
});

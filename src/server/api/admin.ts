import { Router } from 'express';
import * as bcrypt from 'bcryptjs';
import { db } from '../db';
import { requireAuth, requireRole, type AuthUser } from '../middleware/auth';

export const adminRouter = Router();

function isUndefinedColumnError(error: unknown): boolean {
  const err = error as { code?: string };
  return err?.code === '42703';
}

function isUndefinedTableError(error: unknown): boolean {
  const err = error as { code?: string };
  return err?.code === '42P01';
}

function isUniqueViolation(error: unknown): boolean {
  const err = error as { code?: string };
  return err?.code === '23505';
}

const VALID_ROLES = ['patient', 'gp', 'doctor', 'specialist', 'pharmacist', 'pharmacy_tech', 'lab_tech', 'radiologist', 'pathologist', 'admin'];
const VALID_SERVICE_REQUEST_STATUSES = ['new', 'contacted', 'closed'];
const VALID_ADMIN_WORKFLOW_STATUSES = ['contacted', 'completed', 'accepted', 'rejected', 'home_delivery', 'in_service'] as const;
const VALID_ADMIN_WORKFLOW_ENTITY_TYPES = ['service_request', 'referral', 'prescription'] as const;

type AdminWorkflowStatus = (typeof VALID_ADMIN_WORKFLOW_STATUSES)[number];
type AdminWorkflowEntityType = (typeof VALID_ADMIN_WORKFLOW_ENTITY_TYPES)[number];

function buildAdminUsersQueries(
  role: string | undefined,
  search: string | undefined,
  includeNameColumns: boolean,
  includeOperatingColumn: boolean
) {
  const nameColumns = includeNameColumns
    ? 'first_name, last_name'
    : `null::text as first_name, null::text as last_name`;
  const operatingColumn = includeOperatingColumn
    ? 'is_operating'
    : 'true as is_operating';
  const params: unknown[] = [];
  const conditions: string[] = [];

  if (role) {
    params.push(role);
    conditions.push(`role = $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    if (includeNameColumns) {
      conditions.push(`(display_name ilike $${params.length} or phone ilike $${params.length} or first_name ilike $${params.length} or last_name ilike $${params.length})`);
    } else {
      conditions.push(`(display_name ilike $${params.length} or phone ilike $${params.length})`);
    }
  }

  const whereClause = conditions.length > 0 ? ` where ${conditions.join(' and ')}` : '';

  return {
    params,
    countQuery: `select count(*) from users${whereClause}`,
    listQuery: `select id, role, phone, display_name, ${nameColumns}, ${operatingColumn}, created_at from users${whereClause} order by created_at desc`
  };
}

async function logAdminActivity(
  actorUserId: string | undefined,
  action: string,
  targetUserId: string | null,
  targetPhone: string | null,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    await db.query(
      `insert into admin_activity (actor_user_id, action, target_user_id, target_phone, metadata)
       values ($1, $2, $3, $4, $5)`,
      [actorUserId || null, action, targetUserId, targetPhone, metadata]
    );
  } catch (error) {
    if (isUndefinedTableError(error)) {
      return;
    }
    console.error('Admin activity log error', error);
  }
}

function isValidWorkflowStatus(value: string | undefined): value is AdminWorkflowStatus {
  return Boolean(value && VALID_ADMIN_WORKFLOW_STATUSES.includes(value as AdminWorkflowStatus));
}

async function addWorkflowTracking(
  entityType: AdminWorkflowEntityType,
  entityId: string,
  workflowStatus: AdminWorkflowStatus,
  updatedBy: string | undefined,
  notes?: string
): Promise<void> {
  await db.query(
    `insert into admin_workflow_tracking (entity_type, entity_id, workflow_status, notes, updated_by)
     values ($1, $2, $3, $4, $5)`,
    [entityType, entityId, workflowStatus, notes?.trim() || null, updatedBy || null]
  );
}

// API-14: List all users (paginated)
adminRouter.get('/users', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 25));
    const offset = (page - 1) * limit;
    const role = req.query['role'] as string | undefined;
    const search = req.query['search'] as string | undefined;

    const queryUsers = async (includeNameColumns: boolean, includeOperatingColumn: boolean) => {
      const { params, countQuery, listQuery } = buildAdminUsersQueries(
        role,
        search,
        includeNameColumns,
        includeOperatingColumn
      );
      const countResult = await db.query(countQuery, params);
      const total = parseInt(countResult.rows[0].count);

      const listParams = [...params, limit, offset];
      const result = await db.query(
        `${listQuery} limit $${listParams.length - 1} offset $${listParams.length}`,
        listParams
      );
      return {
        users: result.rows,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
      };
    };

    const variants = [
      { includeNameColumns: true, includeOperatingColumn: true },
      { includeNameColumns: false, includeOperatingColumn: true },
      { includeNameColumns: false, includeOperatingColumn: false }
    ];

    let lastError: unknown = null;
    for (const variant of variants) {
      try {
        const payload = await queryUsers(variant.includeNameColumns, variant.includeOperatingColumn);
        return res.json(payload);
      } catch (error) {
        lastError = error;
        if (!isUndefinedColumnError(error)) {
          throw error;
        }
      }
    }

    throw lastError;
  } catch (error) {
    console.error('Admin list users error', error);
    return res.status(500).json({ error: 'Unable to list users' });
  }
});

// API-14: Get single user
adminRouter.post('/users', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const actor = (req as { user?: AuthUser }).user;
    const {
      phone,
      password,
      role,
      displayName,
      firstName,
      lastName
    } = req.body as {
      phone?: string;
      password?: string;
      role?: string;
      displayName?: string;
      firstName?: string;
      lastName?: string;
    };

    const normalizedPhone = String(phone || '').trim();
    const normalizedRole = String(role || '').trim();
    const normalizedPassword = String(password || '');
    const normalizedDisplayName = String(displayName || firstName || 'Demo User').trim();
    const normalizedFirstName = String(firstName || '').trim();
    const normalizedLastName = String(lastName || '').trim();

    if (!normalizedPhone || !normalizedRole || !normalizedPassword) {
      return res.status(400).json({ error: 'phone, role and password are required' });
    }

    if (!VALID_ROLES.includes(normalizedRole)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` });
    }

    if (normalizedPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const passwordHash = await bcrypt.hash(normalizedPassword, 10);
    const result = await db.query(
      `insert into users (role, phone, password_hash, display_name, first_name, last_name, is_operating)
       values ($1, $2, $3, $4, $5, $6, true)
       returning id, role, phone, display_name, first_name, last_name, is_operating, created_at`,
      [
        normalizedRole,
        normalizedPhone,
        passwordHash,
        normalizedDisplayName,
        normalizedFirstName || null,
        normalizedLastName || null
      ]
    );

    const createdUser = result.rows[0];
    await logAdminActivity(actor?.userId, 'user.created', createdUser.id, createdUser.phone, {
      role: createdUser.role,
      displayName: createdUser.display_name
    });

    return res.status(201).json({ user: createdUser });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return res.status(409).json({ error: 'phone already registered' });
    }
    console.error('Admin create user error', error);
    return res.status(500).json({ error: 'Unable to create user' });
  }
});

// API-14: Get single user
adminRouter.get('/users/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const variants = [
      `select id, role, phone, display_name, first_name, last_name, is_operating, created_at from users where id = $1`,
      `select id, role, phone, display_name, null::text as first_name, null::text as last_name, is_operating, created_at from users where id = $1`,
      `select id, role, phone, display_name, null::text as first_name, null::text as last_name, true as is_operating, created_at from users where id = $1`
    ];

    let result: { rows: any[] } | null = null;
    let lastError: unknown = null;
    for (const query of variants) {
      try {
        result = await db.query(query, [id]);
        break;
      } catch (error) {
        lastError = error;
        if (!isUndefinedColumnError(error)) {
          throw error;
        }
      }
    }

    if (!result) {
      throw lastError;
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Admin get user error', error);
    return res.status(500).json({ error: 'Unable to get user' });
  }
});

// API-14: Update user role
adminRouter.patch('/users/:id/role', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const actor = (req as { user?: AuthUser }).user;
    const { id } = req.params;
    const { role } = req.body as { role?: string };

    if (!role || !VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` });
    }

    const result = await db.query(
      `update users set role = $2 where id = $1 returning id, role, phone, display_name`,
      [id, role]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = result.rows[0];
    await logAdminActivity(actor?.userId, 'user.role.updated', updatedUser.id, updatedUser.phone, {
      role: updatedUser.role
    });

    return res.json({ user: updatedUser });
  } catch (error) {
    console.error('Admin update role error', error);
    return res.status(500).json({ error: 'Unable to update user role' });
  }
});

// API-14: Disable/enable user account
adminRouter.patch('/users/:id/status', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const actor = (req as { user?: AuthUser }).user;
    const { active } = req.body as { active?: boolean };

    if (typeof active !== 'boolean') {
      return res.status(400).json({ error: 'active field (boolean) is required' });
    }

    // Prevent admin from disabling themselves
    if (id === actor?.userId && !active) {
      return res.status(400).json({ error: 'Cannot disable your own account' });
    }

    const result = await db.query(
      `update users set is_operating = $2 where id = $1 returning id, role, phone, display_name, is_operating`,
      [id, active]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = result.rows[0];
    await logAdminActivity(actor?.userId, 'user.status.updated', updatedUser.id, updatedUser.phone, {
      active: updatedUser.is_operating
    });

    return res.json({ user: updatedUser });
  } catch (error) {
    console.error('Admin update status error', error);
    return res.status(500).json({ error: 'Unable to update user status' });
  }
});

adminRouter.get('/activity', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 25));
    const offset = (page - 1) * limit;

    let total = 0;
    try {
      const countResult = await db.query('select count(*) from admin_activity');
      total = parseInt(countResult.rows[0].count || '0');
    } catch (error) {
      if (!isUndefinedTableError(error)) {
        throw error;
      }
      return res.json({
        events: [],
        pagination: { page, limit, total: 0, pages: 0 }
      });
    }

    const result = await db.query(
      `select
         aa.id,
         aa.action,
         aa.target_user_id,
         aa.target_phone,
         aa.metadata,
         aa.created_at,
         actor.display_name as actor_name,
         actor.phone as actor_phone,
         target.display_name as target_name
       from admin_activity aa
       left join users actor on actor.id = aa.actor_user_id
       left join users target on target.id = aa.target_user_id
       order by aa.created_at desc
       limit $1
       offset $2`,
      [limit, offset]
    );

    return res.json({
      events: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin activity error', error);
    return res.status(500).json({ error: 'Unable to fetch admin activity' });
  }
});

adminRouter.get('/service-requests', requireAuth, requireRole(['admin']), async (_req, res) => {
  try {
    const result = await db.query(
      `select
         sr.*,
         patient.display_name as patient_name,
         patient.phone as patient_phone,
         handler.display_name as handled_by_name,
         workflow.workflow_status as admin_workflow_status,
         workflow.updated_by_name as admin_workflow_updated_by_name,
         workflow.created_at as admin_workflow_updated_at
       from service_requests sr
       join users patient on patient.id = sr.patient_id
       left join users handler on handler.id = sr.handled_by
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'service_request'
           and awt.entity_id = sr.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       order by sr.created_at desc`
    );

    return res.json({ requests: result.rows });
  } catch (error) {
    console.error('Admin service requests error', error);
    return res.status(500).json({ error: 'Unable to fetch service requests' });
  }
});

adminRouter.patch('/service-requests/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const actor = (req as { user?: AuthUser }).user;
    const { id } = req.params;
    const { status, workflowStatus, notes } = req.body as {
      status?: string;
      workflowStatus?: string;
      notes?: string;
    };

    if (!status && !workflowStatus) {
      return res.status(400).json({ error: 'status or workflowStatus is required' });
    }

    if (status && !VALID_SERVICE_REQUEST_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Must be one of: ${VALID_SERVICE_REQUEST_STATUSES.join(', ')}`
      });
    }
    if (workflowStatus && !isValidWorkflowStatus(workflowStatus)) {
      return res.status(400).json({
        error: `Invalid workflowStatus. Must be one of: ${VALID_ADMIN_WORKFLOW_STATUSES.join(', ')}`
      });
    }

    let result;
    if (status) {
      result = await db.query(
        `update service_requests
         set status = $2,
             handled_by = $3,
             updated_at = now()
         where id = $1
         returning id`,
        [id, status, actor?.userId || null]
      );
    } else {
      result = await db.query(`select id from service_requests where id = $1`, [id]);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    if (status) {
      await logAdminActivity(actor?.userId, 'service_request.status.updated', null, null, {
        requestId: id,
        status,
      });
    }
    if (workflowStatus && isValidWorkflowStatus(workflowStatus)) {
      await addWorkflowTracking('service_request', id, workflowStatus, actor?.userId, notes);
      await logAdminActivity(actor?.userId, 'service_request.workflow.updated', null, null, {
        requestId: id,
        workflowStatus,
      });
    }

    const hydratedRequest = await db.query(
      `select
         sr.*,
         patient.display_name as patient_name,
         patient.phone as patient_phone,
         handler.display_name as handled_by_name,
         workflow.workflow_status as admin_workflow_status,
         workflow.updated_by_name as admin_workflow_updated_by_name,
         workflow.created_at as admin_workflow_updated_at
       from service_requests sr
       join users patient on patient.id = sr.patient_id
       left join users handler on handler.id = sr.handled_by
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'service_request'
           and awt.entity_id = sr.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       where sr.id = $1
       limit 1`,
      [id]
    );

    return res.json({ request: hydratedRequest.rows[0] });
  } catch (error) {
    console.error('Admin update service request error', error);
    return res.status(500).json({ error: 'Unable to update service request' });
  }
});

// Admin: List prescriptions (for Pharmacy tab)
adminRouter.get('/prescriptions', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 25));
    const offset = (page - 1) * limit;

    let total = 0;
    try {
      const countResult = await db.query('select count(*) from prescriptions');
      total = parseInt(countResult.rows[0].count || '0');
    } catch (error) {
      if (!isUndefinedTableError(error)) {
        throw error;
      }
      return res.json({
        prescriptions: [],
        pagination: { page, limit, total: 0, pages: 0 }
      });
    }

    const result = await db.query(
      `select p.id, p.code, p.items, p.status, p.created_at,
              p.patient_contacted, p.patient_contacted_at, p.patient_contact_note,
              u.display_name as patient_name, u.phone as patient_phone,
              contact_admin.display_name as patient_contacted_by_name,
              workflow.workflow_status as admin_workflow_status,
              workflow.updated_by_name as admin_workflow_updated_by_name,
              workflow.created_at as admin_workflow_updated_at
       from prescriptions p
       join users u on u.id = p.patient_id
       left join users contact_admin on contact_admin.id = p.patient_contacted_by
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'prescription'
           and awt.entity_id = p.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       order by p.created_at desc
       limit $1 offset $2`,
      [limit, offset]
    );

    return res.json({
      prescriptions: result.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Admin prescriptions error', error);
    return res.status(500).json({ error: 'Unable to fetch prescriptions' });
  }
});

adminRouter.patch('/prescriptions/:id/contact', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const actor = (req as { user?: AuthUser }).user;
    const { id } = req.params;
    const { contacted, note, workflowStatus } = req.body as {
      contacted?: boolean;
      note?: string;
      workflowStatus?: string;
    };

    if (typeof contacted !== 'boolean') {
      return res.status(400).json({ error: 'contacted field (boolean) is required' });
    }
    if (workflowStatus && !isValidWorkflowStatus(workflowStatus)) {
      return res.status(400).json({
        error: `Invalid workflowStatus. Must be one of: ${VALID_ADMIN_WORKFLOW_STATUSES.join(', ')}`
      });
    }

    const updated = await db.query(
      `update prescriptions
       set patient_contacted = $2,
           patient_contacted_by = case when $2 then $3 else null end,
           patient_contacted_at = case when $2 then now() else null end,
           patient_contact_note = $4
       where id = $1
       returning id, patient_id`,
      [id, contacted, actor?.userId || null, note?.trim() || null]
    );
    if (updated.rows.length === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    await logAdminActivity(actor?.userId, 'prescription.patient_contact.updated', updated.rows[0].patient_id, null, {
      prescriptionId: id,
      contacted,
      note: note?.trim() || null
    });

    if (workflowStatus && isValidWorkflowStatus(workflowStatus)) {
      await addWorkflowTracking('prescription', id, workflowStatus, actor?.userId, note);
      await logAdminActivity(actor?.userId, 'prescription.workflow.updated', updated.rows[0].patient_id, null, {
        prescriptionId: id,
        workflowStatus
      });
    }

    const hydrated = await db.query(
      `select p.id, p.code, p.items, p.status, p.created_at,
              p.patient_contacted, p.patient_contacted_at, p.patient_contact_note,
              u.display_name as patient_name, u.phone as patient_phone,
              contact_admin.display_name as patient_contacted_by_name,
              workflow.workflow_status as admin_workflow_status,
              workflow.updated_by_name as admin_workflow_updated_by_name,
              workflow.created_at as admin_workflow_updated_at
       from prescriptions p
       join users u on u.id = p.patient_id
       left join users contact_admin on contact_admin.id = p.patient_contacted_by
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'prescription'
           and awt.entity_id = p.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       where p.id = $1
       limit 1`,
      [id]
    );

    return res.json({ prescription: hydrated.rows[0] });
  } catch (error) {
    console.error('Admin update prescription contact error', error);
    return res.status(500).json({ error: 'Unable to update prescription contact' });
  }
});

adminRouter.get('/referrals', requireAuth, requireRole(['admin']), async (_req, res) => {
  try {
    const result = await db.query(
      `select r.id, r.status, r.urgency, r.reason, r.specialty, r.created_at,
              patient.display_name as patient_name,
              patient.phone as patient_phone,
              specialist.display_name as specialist_name,
              workflow.workflow_status as admin_workflow_status,
              workflow.updated_by_name as admin_workflow_updated_by_name,
              workflow.created_at as admin_workflow_updated_at
       from referrals r
       join users patient on patient.id = r.patient_id
       left join users specialist on specialist.id = r.to_specialist_id
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'referral'
           and awt.entity_id = r.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       order by r.created_at desc`
    );

    return res.json({ referrals: result.rows });
  } catch (error) {
    console.error('Admin referrals error', error);
    return res.status(500).json({ error: 'Unable to fetch referrals' });
  }
});

adminRouter.patch('/referrals/:id/workflow', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const actor = (req as { user?: AuthUser }).user;
    const { id } = req.params;
    const { workflowStatus, notes } = req.body as { workflowStatus?: string; notes?: string };

    if (!isValidWorkflowStatus(workflowStatus)) {
      return res.status(400).json({
        error: `Invalid workflowStatus. Must be one of: ${VALID_ADMIN_WORKFLOW_STATUSES.join(', ')}`
      });
    }

    const exists = await db.query(`select id, patient_id from referrals where id = $1`, [id]);
    if (exists.rows.length === 0) {
      return res.status(404).json({ error: 'Referral not found' });
    }

    await addWorkflowTracking('referral', id, workflowStatus, actor?.userId, notes);
    await logAdminActivity(actor?.userId, 'referral.workflow.updated', exists.rows[0].patient_id, null, {
      referralId: id,
      workflowStatus
    });

    const hydrated = await db.query(
      `select r.id, r.status, r.urgency, r.reason, r.specialty, r.created_at,
              patient.display_name as patient_name,
              patient.phone as patient_phone,
              specialist.display_name as specialist_name,
              workflow.workflow_status as admin_workflow_status,
              workflow.updated_by_name as admin_workflow_updated_by_name,
              workflow.created_at as admin_workflow_updated_at
       from referrals r
       join users patient on patient.id = r.patient_id
       left join users specialist on specialist.id = r.to_specialist_id
       left join lateral (
         select
           awt.workflow_status,
           awt.created_at,
           updater.display_name as updated_by_name
         from admin_workflow_tracking awt
         left join users updater on updater.id = awt.updated_by
         where awt.entity_type = 'referral'
           and awt.entity_id = r.id
         order by awt.created_at desc
         limit 1
       ) workflow on true
       where r.id = $1
       limit 1`,
      [id]
    );

    return res.json({ referral: hydrated.rows[0] });
  } catch (error) {
    console.error('Admin update referral workflow error', error);
    return res.status(500).json({ error: 'Unable to update referral workflow' });
  }
});

// API-14: System health overview for admin
adminRouter.get('/system/health', requireAuth, requireRole(['admin']), async (_req, res) => {
  try {
    const userCounts = await db.query(
      `select role, count(*) as count from users group by role order by role`
    );

    const recentConsults = await db.query(
      `select count(*) from consultations where started_at > now() - interval '24 hours'`
    );

    const pendingQueue = await db.query(
      `select count(*) from consult_requests where status = 'waiting'`
    );

    return res.json({
      users: {
        byRole: userCounts.rows.reduce((acc: Record<string, number>, row: any) => {
          acc[row.role] = parseInt(row.count);
          return acc;
        }, {}),
        total: userCounts.rows.reduce((sum: number, row: any) => sum + parseInt(row.count), 0)
      },
      activity: {
        consultationsLast24h: parseInt(recentConsults.rows[0].count),
        pendingQueueSize: parseInt(pendingQueue.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Admin system health error', error);
    return res.status(500).json({ error: 'Unable to fetch system health' });
  }
});

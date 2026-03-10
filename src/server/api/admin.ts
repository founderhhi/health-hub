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

// API-14: List all users (paginated)
adminRouter.get('/users', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 25));
    const offset = (page - 1) * limit;
    const role = req.query['role'] as string | undefined;
    const search = req.query['search'] as string | undefined;

    const queryUsers = async (includeNameColumns: boolean, includeOperatingColumn: boolean) => {
      const nameColumns = includeNameColumns
        ? 'first_name, last_name'
        : `null::text as first_name, null::text as last_name`;
      const operatingColumn = includeOperatingColumn
        ? 'is_operating'
        : 'true as is_operating';
      let query = `select id, role, phone, display_name, ${nameColumns}, ${operatingColumn}, created_at from users`;
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

      if (conditions.length > 0) {
        query += ` where ${conditions.join(' and ')}`;
      }

      query += ` order by created_at desc`;

      const countQuery = query.replace(/select[\s\S]+? from/, 'select count(*) from');
      const countResult = await db.query(countQuery, params);
      const total = parseInt(countResult.rows[0].count);

      params.push(limit);
      query += ` limit $${params.length}`;
      params.push(offset);
      query += ` offset $${params.length}`;

      const result = await db.query(query, params);
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

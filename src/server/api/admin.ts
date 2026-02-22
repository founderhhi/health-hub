import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';

export const adminRouter = Router();

// API-14: List all users (paginated)
adminRouter.get('/users', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 25));
    const offset = (page - 1) * limit;
    const role = req.query['role'] as string | undefined;
    const search = req.query['search'] as string | undefined;

    let query = `select id, role, phone, display_name, first_name, last_name, is_operating, created_at from users`;
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (role) {
      params.push(role);
      conditions.push(`role = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(display_name ilike $${params.length} or phone ilike $${params.length} or first_name ilike $${params.length} or last_name ilike $${params.length})`);
    }

    if (conditions.length > 0) {
      query += ` where ${conditions.join(' and ')}`;
    }

    query += ` order by created_at desc`;

    // Count total
    const countQuery = query.replace(/select .+ from/, 'select count(*) from');
    const countResult = await db.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit);
    query += ` limit $${params.length}`;
    params.push(offset);
    query += ` offset $${params.length}`;

    const result = await db.query(query, params);

    return res.json({
      users: result.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Admin list users error', error);
    return res.status(500).json({ error: 'Unable to list users' });
  }
});

// API-14: Get single user
adminRouter.get('/users/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `select id, role, phone, display_name, first_name, last_name, is_operating, created_at
       from users where id = $1`,
      [id]
    );

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
    const { id } = req.params;
    const { role } = req.body as { role?: string };
    const validRoles = ['patient', 'gp', 'doctor', 'specialist', 'pharmacist', 'pharmacy_tech', 'lab_tech', 'radiologist', 'pathologist', 'admin'];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
    }

    const result = await db.query(
      `update users set role = $2 where id = $1 returning id, role, phone, display_name`,
      [id, role]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Admin update role error', error);
    return res.status(500).json({ error: 'Unable to update user role' });
  }
});

// API-14: Disable/enable user account
adminRouter.patch('/users/:id/status', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const { active } = req.body as { active?: boolean };

    if (typeof active !== 'boolean') {
      return res.status(400).json({ error: 'active field (boolean) is required' });
    }

    // Prevent admin from disabling themselves
    if (id === user.userId && !active) {
      return res.status(400).json({ error: 'Cannot disable your own account' });
    }

    const result = await db.query(
      `update users set is_operating = $2 where id = $1 returning id, role, phone, display_name, is_operating`,
      [id, active]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Admin update status error', error);
    return res.status(500).json({ error: 'Unable to update user status' });
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

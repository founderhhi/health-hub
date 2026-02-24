import type { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { db } from '../db';

const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';
const isTestEnv = process.env['NODE_ENV'] === 'test';

export const loginRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again in a minute.' },
  skip: () => isTestEnv,
});

export interface AuthUser {
  userId: string;
  role: string;
  phone: string;
  tokenType?: string;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as Partial<AuthUser>;
    if (!payload.userId || !payload.role || !payload.phone || payload.tokenType === 'refresh') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Enforce current account status for every authenticated request so disabled
    // users lose API access immediately, even with pre-existing access tokens.
    const userResult = await db.query(
      `select id, role, phone, is_operating
       from users
       where id = $1`,
      [payload.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const activeUser = userResult.rows[0] as { id: string; role: string; phone: string; is_operating: boolean };
    if (!activeUser.is_operating) {
      return res.status(403).json({ error: 'Account is disabled' });
    }

    const user: AuthUser = {
      userId: activeUser.id,
      role: activeUser.role,
      phone: activeUser.phone,
      tokenType: payload.tokenType
    };
    (req as Request & { user?: AuthUser }).user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: AuthUser }).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  };
}

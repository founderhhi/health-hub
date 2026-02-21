import type { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

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

export function requireAuth(req: Request, res: Response, next: NextFunction) {
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

    const user: AuthUser = {
      userId: payload.userId,
      role: payload.role,
      phone: payload.phone,
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

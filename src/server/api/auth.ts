import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { db } from '../db';
import { loginRateLimit, requireAuth } from '../middleware/auth';

export const authRouter = Router();

const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';
const accessTokenTtl = '7d';
const refreshTokenTtl = '30d';

// AUTH-06: Password validation rules
function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  return { valid: true };
}

type TokenSubject = {
  id: string;
  role: string;
  phone: string;
};

function mintAccessToken(user: TokenSubject): string {
  return jwt.sign(
    { userId: user.id, role: user.role, phone: user.phone, tokenType: 'access' },
    jwtSecret,
    { expiresIn: accessTokenTtl }
  );
}

function mintRefreshToken(user: TokenSubject): string {
  return jwt.sign(
    { userId: user.id, role: user.role, phone: user.phone, tokenType: 'refresh' },
    jwtSecret,
    { expiresIn: refreshTokenTtl }
  );
}

authRouter.post('/signup', async (req, res) => {
  try {
    const { phone, password, displayName } = req.body as { phone?: string; password?: string; displayName?: string };
    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password required' });
    }

    const pwCheck = validatePassword(password);
    if (!pwCheck.valid) {
      return res.status(400).json({ error: pwCheck.error });
    }

    const existing = await db.query('select id from users where phone = $1', [phone]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'phone already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insert = await db.query(
      'insert into users (role, phone, password_hash, display_name) values ($1, $2, $3, $4) returning id, role, phone, display_name',
      ['patient', phone, passwordHash, displayName || 'Patient']
    );

    const user = insert.rows[0];
    const token = mintAccessToken(user);
    const refreshToken = mintRefreshToken(user);

    return res.json({ token, refreshToken, user });
  } catch (error) {
    console.error('Signup error', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
});

authRouter.post('/login', loginRateLimit, async (req, res) => {
  try {
    const { phone, password } = req.body as { phone?: string; password?: string };
    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password required' });
    }

    const result = await db.query(
      'select id, role, phone, password_hash, display_name, is_operating from users where phone = $1', // [AGENT_AUTH] ISS-09: include is_operating
      [phone]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const stored = user.password_hash as string;

    let valid = false;
    if (stored.startsWith('$2')) {
      valid = await bcrypt.compare(password, stored);
    } else {
      valid = stored === password;
    }

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_operating) {
      return res.status(403).json({ error: 'Account is disabled' }); // [AGENT_AUTH] ISS-09: block disabled users at login
    }

    const token = mintAccessToken(user);
    const refreshToken = mintRefreshToken(user);

    return res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        role: user.role,
        phone: user.phone,
        display_name: user.display_name
      }
    });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ error: 'Login failed' });
  }
});

authRouter.post('/forgot-password', async (req, res) => {
  const { phone } = (req.body || {}) as { phone?: string };
  if (phone) {
    console.log(`Password reset requested for: ${phone}`);
  }

  return res.json({
    success: true,
    message: 'If this phone number is registered, you will receive reset instructions.'
  });
});

authRouter.post('/refresh', async (req, res) => {
  try {
    const body = (req.body || {}) as { refreshToken?: string; refresh_token?: string };
    const refreshToken = body.refreshToken || body.refresh_token;
    if (!refreshToken) {
      return res.status(400).json({ error: 'refresh token required' });
    }

    const payload = jwt.verify(refreshToken, jwtSecret) as {
      userId?: string;
      role?: string;
      phone?: string;
      tokenType?: string;
    };

    if (payload.tokenType !== 'refresh' || !payload.userId) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const result = await db.query('select id, role, phone, is_operating from users where id = $1', [payload.userId]); // [AGENT_AUTH] ISS-09: include is_operating
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = result.rows[0] as TokenSubject;

    if (!(user as any).is_operating) {
      return res.status(403).json({ error: 'Account is disabled' }); // [AGENT_AUTH] ISS-09: block disabled users at token refresh
    }

    const token = mintAccessToken(user);
    return res.json({ token });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

authRouter.get('/validate', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const result = await db.query(
      'select id, role, phone, display_name from users where id = $1',
      [user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ valid: true, user: result.rows[0] });
  } catch (error) {
    console.error('Validate auth error', error);
    return res.status(500).json({ error: 'Unable to validate session' });
  }
});

authRouter.post('/logout', requireAuth, (_req, res) => {
  return res.json({ ok: true });
});

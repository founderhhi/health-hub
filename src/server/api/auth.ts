import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { db } from '../db';
import { loginRateLimit, requireAuth } from '../middleware/auth';

export const authRouter = Router();

const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';
const accessTokenTtl = '7d';
const refreshTokenTtl = '30d';
const SIGNUP_ROLES = ['patient', 'gp', 'specialist', 'pharmacist', 'lab_tech', 'radiologist', 'pathologist'] as const;
const APPROVAL_REQUIRED_ROLES = ['gp', 'specialist', 'pharmacist', 'lab_tech', 'radiologist', 'pathologist'] as const;
const SPECIALIST_SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Neurology',
  'Pediatrics',
  'Oncology',
  'ENT',
  'Ophthalmology',
  'General Surgery'
] as const;

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

function isUndefinedColumnError(error: unknown, columnName: string): boolean {
  const err = error as { code?: string; message?: string };
  return err?.code === '42703' && (err.message || '').includes(columnName);
}

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

function requiresManualApproval(role: string): boolean {
  return APPROVAL_REQUIRED_ROLES.includes(role as (typeof APPROVAL_REQUIRED_ROLES)[number]);
}

function resolveProviderSpecialty(role: string, requestedSpecialty: string | undefined): string | null {
  const normalizedSpecialty = String(requestedSpecialty || '').trim();

  if (role === 'gp') {
    return 'General Practice';
  }
  if (role === 'specialist') {
    return normalizedSpecialty || null;
  }
  if (role === 'pharmacist') {
    return 'Pharmacy';
  }
  if (role === 'lab_tech') {
    return 'Laboratory';
  }
  if (role === 'radiologist') {
    return 'Radiology';
  }
  if (role === 'pathologist') {
    return 'Pathology';
  }
  return null;
}

function resolveLoginBlockMessage(accountStatus: string | undefined, isOperating: boolean | undefined): string | null {
  if (accountStatus === 'pending_review') {
    return 'Account is pending manual verification';
  }
  if (accountStatus === 'disabled' || isOperating === false) {
    return 'Account is disabled';
  }
  return null;
}

authRouter.post('/signup', async (req, res) => {
  try {
    const { phone, password, displayName, role, specialty, organizationName } = req.body as {
      phone?: string;
      password?: string;
      displayName?: string;
      role?: string;
      specialty?: string;
      organizationName?: string;
    };
    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password required' });
    }

    const normalizedRole = String(role || 'patient').trim() || 'patient';
    if (!SIGNUP_ROLES.includes(normalizedRole as (typeof SIGNUP_ROLES)[number])) {
      return res.status(400).json({ error: 'Unsupported signup role' });
    }

    const normalizedOrganizationName = String(organizationName || '').trim();
    const normalizedSpecialty = String(specialty || '').trim();
    if (requiresManualApproval(normalizedRole) && !normalizedOrganizationName) {
      return res.status(400).json({ error: 'Organization or partner name is required for provider signup' });
    }
    if (normalizedRole === 'specialist' && !normalizedSpecialty) {
      return res.status(400).json({ error: 'Specialization is required for specialist signup' });
    }
    if (normalizedRole === 'specialist' && !SPECIALIST_SPECIALTIES.includes(normalizedSpecialty as (typeof SPECIALIST_SPECIALTIES)[number])) {
      return res.status(400).json({ error: 'Please choose a valid specialist specialization' });
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
    const accountStatus = requiresManualApproval(normalizedRole) ? 'pending_review' : 'active';
    const enabled = accountStatus === 'active';
    const insert = await db.query(
      `insert into users (role, phone, password_hash, display_name, account_status, is_operating)
       values ($1, $2, $3, $4, $5, $6)
       returning id, role, phone, display_name, account_status, is_operating`,
      [normalizedRole, phone, passwordHash, displayName || 'Patient', accountStatus, enabled]
    );

    const user = insert.rows[0];

    if (requiresManualApproval(normalizedRole)) {
      const providerSpecialty = resolveProviderSpecialty(normalizedRole, normalizedSpecialty || undefined);
      await db.query(
        `insert into provider_profiles (user_id, specialty, facility_name)
         values ($1, $2, $3)
         on conflict (user_id)
         do update set
           specialty = excluded.specialty,
           facility_name = excluded.facility_name`,
        [user.id, providerSpecialty, normalizedOrganizationName || null]
      );

      await db.query(
        `insert into account_access_requests (user_id, requested_role, requested_specialty, organization_name)
         values ($1, $2, $3, $4)`,
        [user.id, normalizedRole, providerSpecialty, normalizedOrganizationName || null]
      );

      return res.status(201).json({
        requiresApproval: true,
        message: 'Signup request submitted. An admin will contact you offline before enabling access.',
        user: {
          id: user.id,
          role: user.role,
          phone: user.phone,
          display_name: user.display_name,
          account_status: user.account_status
        }
      });
    }

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

    let result;
    try {
      result = await db.query(
        'select id, role, phone, password_hash, display_name, is_operating, account_status from users where phone = $1',
        [phone]
      );
    } catch (error) {
      if (isUndefinedColumnError(error, 'account_status')) {
        result = await db.query(
          'select id, role, phone, password_hash, display_name, is_operating from users where phone = $1',
          [phone]
        );
      } else if (isUndefinedColumnError(error, 'is_operating')) {
        result = await db.query(
          'select id, role, phone, password_hash, display_name from users where phone = $1',
          [phone]
        );
      } else {
        throw error;
      }
    }
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

    const loginBlockMessage = resolveLoginBlockMessage(user.account_status, user.is_operating);
    if (loginBlockMessage) {
      return res.status(403).json({ error: loginBlockMessage });
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

    let result;
    try {
      result = await db.query('select id, role, phone, is_operating, account_status from users where id = $1', [payload.userId]);
    } catch (error) {
      if (isUndefinedColumnError(error, 'account_status')) {
        result = await db.query('select id, role, phone, is_operating from users where id = $1', [payload.userId]);
      } else if (isUndefinedColumnError(error, 'is_operating')) {
        result = await db.query('select id, role, phone from users where id = $1', [payload.userId]);
      } else {
        throw error;
      }
    }
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = result.rows[0] as TokenSubject;

    const refreshBlockMessage = resolveLoginBlockMessage((user as any).account_status, (user as any).is_operating);
    if (refreshBlockMessage) {
      return res.status(403).json({ error: refreshBlockMessage });
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

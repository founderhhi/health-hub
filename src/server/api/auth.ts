import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { db } from '../db';

export const authRouter = Router();

const jwtSecret = process.env['JWT_SECRET'] || 'demo_secret';

authRouter.post('/signup', async (req, res) => {
  try {
    const { phone, password } = req.body as { phone?: string; password?: string };
    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password required' });
    }

    const existing = await db.query('select id from users where phone = $1', [phone]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'phone already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insert = await db.query(
      'insert into users (role, phone, password_hash, display_name) values ($1, $2, $3, $4) returning id, role, phone, display_name',
      ['patient', phone, passwordHash, 'Patient']
    );

    const user = insert.rows[0];
    const token = jwt.sign({ userId: user.id, role: user.role, phone: user.phone }, jwtSecret, {
      expiresIn: '7d'
    });

    return res.json({ token, user });
  } catch (error) {
    console.error('Signup error', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body as { phone?: string; password?: string };
    if (!phone || !password) {
      return res.status(400).json({ error: 'phone and password required' });
    }

    const result = await db.query(
      'select id, role, phone, password_hash, display_name from users where phone = $1',
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

    const token = jwt.sign({ userId: user.id, role: user.role, phone: user.phone }, jwtSecret, {
      expiresIn: '7d'
    });

    return res.json({
      token,
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

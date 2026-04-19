// src/server/api/consultations.ts
// [AGENT_SPECIALIST] Pre-consultation API layer
// Follows the same pattern as gp.ts / referrals.ts in this project.

import express, { Request, Response, Router } from 'express';
import { pool } from '../db';          // reuse existing pool — same pattern as gp.ts
import { authenticate } from './auth'; // reuse existing auth middleware

export const consultationsRouter: Router = express.Router();

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConsultationRow {
  consultation_id: string;
  patient_id: number;
  specialist_id: number | null;
  symptoms: string;        // stored as JSON string in DB
  duration: string;
  severity: number;
  notes: string;
  patient_status: string;
  doctor_status: string;
  created_at: string;
  updated_at: string;
}

// ─── POST /api/consultations ──────────────────────────────────────────────────
// Patient submits pre-consultation form.
// Creates a new consultation or updates an existing one if same patient has
// an open session (reconnect scenario).

consultationsRouter.post('/', authenticate, async (req: Request, res: Response) => {
  const { symptoms, duration, severity, notes, consultation_id } = req.body;
  const patientId = (req as any).user?.id;

  if (!patientId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Basic validation
  if (!symptoms?.length || !duration) {
    return res.status(400).json({ error: 'symptoms and duration are required' });
  }

  if (typeof severity !== 'number' || severity < 1 || severity > 10) {
    return res.status(400).json({ error: 'severity must be a number between 1 and 10' });
  }

  try {
    if (consultation_id) {
      // UPDATE — patient reconnecting to same session
      const result = await pool.query(
        `UPDATE consultations
         SET symptoms = $1, duration = $2, severity = $3, notes = $4,
             patient_status = 'waiting', updated_at = NOW()
         WHERE consultation_id = $5 AND patient_id = $6
         RETURNING *`,
        [JSON.stringify(symptoms), duration, severity, notes ?? '', consultation_id, patientId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Consultation not found or access denied' });
      }

      return res.json(formatRow(result.rows[0]));
    }

    // INSERT — new session
    const newId = `cons_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const result = await pool.query(
      `INSERT INTO consultations
         (consultation_id, patient_id, symptoms, duration, severity, notes,
          patient_status, doctor_status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'waiting', 'pending', NOW(), NOW())
       RETURNING *`,
      [newId, patientId, JSON.stringify(symptoms), duration, severity, notes ?? '']
    );

    return res.status(201).json(formatRow(result.rows[0]));
  } catch (err) {
    console.error('[consultations] POST error:', err);
    return res.status(500).json({ error: 'Failed to save consultation' });
  }
});

// ─── GET /api/consultations/:id ───────────────────────────────────────────────
// Returns session data. Both patient and doctor can poll this to sync state.

consultationsRouter.get('/:id', authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user?.id;
  const userRole = (req as any).user?.role;

  try {
    const result = await pool.query(
      'SELECT * FROM consultations WHERE consultation_id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    const row: ConsultationRow = result.rows[0];

    // Patients can only see their own consultations
    if (userRole === 'patient' && row.patient_id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json(formatRow(row));
  } catch (err) {
    console.error('[consultations] GET error:', err);
    return res.status(500).json({ error: 'Failed to fetch consultation' });
  }
});

// ─── PATCH /api/consultations/:id/doctor-status ───────────────────────────────
// Doctor updates their status (reviewing → joined).
// Only specialist/doctor roles can call this.

consultationsRouter.patch('/:id/doctor-status', authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { doctor_status, specialist_id } = req.body;
  const userRole = (req as any).user?.role;

  if (!['specialist', 'doctor'].includes(userRole)) {
    return res.status(403).json({ error: 'Forbidden: doctor/specialist role required' });
  }

  const allowedStatuses = ['reviewing', 'joined'];
  if (!allowedStatuses.includes(doctor_status)) {
    return res.status(400).json({ error: `doctor_status must be one of: ${allowedStatuses.join(', ')}` });
  }

  try {
    const updates: string[] = ['doctor_status = $1', 'updated_at = NOW()'];
    const values: unknown[] = [doctor_status];

    if (doctor_status === 'joined' && specialist_id) {
      updates.push(`specialist_id = $${values.length + 1}`);
      values.push(specialist_id);
      // Also flip patient to ready so their waiting screen updates
      updates.push(`patient_status = 'ready'`);
    }

    values.push(id); // last param for WHERE

    const result = await pool.query(
      `UPDATE consultations SET ${updates.join(', ')}
       WHERE consultation_id = $${values.length}
       RETURNING *`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.json(formatRow(result.rows[0]));
  } catch (err) {
    console.error('[consultations] PATCH error:', err);
    return res.status(500).json({ error: 'Failed to update consultation' });
  }
});

// ─── GET /api/consultations/pending/list ─────────────────────────────────────
// Doctor/specialist dashboard: lists all consultations with patient_status=waiting.

consultationsRouter.get('/pending/list', authenticate, async (req: Request, res: Response) => {
  const userRole = (req as any).user?.role;

  if (!['specialist', 'doctor', 'admin'].includes(userRole)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM consultations
       WHERE patient_status = 'waiting' AND doctor_status = 'pending'
       ORDER BY created_at ASC`
    );
    return res.json(result.rows.map(formatRow));
  } catch (err) {
    console.error('[consultations] pending list error:', err);
    return res.status(500).json({ error: 'Failed to fetch pending list' });
  }
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatRow(row: ConsultationRow) {
  return {
    ...row,
    symptoms: typeof row.symptoms === 'string'
      ? JSON.parse(row.symptoms)
      : row.symptoms,
  };
}


// ─────────────────────────────────────────────────────────────────────────────
// DB MIGRATION — add this as:
//   db/migrations/20250419_add_consultations_table.sql
// ─────────────────────────────────────────────────────────────────────────────
/*
CREATE TABLE IF NOT EXISTS consultations (
  consultation_id  TEXT PRIMARY KEY,
  patient_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialist_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
  symptoms         TEXT NOT NULL DEFAULT '[]',
  duration         TEXT NOT NULL,
  severity         INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 10),
  notes            TEXT NOT NULL DEFAULT '',
  patient_status   TEXT NOT NULL DEFAULT 'waiting'
                     CHECK (patient_status IN ('form','waiting','ready','in_call')),
  doctor_status    TEXT NOT NULL DEFAULT 'pending'
                     CHECK (doctor_status IN ('pending','reviewing','joined')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_consultations_patient_id ON consultations(patient_id);
CREATE INDEX idx_consultations_status     ON consultations(patient_status, doctor_status);
*/

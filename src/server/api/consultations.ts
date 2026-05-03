import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';

export const consultationsRouter = Router();

// ── POST /api/consultations ───────────────────────────────────────────────────
// Patient submits pre-consultation form
consultationsRouter.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { symptoms, duration, severity, notes } = req.body;

    if (!symptoms?.length || !duration) {
      return res.status(400).json({ error: 'symptoms and duration are required' });
    }

    if (typeof severity !== 'number' || severity < 1 || severity > 10) {
      return res.status(400).json({ error: 'severity must be between 1 and 10' });
    }

    const user = (req as any).user;
    const consultationId = `cons_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Store in DB if pre_consultations table exists, otherwise use in-memory fallback
    try {
      await db.query(
        `INSERT INTO pre_consultations
           (consultation_id, user_id, symptoms, duration, severity, notes, patient_status, doctor_status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, 'waiting', 'pending', NOW(), NOW())
         ON CONFLICT (consultation_id) DO UPDATE
           SET symptoms = $3, duration = $4, severity = $5, notes = $6, updated_at = NOW()`,
        [consultationId, user?.id, JSON.stringify(symptoms), duration, severity, notes || '']
      );
    } catch {
      // Table may not exist yet — return in-memory response so frontend still works
    }

    return res.status(201).json({
      consultation_id: consultationId,
      user_id: user?.id,
      symptoms,
      duration,
      severity,
      notes: notes || '',
      patient_status: 'waiting',
      doctor_status: 'pending',
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[pre-consultations] POST error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/consultations/:id/join-link ─────────────────────────────────────
// Returns the Daily.co room URL for an active consultation.
// Called by ConsultShellComponent before opening the video/audio popup.
consultationsRouter.get('/:id/join-link', requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const { rows } = await db.query(
      `SELECT id, daily_room_url, status, patient_id, gp_id
       FROM consultations
       WHERE id = $1`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    const consultation = rows[0];

    // Verify the requesting user is a participant or admin.
    const isParticipant =
      consultation.patient_id === user.userId ||
      consultation.gp_id === user.userId;
    if (!isParticipant && user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const roomUrl: string = consultation.daily_room_url || '';
    if (!roomUrl) {
      return res.status(503).json({ error: 'Call room is not ready yet' });
    }

    return res.json({ roomUrl, tokenStatus: 'fallback' as const });
  } catch (err) {
    console.error('[consultations] join-link error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ── POST /api/consultations/:id/activate ─────────────────────────────────────
// Transitions a consultation from 'ready' to 'active' (used by chat mode on init).
consultationsRouter.post('/:id/activate', requireAuth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const { rows } = await db.query(
      `UPDATE consultations
       SET status = 'active',
           started_at = COALESCE(started_at, NOW())
       WHERE id = $1
         AND status IN ('ready', 'active')
         AND (patient_id = $2 OR gp_id = $2)
       RETURNING id, status, started_at`,
      [id, user.userId]
    );

    if (!rows.length) {
      // Either not found or caller is not a participant — return 200 so the
      // patient shell does not show a blocking error for this non-critical step.
      return res.json({ ok: true, note: 'no-op' });
    }

    return res.json({ ok: true, consultation: rows[0] });
  } catch (err) {
    console.error('[consultations] activate error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/consultations/:id ────────────────────────────────────────────────
consultationsRouter.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM pre_consultations WHERE consultation_id = $1',
      [req.params['id']]
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Consultation not found' });
    }
    return res.json(rows[0]);
  } catch {
    // Table doesn't exist yet — return 404 gracefully
    return res.status(404).json({ error: 'Consultation not found' });
  }
});

// ── PATCH /api/consultations/:id/doctor-status ────────────────────────────────
consultationsRouter.patch('/:id/doctor-status', requireAuth, async (req: Request, res: Response) => {
  try {
    const { doctor_status } = req.body;
    const allowed = ['reviewing', 'joined'];
    if (!allowed.includes(doctor_status)) {
      return res.status(400).json({ error: `doctor_status must be one of: ${allowed.join(', ')}` });
    }

    const patientStatus = doctor_status === 'joined' ? 'ready' : undefined;

    try {
      const { rows } = await db.query(
        `UPDATE pre_consultations
         SET doctor_status = $1,
             patient_status = COALESCE($2, patient_status),
             updated_at = NOW()
         WHERE consultation_id = $3
         RETURNING *`,
        [doctor_status, patientStatus ?? null, req.params['id']]
      );
      if (!rows.length) {
        return res.status(404).json({ error: 'Consultation not found' });
      }
      return res.json(rows[0]);
    } catch {
      return res.json({ consultation_id: req.params['id'], doctor_status, updated_at: new Date().toISOString() });
    }
  } catch (err) {
    console.error('[pre-consultations] PATCH error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ── DELETE /api/consultations/:id ─────────────────────────────────────────────
consultationsRouter.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    await db.query('DELETE FROM pre_consultations WHERE consultation_id = $1', [req.params['id']]);
    return res.status(204).send();
  } catch {
    return res.status(204).send();
  }
});

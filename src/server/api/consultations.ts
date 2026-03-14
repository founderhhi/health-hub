import { Router } from 'express';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';
import { createMeetingToken, deleteRoom } from '../integrations/daily';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

type JoinRole = 'gp' | 'patient' | 'specialist';

function getDailyRoomName(roomUrl: string | null | undefined): string | null {
  if (!roomUrl) {
    return null;
  }

  try {
    const parsed = new URL(roomUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    return segments.length > 0 ? segments[0] : null;
  } catch {
    return null;
  }
}

function withMeetingToken(roomUrl: string | null | undefined, token: string | null): string | null {
  if (!roomUrl) {
    return null;
  }
  if (!token) {
    return roomUrl;
  }

  try {
    const parsed = new URL(roomUrl);
    parsed.searchParams.set('t', token);
    return parsed.toString();
  } catch {
    const separator = roomUrl.includes('?') ? '&' : '?';
    return `${roomUrl}${separator}t=${encodeURIComponent(token)}`;
  }
}

function isSchemaError(error: unknown): boolean {
  const dbError = error as { code?: string };
  return dbError.code === '42P01' || dbError.code === '42703';
}

async function cleanupDailyRoom(roomUrl: string | null | undefined): Promise<void> {
  if (!roomUrl) {
    return;
  }

  try {
    await deleteRoom(roomUrl);
  } catch (error) {
    console.error('Daily room cleanup error:', error);
  }
}

function resolveRole(value: unknown): JoinRole | null {
  if (value === 'gp' || value === 'patient' || value === 'specialist') {
    return value;
  }
  return null;
}

export const consultationsRouter = Router();

consultationsRouter.get('/:id/join-link', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user as { userId: string; role: string };
    const requestedRoleRaw = req.query['role'];

    if (requestedRoleRaw && requestedRoleRaw !== 'gp' && requestedRoleRaw !== 'patient' && requestedRoleRaw !== 'specialist') {
      return res.status(400).json({ error: 'role must be gp, patient, or specialist', code: 'INVALID_ROLE' });
    }

    const requestedRole = resolveRole(requestedRoleRaw);
    const result = await db.query(
      `select id, patient_id, gp_id, specialist_id, status, daily_room_url
       from consultations
       where id = $1
       limit 1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Consultation not found', code: 'NOT_FOUND' });
    }

    let consultation = result.rows[0] as {
      id: string;
      patient_id: string | null;
      gp_id: string | null;
      specialist_id: string | null;
      status: string;
      daily_room_url: string | null;
    };

    if (requestedRole === 'gp') {
      const isGpUser = user.role === 'gp' || user.role === 'doctor';
      if (!isGpUser || consultation.gp_id !== user.userId) {
        return res.status(403).json({ error: 'Consultation is not assigned to this GP', code: 'NOT_ASSIGNED' });
      }
    } else if (requestedRole === 'specialist') {
      if (user.role !== 'specialist' || consultation.specialist_id !== user.userId) {
        return res.status(403).json({ error: 'Consultation is not assigned to this specialist', code: 'NOT_ASSIGNED' });
      }
    } else if (requestedRole === 'patient') {
      if (user.role !== 'patient' || consultation.patient_id !== user.userId) {
        return res.status(403).json({ error: 'Consultation is not assigned to this patient', code: 'NOT_ASSIGNED' });
      }
    } else {
      const isParticipant = [consultation.patient_id, consultation.gp_id, consultation.specialist_id]
        .filter(Boolean)
        .includes(user.userId);
      if (!isParticipant) {
        return res.status(403).json({ error: 'Not a consultation participant', code: 'NOT_PARTICIPANT' });
      }
    }

    if (consultation.status === 'ready') {
      const activatedResult = await db.query(
        `update consultations
         set status = 'active',
             started_at = coalesce(started_at, now())
         where id = $1 and status = 'ready'
         returning id, patient_id, gp_id, specialist_id, status, daily_room_url`,
        [id]
      );
      if (activatedResult.rows[0]) {
        consultation = activatedResult.rows[0] as typeof consultation;
      } else {
        const refreshed = await db.query(
          `select id, patient_id, gp_id, specialist_id, status, daily_room_url
           from consultations
           where id = $1
           limit 1`,
          [id]
        );
        consultation = (refreshed.rows[0] as typeof consultation) || consultation;
      }

      const participantIds = Array.from(
        new Set([consultation.patient_id, consultation.gp_id, consultation.specialist_id].filter(Boolean))
      ) as string[];
      for (const participantId of participantIds) {
        broadcastToUser(participantId, 'consult.started', { consultation });
      }
      if (consultation.gp_id) {
        broadcastToRole('gp', 'queue.updated', { activeId: consultation.id });
        broadcastToRole('doctor', 'queue.updated', { activeId: consultation.id });
      }
    }

    if (consultation.status !== 'active') {
      return res.status(409).json({ error: 'Consultation is not active', code: 'NOT_ACTIVE' });
    }

    if (!consultation.daily_room_url) {
      return res.status(409).json({ error: 'Consultation room is unavailable', code: 'ROOM_UNAVAILABLE' });
    }

    const roomName = getDailyRoomName(consultation.daily_room_url);
    const token = roomName ? await createMeetingToken(roomName, user.userId) : null;
    const joinUrl = withMeetingToken(consultation.daily_room_url, token);

    return res.json({
      consultationId: consultation.id,
      roomUrl: joinUrl || consultation.daily_room_url,
      tokenStatus: token ? 'generated' : 'fallback',
      expiresAt: token ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : null
    });
  } catch (error) {
    console.error('Consultation join-link error', error);
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Consultation schema is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to generate consultation link', code: 'UNKNOWN' });
  }
});

consultationsRouter.post('/:id/activate', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user as { userId: string; role: string };
    const result = await db.query(
      `select id, patient_id, gp_id, specialist_id, status
       from consultations
       where id = $1
       limit 1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Consultation not found', code: 'NOT_FOUND' });
    }

    let consultation = result.rows[0] as {
      id: string;
      patient_id: string | null;
      gp_id: string | null;
      specialist_id: string | null;
      status: string;
    };

    const isParticipant = [consultation.patient_id, consultation.gp_id, consultation.specialist_id]
      .filter(Boolean)
      .includes(user.userId);
    if (!isParticipant) {
      return res.status(403).json({ error: 'Not a consultation participant', code: 'NOT_PARTICIPANT' });
    }

    if (consultation.status === 'ready') {
      const activatedResult = await db.query(
        `update consultations
         set status = 'active',
             started_at = coalesce(started_at, now())
         where id = $1 and status = 'ready'
         returning id, patient_id, gp_id, specialist_id, status`,
        [id]
      );
      if (activatedResult.rows[0]) {
        consultation = activatedResult.rows[0] as typeof consultation;
      } else {
        const refreshed = await db.query(
          `select id, patient_id, gp_id, specialist_id, status
           from consultations
           where id = $1
           limit 1`,
          [id]
        );
        consultation = (refreshed.rows[0] as typeof consultation) || consultation;
      }

      const participantIds = Array.from(
        new Set([consultation.patient_id, consultation.gp_id, consultation.specialist_id].filter(Boolean))
      ) as string[];
      for (const participantId of participantIds) {
        broadcastToUser(participantId, 'consult.started', { consultation });
      }
      if (consultation.gp_id) {
        broadcastToRole('gp', 'queue.updated', { activeId: consultation.id });
        broadcastToRole('doctor', 'queue.updated', { activeId: consultation.id });
      }
    }

    if (consultation.status !== 'active') {
      return res.status(409).json({ error: 'Consultation is not active', code: 'NOT_ACTIVE' });
    }

    return res.json({ consultation });
  } catch (error) {
    console.error('Consultation activate error', error);
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Consultation schema is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to activate consultation', code: 'UNKNOWN' });
  }
});

consultationsRouter.post('/:id/complete', requireAuth, requireRole(['gp', 'doctor', 'specialist']), async (req, res) => {
  const client = await db.connect();
  let transactionStarted = false;

  try {
    const { id } = req.params;
    const user = (req as any).user as { userId: string; role: string };
    const { notes } = req.body as { notes?: string };
    const normalizedNotes = typeof notes === 'string' ? notes.trim() : '';

    await client.query('begin');
    transactionStarted = true;

    const current = await client.query(
      `select id, request_id, patient_id, gp_id, specialist_id, status, daily_room_url, notes
       from consultations
       where id = $1
       for update`,
      [id]
    );

    if (current.rows.length === 0) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(404).json({ error: 'Consultation not found', code: 'NOT_FOUND' });
    }

    const consultation = current.rows[0] as {
      id: string;
      request_id: string | null;
      patient_id: string;
      gp_id: string | null;
      specialist_id: string | null;
      status: string;
      daily_room_url: string | null;
      notes: Record<string, unknown> | null;
    };

    const isAssignedGp = (user.role === 'gp' || user.role === 'doctor') && consultation.gp_id === user.userId;
    const isAssignedSpecialist = user.role === 'specialist' && consultation.specialist_id === user.userId;

    if (!isAssignedGp && !isAssignedSpecialist) {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(403).json({ error: 'Consultation is not assigned to you', code: 'NOT_ASSIGNED' });
    }

    if (consultation.status !== 'active') {
      await client.query('rollback');
      transactionStarted = false;
      return res.status(409).json({ error: 'Consultation is not active', code: 'NOT_ACTIVE' });
    }

    const nextNotes = normalizedNotes
      ? {
          ...(consultation.notes || {}),
          final_notes: normalizedNotes,
          completed_by: user.userId
        }
      : null;

    const result = await client.query(
      `update consultations
       set status = 'completed',
           completed_at = now(),
           notes = COALESCE($2::jsonb, notes)
       where id = $1
       returning *`,
      [id, nextNotes ? JSON.stringify(nextNotes) : null]
    );

    const completedConsultation = result.rows[0];

    if (consultation.request_id) {
      await client.query(
        `update consult_requests
         set status = 'completed'
         where id = $1`,
        [consultation.request_id]
      );
    }

    await client.query(
      `insert into notifications (user_id, type, message, data)
       values ($1, $2, $3, $4)`,
      [
        consultation.patient_id,
        'consult.completed',
        'Your consultation has been completed.',
        JSON.stringify({ consultationId: consultation.id })
      ]
    );

    await client.query('commit');
    transactionStarted = false;

    await cleanupDailyRoom(consultation.daily_room_url);

    const participantIds = Array.from(
      new Set([consultation.patient_id, consultation.gp_id, consultation.specialist_id].filter(Boolean))
    ) as string[];
    for (const participantId of participantIds) {
      broadcastToUser(participantId, 'consult.completed', { consultation: completedConsultation });
    }

    if (consultation.gp_id) {
      broadcastToRole('gp', 'queue.updated', { completedId: consultation.id });
      broadcastToRole('doctor', 'queue.updated', { completedId: consultation.id });
    }

    return res.json({ consultation: completedConsultation });
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query('rollback');
      } catch (rollbackError) {
        console.error('Consultation completion rollback failed', rollbackError);
      }
    }
    console.error('Complete consultation error', error);
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Consultation schema is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to complete consultation', code: 'UNKNOWN' });
  } finally {
    client.release();
  }
});

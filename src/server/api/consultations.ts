import { Router } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';
import { createMeetingToken } from '../integrations/daily';

type JoinRole = 'gp' | 'patient';

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

function resolveRole(value: unknown): JoinRole | null {
  if (value === 'gp' || value === 'patient') {
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

    if (requestedRoleRaw && requestedRoleRaw !== 'gp' && requestedRoleRaw !== 'patient') {
      return res.status(400).json({ error: 'role must be gp or patient', code: 'INVALID_ROLE' });
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

    const consultation = result.rows[0] as {
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

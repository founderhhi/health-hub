import { Router } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';
import { broadcastToRole, broadcastToUser } from '../realtime/ws';

const CHAT_PARTICIPANT_ROLES = ['patient', 'gp', 'doctor', 'specialist'];

export const chatRouter = Router();

function isSchemaError(error: unknown): boolean {
  const dbError = error as { code?: string };
  return dbError.code === '42P01' || dbError.code === '42703';
}

chatRouter.post('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;
    const { message, clientRequestId, imageData, imageMime } = req.body as {
      message?: string;
      clientRequestId?: string;
      imageData?: string;
      imageMime?: string;
    };

    if (!CHAT_PARTICIPANT_ROLES.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' });
    }

    const hasMessage = message && message.trim();
    const hasImage = imageData && imageMime;

    if (!hasMessage && !hasImage) {
      return res.status(400).json({ error: 'message or image is required', code: 'INVALID_MESSAGE' });
    }

    if (imageData && (!imageMime || !imageMime.startsWith('image/'))) {
      return res.status(400).json({ error: 'imageMime must be a valid image MIME type', code: 'INVALID_IMAGE' });
    }

    if (imageData && imageData.length > 5_000_000) {
      return res.status(400).json({ error: 'Image too large (max ~3.7MB)', code: 'IMAGE_TOO_LARGE' });
    }

    const consultationResult = await db.query(
      `select id, patient_id, gp_id, specialist_id, status
       from consultations
       where id = $1
         and (patient_id = $2 or gp_id = $2 or specialist_id = $2)`,
      [consultationId, user.userId]
    );

    if (consultationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a consultation participant', code: 'NOT_PARTICIPANT' });
    }

    let consultation = consultationResult.rows[0] as {
      id: string;
      patient_id: string | null;
      gp_id: string | null;
      specialist_id: string | null;
      status: string;
    };

    if (consultation.status === 'ready') {
      const activatedResult = await db.query(
        `update consultations
         set status = 'active',
             started_at = coalesce(started_at, now())
         where id = $1 and status = 'ready'
         returning id, patient_id, gp_id, specialist_id, status`,
        [consultationId]
      );
      if (activatedResult.rows[0]) {
        consultation = activatedResult.rows[0] as typeof consultation;
      } else {
        const refreshed = await db.query(
          `select id, patient_id, gp_id, specialist_id, status
           from consultations
           where id = $1
           limit 1`,
          [consultationId]
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
      return res.status(409).json({ error: 'Consultation chat is closed', code: 'NOT_ACTIVE' });
    }

    const insertResult = await db.query(
      `insert into chat_messages (consultation_id, user_id, message, image_data, image_mime)
       values ($1, $2, $3, $4, $5)
       returning *`,
      [consultationId, user.userId, hasMessage ? message!.trim() : null, imageData || null, imageMime || null]
    );

    const messageResult = await db.query(
      `select cm.*, u.display_name as sender_name, u.role as sender_role
       from chat_messages cm
       join users u on u.id = cm.user_id
       where cm.id = $1`,
      [insertResult.rows[0].id]
    );

    const chatMessage = {
      ...messageResult.rows[0],
      client_request_id: typeof clientRequestId === 'string' ? clientRequestId.trim() || null : null
    };
    const participants = Array.from(
      new Set([
        consultation.patient_id,
        consultation.gp_id,
        consultation.specialist_id
      ].filter(Boolean))
    ) as string[];

    for (const participantId of participants) {
      broadcastToUser(participantId, 'chat.message', {
        consultationId,
        message: chatMessage
      });
    }

    return res.json({ message: chatMessage });
  } catch (error) {
    console.error('Send chat message error', error);
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Chat storage is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to send message', code: 'UNKNOWN' });
  }
});

chatRouter.get('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;

    if (!CHAT_PARTICIPANT_ROLES.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' });
    }

    const consultationResult = await db.query(
      `select id
       from consultations
       where id = $1
         and (patient_id = $2 or gp_id = $2 or specialist_id = $2)`,
      [consultationId, user.userId]
    );

    if (consultationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a consultation participant', code: 'NOT_PARTICIPANT' });
    }

    const result = await db.query(
      `select cm.*, u.display_name as sender_name, u.role as sender_role
       from chat_messages cm
       join users u on u.id = cm.user_id
       where cm.consultation_id = $1
       order by cm.created_at asc`,
      [consultationId]
    );

    return res.json({ messages: result.rows });
  } catch (error) {
    console.error('Get chat messages error', error);
    if (isSchemaError(error)) {
      return res.status(503).json({ error: 'Chat storage is not ready', code: 'SCHEMA_ERROR' });
    }
    return res.status(500).json({ error: 'Unable to fetch messages', code: 'UNKNOWN' });
  }
});

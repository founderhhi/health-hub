import { Router } from 'express';
import { db } from '../db';
import { requireAuth } from '../middleware/auth';
import { broadcastToUser } from '../realtime/ws';

const CHAT_PARTICIPANT_ROLES = ['patient', 'gp', 'doctor', 'specialist'];

export const chatRouter = Router();

chatRouter.post('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;
    const { message } = req.body as { message?: string };

    if (!CHAT_PARTICIPANT_ROLES.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'message is required' });
    }

    const consultationResult = await db.query(
      `select id, patient_id, gp_id, specialist_id, status
       from consultations
       where id = $1
         and (patient_id = $2 or gp_id = $2 or specialist_id = $2)`,
      [consultationId, user.userId]
    );

    if (consultationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a consultation participant' });
    }

    const consultation = consultationResult.rows[0];
    if (consultation.status !== 'active') {
      return res.status(409).json({ error: 'Consultation chat is closed' });
    }

    const insertResult = await db.query(
      `insert into chat_messages (consultation_id, user_id, message)
       values ($1, $2, $3)
       returning *`,
      [consultationId, user.userId, message.trim()]
    );

    const messageResult = await db.query(
      `select cm.*, u.display_name as sender_name, u.role as sender_role
       from chat_messages cm
       join users u on u.id = cm.user_id
       where cm.id = $1`,
      [insertResult.rows[0].id]
    );

    const chatMessage = messageResult.rows[0];
    const participants = [
      consultation.patient_id,
      consultation.gp_id,
      consultation.specialist_id
    ].filter((participantId) => participantId && participantId !== user.userId);

    for (const participantId of participants) {
      broadcastToUser(participantId, 'chat.message', {
        consultationId,
        message: chatMessage
      });
    }

    return res.json({ message: chatMessage });
  } catch (error) {
    console.error('Send chat message error', error);
    return res.status(500).json({ error: 'Unable to send message' });
  }
});

chatRouter.get('/:consultationId', requireAuth, async (req, res) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;

    if (!CHAT_PARTICIPANT_ROLES.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const consultationResult = await db.query(
      `select id
       from consultations
       where id = $1
         and (patient_id = $2 or gp_id = $2 or specialist_id = $2)`,
      [consultationId, user.userId]
    );

    if (consultationResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not a consultation participant' });
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
    return res.status(500).json({ error: 'Unable to fetch messages' });
  }
});

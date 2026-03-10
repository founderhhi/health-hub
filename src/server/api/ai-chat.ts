/**
 * README: HealthHub AI Diagnostic Chatbot
 *
 * Model choice:
 * - Default model is `meditron:7b` via `OLLAMA_MODEL`.
 * - Justification: when validating medical-focused models across Ollama setups,
 *   `meditron:7b` is the safest default fallback from the requested priority list
 *   and is purpose-built for clinical/guideline-style reasoning.
 * - Override with `OLLAMA_MODEL` after validating a preferred Ollama medical model
 *   such as `medalpaca`, `llama3-med42`, `biomistral`, or `openbiollm`.
 */
import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

const OLLAMA_BASE_URL = process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';
const OLLAMA_MODEL = process.env['OLLAMA_MODEL'] || 'meditron:7b';
const SESSION_MESSAGE_LIMIT = 15;
const CONTEXT_WINDOW_MESSAGES = 12;
const DISCLAIMER_TEXT =
  '⚠️ This is not medical advice. Always consult a qualified GP or specialist for diagnosis and treatment.';

const SYSTEM_PROMPT = [
  'You are HealthHub AI, a symptom-triage assistant. You are NOT a doctor. Your role is to help patients understand possible causes of their symptoms and suggest whether they should see a GP or specialist.',
  `ALWAYS include this disclaimer in your first message: "${DISCLAIMER_TEXT}"`,
  'Ask focused, clinically relevant questions. Limit yourself to 5-7 questions maximum.',
  'After gathering symptoms, provide a brief triage summary with:',
  '- Possible conditions (2-3 most likely)',
  '- Recommended next step (GP / specialist / emergency)',
  'Do not ask follow-up questions after giving the triage summary.',
  'Gather ALL critical symptoms in as few questions as possible.',
  'Never pad conversation unnecessarily.',
  'Self-correct if you detect you have been asking too many narrow questions.',
  'Aim to deliver a triage summary by message 10-12 of the full session.',
  'Return ONLY valid JSON with this exact schema:',
  '{ "showGpCta": boolean, "message": "string" }',
  'Set showGpCta=true when you deliver the triage summary.',
].join('\n');

type ChatRole = 'user' | 'assistant';

interface SessionMessage {
  role: ChatRole;
  content: string;
}

interface SessionState {
  messages: SessionMessage[];
  triageDelivered: boolean;
}

interface OllamaResponse {
  message?: {
    content?: string;
  };
}

interface AiModelPayload {
  showGpCta?: boolean;
  message?: string;
}

const sessions = new Map<string, SessionState>();

export const aiChatRouter = Router();

function getOrCreateSession(sessionId: string): SessionState {
  const existing = sessions.get(sessionId);
  if (existing) {
    return existing;
  }

  const nextSession: SessionState = {
    messages: [],
    triageDelivered: false,
  };
  sessions.set(sessionId, nextSession);
  return nextSession;
}

function extractJsonCandidate(raw: string): string {
  const trimmed = raw.trim();
  const withoutFence = trimmed
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const match = withoutFence.match(/\{[\s\S]*\}/);
  return match?.[0] || withoutFence;
}

function detectTriageSummary(text: string): boolean {
  const normalized = text.toLowerCase();
  const hasConditions = normalized.includes('possible condition') || normalized.includes('possible conditions');
  const hasNextStep = normalized.includes('recommended next step');
  return hasConditions && hasNextStep;
}

function parseModelReply(raw: string): { reply: string; showGpCta: boolean } {
  const jsonCandidate = extractJsonCandidate(raw);

  try {
    const parsed = JSON.parse(jsonCandidate) as AiModelPayload;
    if (typeof parsed.message === 'string' && parsed.message.trim()) {
      return {
        reply: parsed.message.trim(),
        showGpCta: parsed.showGpCta === true,
      };
    }
  } catch {
    // Fallback to plain text handling.
  }

  const reply = raw.trim();
  return {
    reply,
    showGpCta: detectTriageSummary(reply),
  };
}

function ensureDisclaimerOnFirstAssistantMessage(reply: string, session: SessionState): string {
  const hasAssistantMessage = session.messages.some((message) => message.role === 'assistant');
  if (hasAssistantMessage || reply.includes(DISCLAIMER_TEXT)) {
    return reply;
  }

  return `${DISCLAIMER_TEXT}\n\n${reply}`;
}

async function requestOllama(session: SessionState): Promise<{ reply: string; showGpCta: boolean }> {
  const messages = session.messages.slice(-CONTEXT_WINDOW_MESSAGES).map((entry) => ({
    role: entry.role,
    content: entry.content,
  }));

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      format: 'json',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`Ollama request failed (${response.status}) ${details}`.trim());
  }

  const payload = (await response.json()) as OllamaResponse;
  const raw = payload.message?.content;

  if (!raw || !raw.trim()) {
    throw new Error('Ollama response missing message content');
  }

  return parseModelReply(raw);
}

aiChatRouter.post('/message', requireAuth, async (req, res) => {
  try {
    const user = (req as { user?: { role?: string } }).user;
    if (user?.role !== 'patient') {
      return res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' });
    }

    const { sessionId, message } = req.body as { sessionId?: unknown; message?: unknown };
    const normalizedSessionId = typeof sessionId === 'string' ? sessionId.trim() : '';
    const normalizedMessage = typeof message === 'string' ? message.trim() : '';

    if (!normalizedSessionId) {
      return res.status(400).json({ error: 'sessionId is required', code: 'INVALID_SESSION_ID' });
    }

    if (!normalizedMessage) {
      return res.status(400).json({ error: 'message is required', code: 'INVALID_MESSAGE' });
    }

    const session = getOrCreateSession(normalizedSessionId);

    if (session.messages.length >= SESSION_MESSAGE_LIMIT) {
      return res.json({
        reply: 'Session message limit reached. Please book a GP consultation for further evaluation.',
        messageCount: session.messages.length,
        limitReached: true,
        showGpCta: true,
      });
    }

    session.messages.push({ role: 'user', content: normalizedMessage });

    if (session.messages.length >= SESSION_MESSAGE_LIMIT) {
      return res.json({
        reply: 'Session message limit reached. Please book a GP consultation for further evaluation.',
        messageCount: session.messages.length,
        limitReached: true,
        showGpCta: true,
      });
    }

    const aiResponse = await requestOllama(session);
    let reply = aiResponse.reply.trim();

    if (!reply) {
      reply = 'I could not complete triage right now. Please book a GP consultation.';
    }

    reply = ensureDisclaimerOnFirstAssistantMessage(reply, session);

    const detectedSummary = detectTriageSummary(reply);
    const showGpCta = session.triageDelivered || aiResponse.showGpCta || detectedSummary;
    session.triageDelivered = showGpCta;

    session.messages.push({ role: 'assistant', content: reply });

    const messageCount = session.messages.length;
    const limitReached = messageCount >= SESSION_MESSAGE_LIMIT;

    return res.json({
      reply,
      messageCount,
      limitReached,
      showGpCta: showGpCta || limitReached,
    });
  } catch (error) {
    console.error('AI chat message error', error);
    return res.status(502).json({
      error: 'AI service unavailable',
      code: 'AI_CHAT_UNAVAILABLE',
    });
  }
});

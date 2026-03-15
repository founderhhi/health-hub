/**
 * README: HealthHub AI Diagnostic Chatbot
 *
 * Primary provider: Anthropic Messages API.
 * Override the model with CLAUDE_MODEL if needed.
 *
 * If Anthropic is unavailable at runtime, the route falls back to a
 * deterministic triage flow so patients still receive a safe response.
 */
import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { requireAuth } from '../middleware/auth';
import { buildFallbackTriageReply } from './ai-chat-fallback';

const CLAUDE_MODEL = process.env['CLAUDE_MODEL'] || 'claude-opus-4-6';
const SESSION_MESSAGE_LIMIT = 15;
const CONTEXT_WINDOW_MESSAGES = 12;
const DISCLAIMER_TEXT =
  '⚠️ This is not medical advice. Always consult a qualified GP or specialist for diagnosis and treatment.';

const SYSTEM_PROMPT_BASE = [
  'You are HealthHub AI, a symptom-triage assistant. You are NOT a doctor. Your role is to help patients understand possible causes of their symptoms and suggest whether they should see a GP or specialist.',
  `ALWAYS include this disclaimer in your first message: "${DISCLAIMER_TEXT}"`,
  'Ask focused, clinically relevant questions one at a time.',
  'Limit yourself to three follow-up questions after the patient\'s first symptom message.',
  'Do not ask multiple numbered questions in a single reply.',
  'After gathering the required symptom details, provide a brief triage summary with:',
  '- Possible conditions (2-3 most likely)',
  '- Recommended next step (GP / specialist / emergency)',
  'Do not ask follow-up questions after giving the triage summary.',
  'Keep replies concise and do not pad the conversation.',
  'Return ONLY valid JSON with this exact schema:',
  '{ "showGpCta": boolean, "showDiagnosticsCta": boolean, "message": "string" }',
  'Set showGpCta=true when you deliver the triage summary or when the patient clearly needs a doctor.',
  'Set showDiagnosticsCta=true when you recommend the patient get lab tests, blood work, imaging, scans, or any other diagnostic procedure.',
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

// Number of total session messages (user + assistant) after which the GP CTA
// is shown proactively, even if the model hasn't yet delivered a formal triage.
const GP_CTA_MESSAGE_THRESHOLD = 10;

interface AiModelPayload {
  showGpCta?: boolean;
  showDiagnosticsCta?: boolean;
  message?: string;
}

interface AiChatReply {
  reply: string;
  showGpCta: boolean;
  showDiagnosticsCta: boolean;
}

interface AiTriagePayload {
  complaint: string;
  triageAnswers: string[];
  triageSummary: string;
  recommendedNextStep: string;
}

const sessions = new Map<string, SessionState>();

// Initialise the Anthropic client once at module load.
const AI_KEY = process.env['ANTHROPIC_API_KEY'] || '';
if (!AI_KEY) {
  console.warn('[ai-chat] ANTHROPIC_API_KEY is not set — using deterministic triage fallback.');
}
const anthropic = new Anthropic({
  apiKey: AI_KEY || undefined,
});

export const aiChatRouter = Router();

function getOrCreateSession(sessionId: string): SessionState {
  const existing = sessions.get(sessionId);
  if (existing) {
    return existing;
  }

  const nextSession: SessionState = { messages: [], triageDelivered: false };
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
  const hasConditions =
    normalized.includes('possible condition') || normalized.includes('possible conditions');
  const hasNextStep = normalized.includes('recommended next step');
  return hasConditions && hasNextStep;
}

function getUserMessages(messages: SessionMessage[]): string[] {
  return messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content.trim())
    .filter(Boolean);
}

function buildStageInstruction(session: SessionState): string {
  const userMessageCount = getUserMessages(session.messages).length;

  if (userMessageCount <= 1) {
    return 'Conversation stage: ask exactly one focused follow-up question about timing, severity, or symptom progression. Do not provide a summary yet.';
  }

  if (userMessageCount === 2) {
    return 'Conversation stage: ask exactly one focused follow-up question about associated symptoms or red flags. Do not provide a summary yet.';
  }

  if (userMessageCount === 3) {
    return 'Conversation stage: ask exactly one final focused question that helps with triage. Do not provide a summary yet.';
  }

  return 'Conversation stage: do not ask any more questions. Provide the triage summary now with possible conditions and a recommended next step.';
}

function buildSystemPrompt(session: SessionState): string {
  return `${SYSTEM_PROMPT_BASE}\n${buildStageInstruction(session)}`;
}

function stripLeadingDisclaimer(text: string): string {
  return text.replace(DISCLAIMER_TEXT, '').trim();
}

function extractRecommendedNextStep(text: string): string {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const nextStepIndex = lines.findIndex((line) => line.toLowerCase().startsWith('recommended next step'));
  if (nextStepIndex === -1) {
    return '';
  }

  const candidate = lines[nextStepIndex + 1] || '';
  return candidate.replace(/^-+\s*/, '').trim();
}

function buildTriagePayload(
  session: SessionState,
  reply: string,
  includeSummary: boolean
): AiTriagePayload | null {
  const userMessages = getUserMessages(session.messages);
  if (userMessages.length === 0) {
    return null;
  }

  const cleanedReply = stripLeadingDisclaimer(reply);
  return {
    complaint: userMessages[0] || '',
    triageAnswers: userMessages.slice(1),
    triageSummary: includeSummary ? cleanedReply : '',
    recommendedNextStep: includeSummary
      ? extractRecommendedNextStep(cleanedReply) || 'Connect to GP for further assessment.'
      : '',
  };
}

function parseModelReply(raw: string): {
  reply: string;
  showGpCta: boolean;
  showDiagnosticsCta: boolean;
} {
  const jsonCandidate = extractJsonCandidate(raw);

  try {
    const parsed = JSON.parse(jsonCandidate) as AiModelPayload;
    if (typeof parsed.message === 'string' && parsed.message.trim()) {
      return {
        reply: parsed.message.trim(),
        showGpCta: parsed.showGpCta === true,
        showDiagnosticsCta: parsed.showDiagnosticsCta === true,
      };
    }
  } catch {
    // Fallback to plain-text handling.
  }

  const reply = raw.trim();
  return {
    reply,
    showGpCta: detectTriageSummary(reply),
    showDiagnosticsCta: false,
  };
}

function ensureDisclaimerOnFirstAssistantMessage(reply: string, session: SessionState): string {
  const hasAssistantMessage = session.messages.some((m) => m.role === 'assistant');
  if (hasAssistantMessage || reply.includes(DISCLAIMER_TEXT)) {
    return reply;
  }
  return `${DISCLAIMER_TEXT}\n\n${reply}`;
}

async function requestClaude(
  session: SessionState,
): Promise<AiChatReply> {
  const messages: Anthropic.MessageParam[] = session.messages
    .slice(-CONTEXT_WINDOW_MESSAGES)
    .map((entry) => ({ role: entry.role, content: entry.content }));

  // Use streaming + finalMessage() so adaptive thinking tokens do not hit
  // the Express request timeout on longer responses.
  const stream = anthropic.messages.stream({
    model: CLAUDE_MODEL,
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    system: buildSystemPrompt(session),
    messages,
  });

  const finalMessage = await stream.finalMessage();
  const textBlock = finalMessage.content.find((b) => b.type === 'text');

  if (!textBlock || textBlock.type !== 'text' || !textBlock.text.trim()) {
    throw new Error('Claude response missing text content');
  }

  return parseModelReply(textBlock.text);
}

async function getAiReply(session: SessionState): Promise<AiChatReply> {
  if (!AI_KEY) {
    return buildFallbackTriageReply(session.messages);
  }

  try {
    return await requestClaude(session);
  } catch (error) {
    const status = typeof (error as { status?: unknown })?.status === 'number'
      ? (error as { status: number }).status
      : undefined;
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn('[ai-chat] Anthropic unavailable, using deterministic fallback.', {
      status,
      message,
    });
    return buildFallbackTriageReply(session.messages);
  }
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
        showDiagnosticsCta: false,
      });
    }

    session.messages.push({ role: 'user', content: normalizedMessage });

    if (session.messages.length >= SESSION_MESSAGE_LIMIT) {
      return res.json({
        reply: 'Session message limit reached. Please book a GP consultation for further evaluation.',
        messageCount: session.messages.length,
        limitReached: true,
        showGpCta: true,
        showDiagnosticsCta: false,
      });
    }

    const aiResponse = await getAiReply(session);
    let reply = aiResponse.reply;

    if (!reply) {
      reply = 'I could not complete triage right now. Please book a GP consultation.';
    }

    reply = ensureDisclaimerOnFirstAssistantMessage(reply, session);

    session.messages.push({ role: 'assistant', content: reply });

    const messageCount = session.messages.length;
    const limitReached = messageCount >= SESSION_MESSAGE_LIMIT;

    // Show GP CTA when: triage delivered by model, model explicitly flags it,
    // session has 10+ messages (proactive nudge), or limit reached.
    const showGpCta =
      session.triageDelivered ||
      aiResponse.showGpCta ||
      messageCount >= GP_CTA_MESSAGE_THRESHOLD ||
      limitReached;
    session.triageDelivered = showGpCta;
    const triage = buildTriagePayload(session, reply, aiResponse.showGpCta || limitReached);

    return res.json({
      reply,
      messageCount,
      limitReached,
      showGpCta,
      showDiagnosticsCta: aiResponse.showDiagnosticsCta,
      triage,
    });
  } catch (error) {
    console.error('AI chat message error', error);

    if (error instanceof Anthropic.AuthenticationError) {
      console.error('ANTHROPIC_API_KEY is missing or invalid — set it in environment variables');
    }

    return res.status(502).json({
      error: 'AI service unavailable',
      code: 'AI_CHAT_UNAVAILABLE',
    });
  }
});

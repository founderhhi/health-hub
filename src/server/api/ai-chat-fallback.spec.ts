import { describe, expect, it } from 'vitest';
import { buildFallbackTriageReply } from './ai-chat-fallback';

describe('buildFallbackTriageReply', () => {
  it('escalates emergency symptoms immediately', () => {
    const result = buildFallbackTriageReply([
      { role: 'user', content: 'I have chest pain and shortness of breath right now.' },
    ]);

    expect(result.showGpCta).toBe(true);
    expect(result.showDiagnosticsCta).toBe(false);
    expect(result.reply).toContain('Seek urgent in-person or emergency care now');
  });

  it('asks focused follow-up questions on the first non-emergency message', () => {
    const result = buildFallbackTriageReply([
      { role: 'user', content: 'I have had a sore throat and cough since yesterday.' },
    ]);

    expect(result.showGpCta).toBe(false);
    expect(result.showDiagnosticsCta).toBe(false);
    expect(result.reply).toContain('Please reply with these details in one message:');
    expect(result.reply).toContain('1.');
    expect(result.reply).toContain('2.');
    expect(result.reply).toContain('3.');
  });

  it('produces a triage summary and diagnostics CTA after enough urinary context', () => {
    const result = buildFallbackTriageReply([
      { role: 'user', content: 'It burns when I pee and I keep needing to go.' },
      { role: 'assistant', content: 'Please tell me more.' },
      { role: 'user', content: 'It started two days ago and I also have a little flank pain.' },
    ]);

    expect(result.showGpCta).toBe(true);
    expect(result.showDiagnosticsCta).toBe(true);
    expect(result.reply).toContain('Possible conditions:');
    expect(result.reply).toContain('urinary tract infection');
    expect(result.reply).toContain('urine dipstick');
  });
});

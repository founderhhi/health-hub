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
    expect(result.reply).toContain('Let me ask a few questions one at a time.');
    expect(result.reply).toContain('When did this start');
  });

  it('produces a triage summary and diagnostics CTA after enough urinary context', () => {
    const result = buildFallbackTriageReply([
      { role: 'user', content: 'It burns when I pee and I keep needing to go.' },
      { role: 'user', content: 'It started two days ago and I also have a little flank pain.' },
      { role: 'user', content: 'I also have a mild fever and no chance of pregnancy.' },
      { role: 'user', content: 'There is no blood, but it is getting worse today.' },
    ]);

    expect(result.showGpCta).toBe(true);
    expect(result.showDiagnosticsCta).toBe(true);
    expect(result.reply).toContain('Possible conditions:');
    expect(result.reply).toContain('urine dipstick');
    expect(result.reply).toContain('Recommended next step:');
  });
});

import { describe, expect, it } from 'vitest';

import { formatTriageSourceLabel, normalizeTriageHandoff } from './triage-handoff';

describe('normalizeTriageHandoff', () => {
  it('keeps structured AI handoff fields aligned for GP review', () => {
    const result = normalizeTriageHandoff({
      source: 'ai-triage',
      complaint: 'Persistent headache',
      triageAnswers: ['Started yesterday', 'Light sensitivity present'],
      triageSummary: 'Possible conditions:\n- migraine\nRecommended next step:\n- Connect to GP today.',
      recommendedNextStep: 'Connect to GP today.',
    });

    expect(result.source).toBe('ai-triage');
    expect(result.complaint).toBe('Persistent headache');
    expect(result.symptomsText).toBe('Persistent headache');
    expect(result.triageAnswers).toEqual(['Started yesterday', 'Light sensitivity present']);
    expect(result.recommendedNextStep).toBe('Connect to GP today.');
  });

  it('preserves plain symptom strings for non-structured consult requests', () => {
    const result = normalizeTriageHandoff('General consult');

    expect(result.source).toBe('');
    expect(result.complaint).toBe('');
    expect(result.symptomsText).toBe('General consult');
    expect(result.triageAnswers).toEqual([]);
  });
});

describe('formatTriageSourceLabel', () => {
  it('formats the AI triage source label for GP-facing UI', () => {
    expect(formatTriageSourceLabel('ai-triage')).toBe('AI triage');
    expect(formatTriageSourceLabel('manual_referral')).toBe('Manual Referral');
  });
});

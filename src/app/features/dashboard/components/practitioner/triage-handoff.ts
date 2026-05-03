export interface NormalizedTriageHandoff {
  source: string;
  complaint: string;
  triageSummary: string;
  triageAnswers: string[];
  recommendedNextStep: string;
  symptomsText: string;
}

export function normalizeTriageHandoff(symptoms: unknown): NormalizedTriageHandoff {
  if (!symptoms) {
    return {
      source: '',
      complaint: '',
      triageSummary: '',
      triageAnswers: [],
      recommendedNextStep: '',
      symptomsText: '',
    };
  }

  if (typeof symptoms === 'string') {
    return {
      source: '',
      complaint: '',
      triageSummary: '',
      triageAnswers: [],
      recommendedNextStep: '',
      symptomsText: symptoms,
    };
  }

  const payload = symptoms as {
    source?: unknown;
    complaint?: unknown;
    description?: unknown;
    triageSummary?: unknown;
    triageAnswers?: unknown;
    recommendedNextStep?: unknown;
  };
  const source = typeof payload.source === 'string' ? payload.source.trim() : '';
  const complaint = typeof payload.complaint === 'string' ? payload.complaint.trim() : '';
  const description = typeof payload.description === 'string' ? payload.description.trim() : '';
  const triageSummary = typeof payload.triageSummary === 'string' ? payload.triageSummary.trim() : '';
  const triageAnswers = Array.isArray(payload.triageAnswers)
    ? payload.triageAnswers.map((value) => String(value || '').trim()).filter(Boolean)
    : [];
  const recommendedNextStep = typeof payload.recommendedNextStep === 'string'
    ? payload.recommendedNextStep.trim()
    : '';

  return {
    source,
    complaint,
    triageSummary,
    triageAnswers,
    recommendedNextStep,
    symptomsText: description || complaint,
  };
}

export function formatTriageSourceLabel(source: string | undefined): string {
  if (!source) {
    return '';
  }

  if (source === 'ai-triage') {
    return 'AI triage';
  }

  return source
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

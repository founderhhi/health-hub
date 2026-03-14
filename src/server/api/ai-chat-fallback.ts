export type FallbackChatRole = 'user' | 'assistant';

export interface FallbackSessionMessage {
  role: FallbackChatRole;
  content: string;
}

export interface FallbackAiReply {
  reply: string;
  showGpCta: boolean;
  showDiagnosticsCta: boolean;
}

interface SymptomCategory {
  id: string;
  keywords: string[];
  conditions: string[];
  question: string;
  diagnostics: string[];
  diagnosticsCta: boolean;
}

const EMERGENCY_SIGNALS: Array<{ reason: string; patterns: string[] }> = [
  {
    reason: 'severe chest pain or possible breathing difficulty',
    patterns: [
      'chest pain',
      'pressure in chest',
      'tightness in chest',
      'shortness of breath',
      'trouble breathing',
      'cannot breathe',
      'cant breathe',
    ],
  },
  {
    reason: 'possible stroke symptoms',
    patterns: [
      'face droop',
      'facial droop',
      'slurred speech',
      'one sided weakness',
      'one-sided weakness',
      'numbness on one side',
      'sudden confusion',
    ],
  },
  {
    reason: 'heavy bleeding or vomiting/coughing blood',
    patterns: [
      'heavy bleeding',
      'bleeding heavily',
      'coughing blood',
      'vomiting blood',
      'black stool',
      'bloody stool',
    ],
  },
  {
    reason: 'a severe allergic reaction',
    patterns: [
      'swollen tongue',
      'swollen throat',
      'throat closing',
      'anaphylaxis',
      'cannot swallow',
    ],
  },
  {
    reason: 'loss of consciousness or seizure activity',
    patterns: [
      'passed out',
      'fainted',
      'unconscious',
      'seizure',
      'convulsion',
    ],
  },
  {
    reason: 'self-harm risk or suicidal thoughts',
    patterns: [
      'suicidal',
      'self harm',
      'self-harm',
      'want to die',
      'kill myself',
    ],
  },
];

const SAME_DAY_GP_PATTERNS = [
  'high fever',
  'persistent fever',
  'severe pain',
  'worsening pain',
  'blood in urine',
  'flank pain',
  'persistent vomiting',
  'cant keep fluids down',
  'cannot keep fluids down',
  'dehydrated',
  'pregnant and bleeding',
];

const CATEGORY_DEFINITIONS: SymptomCategory[] = [
  {
    id: 'respiratory',
    keywords: [
      'cough',
      'sore throat',
      'fever',
      'congestion',
      'runny nose',
      'wheeze',
      'asthma',
      'breathing',
      'breathless',
    ],
    conditions: [
      'a viral upper respiratory infection',
      'flu or COVID-like illness',
      'bronchitis or an asthma flare',
    ],
    question: 'Do you have fever, wheezing, chest tightness, or trouble breathing?',
    diagnostics: [
      'a viral swab if infection is suspected',
      'a chest exam or imaging if symptoms are persistent or worsening',
    ],
    diagnosticsCta: false,
  },
  {
    id: 'urinary',
    keywords: [
      'burning when i pee',
      'burning when peeing',
      'pain when peeing',
      'painful urination',
      'urine',
      'pee',
      'bladder',
      'uti',
      'frequent urination',
      'flank',
    ],
    conditions: [
      'a urinary tract infection',
      'bladder irritation',
      'a kidney infection if fever or flank pain is present',
    ],
    question: 'Any fever, back or flank pain, blood in the urine, or chance of pregnancy?',
    diagnostics: [
      'a urine dipstick and urine culture',
      'a pregnancy test if relevant',
    ],
    diagnosticsCta: true,
  },
  {
    id: 'gastrointestinal',
    keywords: [
      'stomach',
      'abdominal',
      'abdomen',
      'nausea',
      'vomit',
      'vomiting',
      'diarrhea',
      'diarrhoea',
      'constipation',
      'acid reflux',
      'heartburn',
    ],
    conditions: [
      'a stomach infection or food-related illness',
      'gastritis or acid reflux',
      'an inflammatory abdominal condition if pain is severe or localized',
    ],
    question: 'Where is the pain, and have you had vomiting, diarrhea, blood, or trouble keeping fluids down?',
    diagnostics: [
      'basic blood work if symptoms are persistent',
      'stool or abdominal testing if a clinician recommends it',
    ],
    diagnosticsCta: false,
  },
  {
    id: 'neurologic',
    keywords: [
      'headache',
      'migraine',
      'dizzy',
      'dizziness',
      'vertigo',
      'numb',
      'tingling',
      'vision',
    ],
    conditions: [
      'a tension headache or migraine',
      'dehydration or a viral illness',
      'a neurologic issue if symptoms are sudden or one-sided',
    ],
    question: 'Any sudden severe headache, weakness, numbness, vision change, or speech change?',
    diagnostics: [
      'a blood pressure check and in-person neurologic assessment',
    ],
    diagnosticsCta: false,
  },
  {
    id: 'musculoskeletal',
    keywords: [
      'back pain',
      'joint pain',
      'knee pain',
      'ankle pain',
      'shoulder pain',
      'sprain',
      'strain',
      'swelling',
      'injury',
    ],
    conditions: [
      'a muscular strain',
      'joint inflammation',
      'a ligament or soft tissue injury',
    ],
    question: 'Was there an injury, swelling, numbness, or inability to walk or use the joint normally?',
    diagnostics: [
      'an X-ray or scan if there was injury, deformity, or ongoing swelling',
    ],
    diagnosticsCta: false,
  },
  {
    id: 'skin',
    keywords: [
      'rash',
      'itch',
      'itching',
      'hives',
      'skin',
      'eczema',
      'swelling',
      'redness',
    ],
    conditions: [
      'an allergic or contact skin reaction',
      'eczema or dermatitis',
      'a skin infection if the area is painful, warm, or spreading',
    ],
    question: 'Is the rash spreading, painful, warm, blistering, or linked to swelling of the lips or throat?',
    diagnostics: [
      'an in-person skin exam if the rash is worsening or infected',
    ],
    diagnosticsCta: false,
  },
  {
    id: 'fatigue-metabolic',
    keywords: [
      'fatigue',
      'tired',
      'exhausted',
      'weight loss',
      'weight gain',
      'thirsty',
      'frequent thirst',
      'anemia',
      'anaemia',
      'thyroid',
      'blood sugar',
    ],
    conditions: [
      'anemia or another blood-related issue',
      'a thyroid or metabolic problem',
      'a blood sugar issue or dehydration',
    ],
    question: 'How long has this been going on, and do you also have dizziness, weight change, thirst, or shortness of breath?',
    diagnostics: [
      'blood tests such as a full blood count, thyroid tests, or glucose testing',
    ],
    diagnosticsCta: true,
  },
  {
    id: 'pregnancy-menstrual',
    keywords: [
      'pregnant',
      'pregnancy',
      'missed period',
      'period',
      'pelvic pain',
      'cramps',
      'vaginal bleeding',
      'spotting',
    ],
    conditions: [
      'period-related pain or hormonal changes',
      'pregnancy-related symptoms',
      'a gynecologic issue if pain or bleeding is significant',
    ],
    question: 'Could you be pregnant, and have you had heavy bleeding, severe pelvic pain, or dizziness?',
    diagnostics: [
      'a pregnancy test',
      'urine testing or blood work depending on symptoms',
    ],
    diagnosticsCta: true,
  },
];

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function includesAny(text: string, patterns: string[]): boolean {
  return patterns.some((pattern) => text.includes(pattern));
}

function uniqueItems(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function getUserMessages(messages: FallbackSessionMessage[]): string[] {
  return messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content.trim())
    .filter(Boolean);
}

function getMatchedCategories(text: string): SymptomCategory[] {
  return CATEGORY_DEFINITIONS.filter((category) => includesAny(text, category.keywords));
}

function getEmergencyReason(text: string): string | null {
  const matched = EMERGENCY_SIGNALS.find((signal) => includesAny(text, signal.patterns));
  return matched?.reason || null;
}

function buildEmergencyReply(reason: string): FallbackAiReply {
  return {
    reply: [
      'Your symptoms could be urgent because they suggest ' + reason + '.',
      'Recommended next step:',
      '- Seek urgent in-person or emergency care now rather than relying on chat.',
      '- If symptoms are severe or rapidly worsening, call your local emergency number immediately.',
    ].join('\n'),
    showGpCta: true,
    showDiagnosticsCta: false,
  };
}

function buildQuestionReply(categories: SymptomCategory[]): FallbackAiReply {
  const categoryQuestions = categories.map((category) => category.question);
  const questions = uniqueItems([
    'When did this start, and is it getting better, worse, or staying the same?',
    categoryQuestions[0] || 'What are the main symptoms, and how severe are they right now?',
    categoryQuestions[1] || 'Do you have any red flags such as fever, blood, severe pain, fainting, or shortness of breath?',
    'What is your age, any major medical conditions or regular medicines, and could you be pregnant?',
  ]).slice(0, 3);

  return {
    reply: [
      'Thanks for sharing that. I can help with a brief triage.',
      'Please reply with these details in one message:',
      ...questions.map((question, index) => `${index + 1}. ${question}`),
      'Seek urgent care sooner if you develop severe chest pain, trouble breathing, fainting, one-sided weakness, or heavy bleeding.',
    ].join('\n'),
    showGpCta: false,
    showDiagnosticsCta: false,
  };
}

function buildRecommendedNextStep(text: string, categories: SymptomCategory[]): string {
  if (includesAny(text, SAME_DAY_GP_PATTERNS)) {
    return 'Arrange a same-day GP or urgent care review. Do not wait for routine follow-up if symptoms are worsening.';
  }

  if (categories.some((category) => category.id === 'respiratory')) {
    return 'Book a GP review within 24 hours if symptoms are persistent, and sooner if breathing symptoms are worsening.';
  }

  if (categories.some((category) => category.id === 'urinary')) {
    return 'Book a GP review within 24 hours, especially if there is fever, flank pain, or worsening pain with urination.';
  }

  if (categories.some((category) => category.id === 'pregnancy-menstrual')) {
    return 'Arrange prompt GP or sexual-health review, sooner if pain or bleeding increases.';
  }

  return 'Book a GP review within 24-72 hours if symptoms persist, worsen, or keep returning.';
}

function buildSummaryReply(text: string, categories: SymptomCategory[]): FallbackAiReply {
  const possibleConditions = uniqueItems(
    categories.flatMap((category) => category.conditions)
  ).slice(0, 3);
  const diagnostics = uniqueItems(
    categories.flatMap((category) => category.diagnostics)
  ).slice(0, 3);
  const showDiagnosticsCta = categories.some((category) => category.diagnosticsCta);

  const lines = [
    'Here is a brief triage summary based on what you shared.',
    'Possible conditions:',
    ...(possibleConditions.length > 0
      ? possibleConditions.map((condition) => `- ${condition}`)
      : [
          '- a self-limited viral illness',
          '- a mild inflammatory condition',
          '- a problem that still needs a GP review if it is persisting or worsening',
        ]),
    'Recommended next step:',
    `- ${buildRecommendedNextStep(text, categories)}`,
  ];

  if (diagnostics.length > 0) {
    lines.push('Possible diagnostics to discuss:');
    diagnostics.forEach((item) => lines.push(`- ${item}`));
  }

  lines.push(
    'Seek urgent in-person care immediately if you develop severe chest pain, trouble breathing, fainting, one-sided weakness, or heavy bleeding.'
  );

  return {
    reply: lines.join('\n'),
    showGpCta: true,
    showDiagnosticsCta,
  };
}

export function buildFallbackTriageReply(messages: FallbackSessionMessage[]): FallbackAiReply {
  const userMessages = getUserMessages(messages);
  const combinedUserText = normalizeText(userMessages.join(' '));

  const emergencyReason = getEmergencyReason(combinedUserText);
  if (emergencyReason) {
    return buildEmergencyReply(emergencyReason);
  }

  const categories = getMatchedCategories(combinedUserText);

  if (userMessages.length <= 1) {
    return buildQuestionReply(categories);
  }

  return buildSummaryReply(combinedUserText, categories);
}

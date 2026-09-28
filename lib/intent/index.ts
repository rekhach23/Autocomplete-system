import { IntentResult, IntentType, RetrievalMatch, ServiceItem, SupportedLanguage } from '../types';
import { serviceRepository } from '../services/repository';

const transliterations: Record<string, string> = {
  'na': 'i',
  'naa': 'i',
  'naku': 'i',
  'mujhe': 'i',
  'mere': 'i',
  'enakku': 'i',
  'mera': 'i',
  'my': 'i',
  'i': 'i',
  'need': 'need',
  'salary': 'scholarship',
  'scholarship': 'scholarship',
  'pension': 'pension',
  'income': 'income',
  'caste': 'caste',
  'residence': 'residence',
  'birth': 'birth',
  'death': 'death',
  'ration': 'ration',
  'job': 'job',
  'employment': 'employment',
  'agriculture': 'agriculture',
  'health': 'health',
  'education': 'education',
  'disability': 'disability',
  'housing': 'housing',
  'women': 'women',
  'senior': 'senior',
  'certificate': 'certificate',
  'not': 'not',
  'nahi': 'not',
  'raledu': 'not',
  'varala': 'not',
  'missing': 'not',
  'delay': 'delay',
  'delayed': 'delay',
  'arrived': 'arrived',
  'mili': 'received',
  'vachedi': 'received',
  'radu': 'not',
  'raaledu': 'not',
  'il': 'not',
  'ill': 'not',
  'late': 'delay',
  'money': 'money'
};

const intentPatterns: Record<string, Array<[string, string]>> = {
  SCHOLARSHIP_PAYMENT_NOT_RECEIVED: [
    ['scholarship', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['payment not received', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['scholarship money', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['scholarship dabbu', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['నిధులు రాలేదు', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['स्कॉलरशिप', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    ['சான்றிதழ்', 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED']
  ],
  SCHOLARSHIP_APPLICATION: [
    ['scholarship application', 'SCHOLARSHIP_APPLICATION'],
    ['apply scholarship', 'SCHOLARSHIP_APPLICATION'],
    ['new scholarship', 'SCHOLARSHIP_APPLICATION']
  ],
  PENSION_NOT_RECEIVED: [
    ['pension', 'PENSION_NOT_RECEIVED'],
    ['పింఛన్', 'PENSION_NOT_RECEIVED'],
    ['पेंशन', 'PENSION_NOT_RECEIVED'],
    ['ஓய்வூதியம்', 'PENSION_NOT_RECEIVED'],
    ['pension not received', 'PENSION_NOT_RECEIVED'],
    ['not received', 'PENSION_NOT_RECEIVED']
  ],
  PENSION_APPLICATION: [
    ['pension application', 'PENSION_APPLICATION'],
    ['apply pension', 'PENSION_APPLICATION']
  ],
  INCOME_CERTIFICATE: [
    ['income certificate', 'INCOME_CERTIFICATE'],
    ['आय प्रमाण पत्र', 'INCOME_CERTIFICATE'],
    ['వార్షిక ఆదాయం', 'INCOME_CERTIFICATE'],
    ['வருமான சான்றிதழ்', 'INCOME_CERTIFICATE']
  ],
  CASTE_CERTIFICATE: [
    ['caste certificate', 'CASTE_CERTIFICATE'],
    ['जाति प्रमाण पत्र', 'CASTE_CERTIFICATE'],
    ['జాతి సర్టిఫికేట్', 'CASTE_CERTIFICATE'],
    ['சாதி சான்றிதழ்', 'CASTE_CERTIFICATE']
  ],
  RESIDENCE_CERTIFICATE: [
    ['residence certificate', 'RESIDENCE_CERTIFICATE'],
    ['domicile certificate', 'RESIDENCE_CERTIFICATE'],
    ['నివాస సర్టిఫికేట్', 'RESIDENCE_CERTIFICATE'],
    ['வதிவிட சான்றிதழ்', 'RESIDENCE_CERTIFICATE']
  ],
  BIRTH_CERTIFICATE: [
    ['birth certificate', 'BIRTH_CERTIFICATE'],
    ['జన్మ సర్టిఫికేట్', 'BIRTH_CERTIFICATE'],
    ['जन्म प्रमाण पत्र', 'BIRTH_CERTIFICATE'],
    ['பிறப்பு சான்றிதழ்', 'BIRTH_CERTIFICATE']
  ],
  DEATH_CERTIFICATE: [
    ['death certificate', 'DEATH_CERTIFICATE'],
    ['మరణం సర్టిఫికేట్', 'DEATH_CERTIFICATE'],
    ['मृत्यु प्रमाण पत्र', 'DEATH_CERTIFICATE'],
    ['மரண சான்றிதழ்', 'DEATH_CERTIFICATE']
  ],
  RATION_CARD: [
    ['ration card', 'RATION_CARD'],
    ['రేషన్ కార్డ్', 'RATION_CARD'],
    ['राशन कार्ड', 'RATION_CARD'],
    ['ரேஷன் அட்டை', 'RATION_CARD']
  ],
  EDUCATION_SUPPORT: [
    ['education support', 'EDUCATION_SUPPORT'],
    ['school fee', 'EDUCATION_SUPPORT'],
    ['student help', 'EDUCATION_SUPPORT']
  ],
  HEALTHCARE_SUPPORT: [
    ['healthcare', 'HEALTHCARE_SUPPORT'],
    ['medical help', 'HEALTHCARE_SUPPORT'],
    ['hospital', 'HEALTHCARE_SUPPORT'],
    ['doctor', 'HEALTHCARE_SUPPORT']
  ],
  EMPLOYMENT_SUPPORT: [
    ['job', 'EMPLOYMENT_SUPPORT'],
    ['employment', 'EMPLOYMENT_SUPPORT'],
    ['working', 'EMPLOYMENT_SUPPORT'],
    ['unemployment', 'EMPLOYMENT_SUPPORT']
  ],
  AGRICULTURE_SUPPORT: [
    ['farmer', 'AGRICULTURE_SUPPORT'],
    ['agriculture', 'AGRICULTURE_SUPPORT'],
    ['crop', 'AGRICULTURE_SUPPORT'],
    ['seed subsidy', 'AGRICULTURE_SUPPORT']
  ],
  DISABILITY_SUPPORT: [
    ['disability', 'DISABILITY_SUPPORT'],
    ['disabled', 'DISABILITY_SUPPORT'],
    ['wheelchair', 'DISABILITY_SUPPORT']
  ],
  HOUSING_SUPPORT: [
    ['housing', 'HOUSING_SUPPORT'],
    ['house assistance', 'HOUSING_SUPPORT'],
    ['flat subsidy', 'HOUSING_SUPPORT']
  ],
  WOMEN_WELFARE: [
    ['women welfare', 'WOMEN_WELFARE'],
    ['women support', 'WOMEN_WELFARE'],
    ['women benefit', 'WOMEN_WELFARE']
  ],
  SENIOR_CITIZEN_SUPPORT: [
    ['senior citizen', 'SENIOR_CITIZEN_SUPPORT'],
    ['old age', 'SENIOR_CITIZEN_SUPPORT'],
    ['elder support', 'SENIOR_CITIZEN_SUPPORT']
  ],
  DOCUMENT_STATUS: [
    ['document status', 'DOCUMENT_STATUS'],
    ['pending document', 'DOCUMENT_STATUS'],
    ['certificate pending', 'DOCUMENT_STATUS'],
    ['status check', 'DOCUMENT_STATUS']
  ]
};

export function normalizeQuery(input: string): string {
  if (!input) return '';

  let normalized = input.toLowerCase().trim();
  normalized = normalized.replace(/[\u200C\u200D]/g, '');
  normalized = normalized.replace(/[^\p{L}\p{N}\s]/gu, ' ');
  normalized = normalized.replace(/\s+/g, ' ').trim();

  const normalizedWords = normalized.split(' ').map((word) => transliterations[word] ?? word);
  return normalizedWords.join(' ');
}

export function detectLanguage(input: string): SupportedLanguage {
  const normalized = input.toLowerCase();
  if (/[\u0C00-\u0C7F]/.test(normalized)) return 'te';
  if (/[\u0900-\u097F]/.test(normalized)) return 'hi';
  if (/[\u0B80-\u0BFF]/.test(normalized)) return 'ta';
  return 'en';
}

export function classifyIntent(query: string): IntentResult {
  const trimmed = query?.trim() ?? '';
  if (!trimmed) {
    return {
      intent: 'GENERAL_GOVERNMENT_SERVICE',
      confidence: 0.15,
      language: 'en',
      entities: {},
      summary: 'Please describe your issue so we can find the right government service.',
      nextSteps: ['Tell us what problem you are facing', 'Share your preferred language and location'],
      documents: ['None required yet'],
      clarifyingQuestion: null
    };
  }

  const detectedLanguage = detectLanguage(trimmed);
  const normalized = normalizeQuery(trimmed);
  const rawLower = trimmed.toLowerCase();
  const containsAny = (terms: string[]) => terms.some((term) => normalized.includes(term) || rawLower.includes(term));

  const scholarshipMarkers = [
    'scholarship', 'scholarship payment', 'స్కాలర్షిప్', 'స్కాలర్', 'స్కాలర్‌షిప్', 'స్కాలర్ షిప్', 'স্কলারশিপ', 'स्कॉलरशिप',
    'கல்வி உதவித் தொகை', 'ஸ்காலர்ஷிப்', 'student aid'
  ];
  const paymentMarkers = [
    'payment', 'money', 'funds', 'amount', 'డబ్బు', 'నిధులు', 'पैसा', 'धन', 'பணம்', 'விளை', 'moneys', 'not received', 'not arrived'
  ];
  const absenceMarkers = [
    'not received', 'not arrived', 'not come', 'missing', 'delay', 'delayed', 'pending', 'late', 'రాలేదు', 'రాలేదు',
    'रहा नहीं', 'नहीं मिला', 'வரவில்லை', 'வந்ததில்லை', 'தாமதம்', 'கிடைக்கவில்லை'
  ];
  const applicationMarkers = ['application', 'apply', 'apply now', 'దరఖాస్తు', 'आवेदन', 'விண்ணப்பம்'];

  const scores: Array<{ intent: string; score: number; matched: string }> = [];

  if (containsAny(scholarshipMarkers) && containsAny(applicationMarkers)) {
    scores.push({ intent: 'SCHOLARSHIP_APPLICATION', score: 0.95, matched: 'scholarship application' });
  }

  if (containsAny(scholarshipMarkers) && (containsAny(paymentMarkers) || containsAny(absenceMarkers))) {
    scores.push({ intent: 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED', score: 0.96, matched: 'scholarship payment missing' });
  }

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    for (const [pattern, matchIntent] of patterns) {
      if (normalized.includes(pattern) || rawLower.includes(pattern)) {
        scores.push({ intent, score: 0.9, matched: matchIntent });
      }
    }
  }

  if (scores.length === 0) {
    if (/certificate/.test(normalized)) {
      return {
        intent: 'GENERAL_GOVERNMENT_SERVICE',
        confidence: 0.4,
        language: detectedLanguage,
        entities: { query: trimmed },
        summary: 'We found a certificate-related request. Please confirm which document you need.',
        nextSteps: ['Choose the document type', 'Check required documents', 'Visit the relevant portal'],
        documents: ['Identity proof', 'Address proof'],
        clarifyingQuestion: 'Do you need an income, caste, or residence certificate?'
      };
    }

    return {
      intent: 'GENERAL_GOVERNMENT_SERVICE',
      confidence: 0.25,
      language: detectedLanguage,
      entities: { query: trimmed },
      summary: 'We could not confidently match your request to a service yet.',
      nextSteps: ['Describe the problem more clearly', 'Mention a document or benefit you need', 'Try a common service keyword'],
      documents: ['None required yet'],
      clarifyingQuestion: 'Can you tell us whether this is about a pension, payment, document, or scheme?'
    };
  }

  const bestMatch = scores.reduce((best, current) => {
    return current.score > best.score ? current : best;
  }, scores[0]);

  const primaryIntent = bestMatch.intent as keyof typeof intentPatterns;
  return {
    intent: primaryIntent as IntentType,
    confidence: 0.82,
    language: detectedLanguage,
    entities: { query: trimmed },
    summary: `We think you need help with ${primaryIntent.replace(/_/g, ' ').toLowerCase()}.`,
    nextSteps: ['Check your application or payment status', 'Prepare required documents', 'Submit or follow up on the request'],
    documents: ['Identity proof', 'Application record'],
    clarifyingQuestion: null
  };
}

export function getServiceMatches(query: string): RetrievalMatch[] {
  const intentResult = classifyIntent(query);
  const matches: RetrievalMatch[] = [];

  serviceRepository.forEach((service) => {
    const problemMatch = service.problemIntents.includes(intentResult.intent) ? 0.8 : 0;
    const keywordMatch = service.keywords.some((keyword) => normalizeQuery(query).includes(normalizeQuery(keyword))) ? 0.4 : 0;
    const nameMatch = service.name.toLowerCase().includes(normalizeQuery(query).split(' ')[0] ?? '') ? 0.2 : 0;
    const score = problemMatch + keywordMatch + nameMatch;

    if (score > 0.1) {
      matches.push({
        serviceId: service.id,
        score,
        reason: service.problemIntents.includes(intentResult.intent) ? 'Intent match' : 'Keyword similarity'
      });
    }
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, 5);
}

export const getServiceById = (id: string): ServiceItem | undefined =>
  serviceRepository.find((service) => service.id === id);

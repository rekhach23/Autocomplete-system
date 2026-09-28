export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta';

export type IntentType =
  | 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED'
  | 'SCHOLARSHIP_APPLICATION'
  | 'PENSION_NOT_RECEIVED'
  | 'PENSION_APPLICATION'
  | 'INCOME_CERTIFICATE'
  | 'CASTE_CERTIFICATE'
  | 'RESIDENCE_CERTIFICATE'
  | 'BIRTH_CERTIFICATE'
  | 'DEATH_CERTIFICATE'
  | 'EDUCATION_SUPPORT'
  | 'HEALTHCARE_SUPPORT'
  | 'EMPLOYMENT_SUPPORT'
  | 'AGRICULTURE_SUPPORT'
  | 'RATION_CARD'
  | 'DISABILITY_SUPPORT'
  | 'HOUSING_SUPPORT'
  | 'WOMEN_WELFARE'
  | 'SENIOR_CITIZEN_SUPPORT'
  | 'DOCUMENT_STATUS'
  | 'GENERAL_GOVERNMENT_SERVICE';

export interface AIResponse {
  intent: IntentType;
  confidence: number;
  language: SupportedLanguage;
  entities: Record<string, string | number | boolean | null>;
  matchedServices: string[];
  summary: string;
  nextSteps: string[];
  documents: string[];
  clarifyingQuestion: string | null;
}

export interface ServiceItem {
  id: string;
  name: string;
  localizedName: Partial<Record<SupportedLanguage, string>>;
  department: string;
  category: string;
  description: string;
  localizedDescription: Partial<Record<SupportedLanguage, string>>;
  problemIntents: IntentType[];
  keywords: string[];
  eligibility: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  onlineAvailable: boolean;
  officialUrl: string;
  helpline: string | null;
  state: string;
  languages: SupportedLanguage[];
  source: string;
  verified: boolean;
  lastVerified: string;
}

export interface IntentResult {
  intent: IntentType;
  confidence: number;
  language: SupportedLanguage;
  entities: Record<string, string | number | boolean | null>;
  summary: string;
  nextSteps: string[];
  documents: string[];
  clarifyingQuestion: string | null;
}

export interface RetrievalMatch {
  serviceId: string;
  score: number;
  reason: string;
}

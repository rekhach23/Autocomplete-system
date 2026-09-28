import { AIResponse, IntentType, SupportedLanguage } from '../../types';
import { detectLanguage, classifyIntent, getServiceMatches } from '../../intent';

export class LocalFallbackProvider {
  async classifyIntent(query: string): Promise<AIResponse> {
    const result = classifyIntent(query);
    const services = getServiceMatches(query).map((match) => match.serviceId);

    return {
      intent: result.intent as IntentType,
      confidence: result.confidence,
      language: detectLanguage(query),
      entities: result.entities,
      matchedServices: services,
      summary: result.summary,
      nextSteps: result.nextSteps,
      documents: result.documents,
      clarifyingQuestion: result.clarifyingQuestion,
    };
  }

  async generateGuidance(language: SupportedLanguage, result: AIResponse): Promise<string> {
    void result;

    const localized = {
      en: 'We found services that may help. Here is what you can do next.',
      te: 'మీకు సహాయపడే సేవలు కనుగొన్నాము. తదుపరి చర్యలు ఇవి.',
      hi: 'हमने ऐसी सेवाएँ ढूंढी हैं जो आपकी मदद कर सकती हैं। अगला कदम यही है।',
      ta: 'உங்களுக்கு உதவக்கூடிய சேவைகளை கண்டறிந்துள்ளோம். அடுத்து என்ன செய்யலாம் என்பதை இங்கே பார்க்கலாம்.'
    } as const;

    return localized[language] ?? localized.en;
  }

  async translate(text: string, from: SupportedLanguage, to: SupportedLanguage): Promise<string> {
    if (from === to) return text;
    return text;
  }
}

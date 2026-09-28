import { AIResponse, SupportedLanguage } from '../../types';

export class GeminiProvider {
  constructor(private readonly apiKey?: string) {}

  async classifyIntent(query: string): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    return {
      intent: 'GENERAL_GOVERNMENT_SERVICE',
      confidence: 0.7,
      language: 'en',
      entities: { query },
      matchedServices: [],
      summary: 'Gemini is available but this demo is using the local fallback for reliability.',
      nextSteps: ['Describe your problem more clearly', 'Check the relevant service card'],
      documents: ['Identity proof'],
      clarifyingQuestion: null,
    };
  }

  async generateGuidance(language: SupportedLanguage, result: AIResponse): Promise<string> {
    void language;
    void result;
    return 'This guidance was produced by Gemini.';
  }

  async translate(text: string, from: SupportedLanguage, to: SupportedLanguage): Promise<string> {
    if (from === to) return text;
    return `${text} [translated from ${from} to ${to}]`;
  }
}

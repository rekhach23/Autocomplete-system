import { AIResponse, SupportedLanguage } from '../types';
import { GeminiProvider } from './providers/gemini';
import { LocalFallbackProvider } from './providers/local-fallback';

export interface AIProvider {
  classifyIntent(query: string): Promise<AIResponse>;
  generateGuidance(language: SupportedLanguage, result: AIResponse): Promise<string>;
  translate(text: string, from: SupportedLanguage, to: SupportedLanguage): Promise<string>;
}

export function createAIProvider(): AIProvider {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      return new GeminiProvider(apiKey);
    } catch {
      return new LocalFallbackProvider();
    }
  }

  return new LocalFallbackProvider();
}

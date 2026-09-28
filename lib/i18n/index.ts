import { en } from './en';
import { hi } from './hi';
import { ta } from './ta';
import { te } from './te';

export const supportedLanguages = ['en', 'te', 'hi', 'ta'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = 'en';

export const translations = {
  en,
  te,
  hi,
  ta,
} as const;

export function getValueByPath(input: Record<string, unknown>, path: string): string | string[] {
  const value = path.split('.').reduce<Record<string, unknown> | string | string[] | undefined>((current, segment) => {
    if (typeof current === 'object' && current !== null && segment in current) {
      return (current as Record<string, unknown>)[segment] as Record<string, unknown> | string | string[];
    }
    return undefined;
  }, input);

  return typeof value === 'string' || Array.isArray(value) ? value : '';
}

export function getTranslation(language: SupportedLanguage, path: string): string | string[] {
  const candidate = getValueByPath(translations[language], path);
  if (candidate !== '') {
    return candidate;
  }
  const fallback = getValueByPath(translations.en, path);
  return fallback !== '' ? fallback : path;
}

'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { defaultLanguage, getTranslation, supportedLanguages, type SupportedLanguage } from '@/lib/i18n';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (path: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(defaultLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem('sahaayak-language');
    if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(stored as SupportedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    window.localStorage.setItem('sahaayak-language', language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (next) => setLanguageState(next),
    t: (path) => getTranslation(language, path),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

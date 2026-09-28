import { serviceRepository } from './services/repository';
import type { SupportedLanguage } from './types';

export interface AutocompleteSuggestion {
  text: string;
  frequency: number;
  language: SupportedLanguage;
}

type TrieNode = {
  children: Map<string, TrieNode>;
  suggestions: AutocompleteSuggestion[];
};

const memoryCache = new Map<string, AutocompleteSuggestion[]>();

const normalizeAutocompleteText = (value: string): string =>
  value
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

const autocompleteCatalog: Record<SupportedLanguage, Array<{ text: string; frequency: number }>> = {
  en: [
    { text: 'my scholarship money has not arrived', frequency: 8400 },
    { text: 'my scholarship', frequency: 8200 },
    { text: 'scholarship payment not received', frequency: 9000 },
    { text: 'i need an income certificate', frequency: 7600 },
    { text: 'my pension has not arrived', frequency: 7900 },
    { text: 'i need a caste certificate', frequency: 7100 },
    { text: 'my residence certificate is delayed', frequency: 6800 },
    { text: 'need help with pension', frequency: 6400 },
    { text: 'i need a birth certificate', frequency: 6100 },
    { text: 'ration card not received', frequency: 5900 },
  ],
  te: [
    { text: 'నా స్కాలర్‌షిప్ డబ్బు ఇంకా రాలేదు', frequency: 8600 },
    { text: 'నా స్కాలర్‌షిప్', frequency: 8200 },
    { text: 'పింఛన్ వచ్చిందా', frequency: 7900 },
    { text: 'నాకు ఆదాయ సర్టిఫికేట్ కావాలి', frequency: 7600 },
    { text: 'నా వసతి సర్టిఫికేట్ ఆలస్యమైంది', frequency: 6900 },
    { text: 'జాతి సర్టిఫికేట్ కావాలి', frequency: 6700 },
    { text: 'పుట్టిన తేదీ ధ్రువీకరణ', frequency: 6200 },
    { text: 'రేషన్ కార్డు లేదు', frequency: 5800 },
  ],
  hi: [
    { text: 'मुझे पेंशन नहीं मिली', frequency: 8600 },
    { text: 'मेरा स्कॉलरशिप पैसा नहीं आया', frequency: 8400 },
    { text: 'स्कॉलरशिप भुगतान नहीं मिला', frequency: 9100 },
    { text: 'मुझे आय प्रमाण पत्र चाहिए', frequency: 7700 },
    { text: 'मुझे जाति प्रमाण पत्र चाहिए', frequency: 7100 },
    { text: 'मेरा निवास प्रमाण पत्र लंबित है', frequency: 6700 },
    { text: 'जन्म प्रमाण पत्र चाहिए', frequency: 6200 },
    { text: 'राशन कार्ड की स्थिति', frequency: 6000 },
  ],
  ta: [
    { text: 'என் உதவித்தொகை பணம் வரவில்லை', frequency: 8500 },
    { text: 'எனக்கு வருமான சான்றிதழ் தேவை', frequency: 7800 },
    { text: 'என் ஓய்வூதியம் வரவில்லை', frequency: 8000 },
    { text: 'சாதி சான்றிதழ் வேண்டும்', frequency: 7000 },
    { text: 'வதிவிட சான்றிதழ் தாமதம்', frequency: 6600 },
    { text: 'பிறப்பு சான்றிதழ் தேவை', frequency: 6200 },
    { text: 'ரேஷன் அட்டை நிலை', frequency: 5900 },
    { text: 'கல்வி உதவித் தொகை நிலை', frequency: 6100 },
  ],
};

const addServiceSuggestions = (): Record<SupportedLanguage, Array<{ text: string; frequency: number }>> => {
  const next: Record<SupportedLanguage, Array<{ text: string; frequency: number }>> = structuredClone(autocompleteCatalog);

  serviceRepository.forEach((service) => {
    (Object.keys(service.localizedName) as SupportedLanguage[]).forEach((language) => {
      const name = service.localizedName[language];
      if (name) {
        next[language].push({ text: name, frequency: 4700 });
      }
      const description = service.localizedDescription[language];
      if (description) {
        next[language].push({ text: description, frequency: 4300 });
      }
      service.keywords.forEach((keyword, index) => {
        next[language].push({ text: keyword, frequency: Math.max(2200, 4000 - index * 100) });
      });
    });
  });

  return next;
};

const catalog = addServiceSuggestions();

const buildTrie = (language: SupportedLanguage): TrieNode => {
  const root: TrieNode = { children: new Map(), suggestions: [] };

  catalog[language].forEach((entry) => {
    const text = entry.text.normalize('NFC').trim();
    if (!text) return;

    let node = root;

    for (const char of text.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, { children: new Map(), suggestions: [] });
      }
      node = node.children.get(char)!;
    }

    node.suggestions.push({ text: entry.text, frequency: entry.frequency, language });
  });

  return root;
};

const collectTrieMatches = (node: TrieNode, currentText: string, language: SupportedLanguage): AutocompleteSuggestion[] => {
  const results: AutocompleteSuggestion[] = [];

  if (node.suggestions.length > 0) {
    node.suggestions.forEach((suggestion) => results.push(suggestion));
  }

  for (const [char, child] of node.children.entries()) {
    results.push(...collectTrieMatches(child, `${currentText}${char}`, language));
  }

  return results
    .filter((suggestion, index, all) => {
      const key = `${suggestion.text.toLowerCase()}|${suggestion.frequency}`;
      return all.findIndex((entry) => `${entry.text.toLowerCase()}|${entry.frequency}` === key) === index;
    })
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);
};

const getTrieMatchesForPrefix = (prefix: string, language: SupportedLanguage): AutocompleteSuggestion[] => {
  const normalizedPrefix = normalizeAutocompleteText(prefix);
  if (!normalizedPrefix) {
    return [...catalog[language]]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)
      .map((entry) => ({ ...entry, language }));
  }

  const root = buildTrie(language);
  let node: TrieNode | null = root;

  for (const char of normalizedPrefix) {
    if (!node) {
      return [];
    }

    const nextNode: TrieNode | undefined = node.children.get(char);
    if (!nextNode) {
      return [];
    }
    node = nextNode;
  }

  if (!node) {
    return [];
  }

  return collectTrieMatches(node, normalizedPrefix, language).filter((entry) =>
    normalizeAutocompleteText(entry.text).startsWith(normalizedPrefix)
  );
};

const fetchFromCache = (prefix: string, language: SupportedLanguage): AutocompleteSuggestion[] | null => {
  const key = `${language}:${normalizeAutocompleteText(prefix)}`;
  const fromMemory = memoryCache.get(key);
  if (fromMemory) return fromMemory;

  if (typeof window === 'undefined') return null;

  const cached = window.localStorage.getItem(`sahaayak-autocomplete:${key}`);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached) as AutocompleteSuggestion[];
    memoryCache.set(key, parsed);
    return parsed;
  } catch {
    return null;
  }
};

export const getAutocompleteSuggestions = async (
  query: string,
  language: SupportedLanguage,
): Promise<AutocompleteSuggestion[]> => {
  const normalized = normalizeAutocompleteText(query);
  const key = `${language}:${normalized}`;

  const cached = fetchFromCache(query, language);
  if (cached) {
    return cached;
  }

  await new Promise((resolve) => setTimeout(resolve, 50));

  const matches = getTrieMatchesForPrefix(normalized, language);
  const result = matches.slice(0, 5);

  memoryCache.set(key, result);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(`sahaayak-autocomplete:${key}`, JSON.stringify(result));
  }

  return result;
};

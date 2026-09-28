"use client";

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { getAutocompleteSuggestions } from '@/lib/autocomplete';
import { classifyIntent, getServiceMatches } from '@/lib/intent';
import { getAllServices } from '@/lib/services/repository';
import { createVoiceRecognizer, isVoiceSupported, speakText } from '@/lib/voice';

const exampleQueries: Record<string, string[]> = {
  en: ["My scholarship money hasn't arrived", 'I need an income certificate', 'My pension hasn’t arrived'],
  te: ['నా స్కాలర్‌షిప్ డబ్బు ఇంకా రాలేదు', 'నాకు ఆదాయ సర్టిఫికేట్ కావాలి', 'నా పెన్షన్ ఇంకా రాలేదు'],
  hi: ['मेरा स्कॉलरशिप पैसा अभी तक नहीं आया', 'मुझे आय प्रमाण पत्र चाहिए', 'मेरी पेंशन नहीं मिली'],
  ta: ['என் உதவித்தொகை பணம் இன்னும் வரவில்லை', 'எனக்கு வருமான சான்றிதழ் தேவை', 'என் ஓய்வூதியம் வரவில்லை'],
};

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const [problem, setProblem] = useState<string>(exampleQueries[language][0]);
  const [status, setStatus] = useState('');
  const [queryError, setQueryError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof classifyIntent> | null>(null);
  const [listening, setListening] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ text: string; frequency: number }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const allServices = useMemo(() => getAllServices(), []);
  const matches = result ? getServiceMatches(problem) : [];
  const storySteps = Array.isArray(t('story.steps')) ? (t('story.steps') as string[]) : [];

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const fetchSuggestions = async (value: string, nextLanguage: typeof language) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      setIsLoadingSuggestions(true);
      const nextSuggestions = await getAutocompleteSuggestions(trimmed, nextLanguage);
      setSuggestions(nextSuggestions);
      setShowSuggestions(nextSuggestions.length > 0);
      setSelectedSuggestionIndex(-1);
      setIsLoadingSuggestions(false);
    }, 100);
  };

  const runSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setQueryError(String(t('search.placeholder')));
      return;
    }

    setQueryError('');
    setShowSuggestions(false);
    const intentResult = classifyIntent(trimmed);
    setResult(intentResult);
    setStatus(String(t('states.findingServices')));
  };

  const handleSearch = () => {
    runSearch(problem);
  };

  const handleSuggestionSelect = (value: string) => {
    setProblem(value);
    setShowSuggestions(false);
    runSearch(value);
  };

  const handleVoice = () => {
    if (!isVoiceSupported()) {
      setStatus(String(t('search.voiceUnsupported')));
      return;
    }

    const recognizer = createVoiceRecognizer(
      (text) => {
        setProblem(text);
        setListening(false);
        setStatus(String(t('search.processing')));
      },
      (message) => {
        setStatus(message);
        setListening(false);
      }
    );

    if (!recognizer) {
      setStatus(String(t('search.voiceUnsupported')));
      return;
    }

    setListening(true);
    setStatus(String(t('search.listening')));
    recognizer.start();
  };

  const renderIntentLabel = (value: string) => {
    const translated = t(`intent.${value}`);
    return typeof translated === 'string' && translated ? translated : value.replace(/_/g, ' ').toLowerCase();
  };

  return (
    <main className="landing-shell min-h-screen text-slate-900">
      <header className="topbar">
        <div className="container-shell flex items-center justify-between gap-4 py-4">
          <Link href="/" className="brand-mark" aria-label="Sahaayak Search home">
            <div className="brand-badge">S</div>
            <div>
              <p className="text-lg font-black tracking-[0.14em] text-slate-900">SAHAAYAK SEARCH</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            <Link href="/" className="nav-link">{String(t('nav.home'))}</Link>
            <Link href="/services" className="nav-link">{String(t('nav.services'))}</Link>
            <Link href="/how-it-works" className="nav-link">{String(t('nav.howItWorks'))}</Link>
            <Link href="/about" className="nav-link">{String(t('nav.about'))}</Link>
          </nav>

          <label className="language-select-wrap">
            <span className="sr-only">{String(t('search.ariaLanguage'))}</span>
            <select
              aria-label={String(t('search.ariaLanguage'))}
              value={language}
              onChange={(event) => {
                const nextLanguage = event.target.value as typeof language;
                setLanguage(nextLanguage);
                if (problem.trim()) {
                  void fetchSuggestions(problem, nextLanguage);
                }
              }}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </label>
        </div>
      </header>

      <section className="container-shell py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 shadow-sm">
              {String(t('hero.badge'))}
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {String(t('hero.title'))}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              {String(t('hero.subtitle'))}
            </p>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white/90 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-4">
              <div className="search-shell">
                <div className="search-input-wrap">
                  <span className="search-icon" aria-hidden="true">⌕</span>
                  <input
                    ref={inputRef}
                    aria-label={String(t('search.ariaDescribe'))}
                    value={problem}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setProblem(nextValue);
                      void fetchSuggestions(nextValue, language);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        if (suggestions.length === 0) return;
                        setSelectedSuggestionIndex((current) => (current + 1) % suggestions.length);
                      }

                      if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        if (suggestions.length === 0) return;
                        setSelectedSuggestionIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
                      }

                      if (event.key === 'Enter') {
                        if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                          event.preventDefault();
                          handleSuggestionSelect(suggestions[selectedSuggestionIndex].text);
                          return;
                        }
                        event.preventDefault();
                        handleSearch();
                      }

                      if (event.key === 'Escape') {
                        setShowSuggestions(false);
                        setSelectedSuggestionIndex(-1);
                      }
                    }}
                    placeholder={String(t('search.placeholder'))}
                    className="search-input"
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  />
                </div>
                <button
                  type="button"
                  aria-label={String(t('search.ariaVoice'))}
                  onClick={handleVoice}
                  className={`voice-button ${listening ? 'listening' : ''}`}
                >
                  {listening ? String(t('search.listening')) : '🎙️'}
                </button>
                <button type="button" onClick={handleSearch} className="primary-button">
                  {String(t('search.getHelp'))}
                </button>
              </div>

              {showSuggestions ? (
                <div className="autocomplete-panel" role="listbox" aria-label="Autocomplete suggestions">
                  {isLoadingSuggestions ? (
                    <div className="autocomplete-row loading">Loading suggestions…</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.slice(0, 5).map((suggestion, index) => (
                      <button
                        key={`${suggestion.text}-${index}`}
                        type="button"
                        role="option"
                        aria-selected={selectedSuggestionIndex === index}
                        className={`autocomplete-row ${selectedSuggestionIndex === index ? 'selected' : ''}`}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          handleSuggestionSelect(suggestion.text);
                        }}
                        onMouseEnter={() => setSelectedSuggestionIndex(index)}
                      >
                        <span className="suggestion-text">{suggestion.text}</span>
                        <span className="suggestion-frequency">{suggestion.frequency.toLocaleString()}</span>
                      </button>
                    ))
                  ) : (
                    <div className="autocomplete-row empty">No matching service requests found.</div>
                  )}
                </div>
              ) : null}

              {queryError ? <p className="mt-3 text-sm font-medium text-red-600">{queryError}</p> : null}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{String(t('search.tryExamples'))}</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries[language].map((example) => (
                  <button key={example} type="button" onClick={() => setProblem(example)} className="example-pill">
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-black text-slate-900">{String(t('story.title'))}</h2>
              <span className="badge-soft">{String(t('common.aiAssisted'))}</span>
            </div>
            <div className="space-y-4">
              {storySteps.map((step, index) => (
                <div key={`${step}-${index}`} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                    {index + 1}
                  </div>
                  <div className="pt-1 text-sm font-medium leading-6 text-slate-700">{step}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <p className="font-black text-slate-800">{String(t('service.demo'))}</p>
              <p className="mt-2">{String(t('service.demoTrust'))}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-4 sm:py-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: String(t('features.problemFirst.title')), body: String(t('features.problemFirst.description')) },
            { title: String(t('features.multilingual.title')), body: String(t('features.multilingual.description')) },
            { title: String(t('features.voice.title')), body: String(t('features.voice.description')) },
            { title: String(t('features.clearNextSteps.title')), body: String(t('features.clearNextSteps.description')) },
          ].map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="mt-4 text-lg font-black text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">How Sahaayak Search works</p>
          <div className="mt-6 flex flex-col gap-3 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>User Query</span>
            <span>↓</span>
            <span>Autocomplete</span>
            <span>↓</span>
            <span>Top 5 Popular Suggestions</span>
            <span>↓</span>
            <span>Sahaayak AI</span>
            <span>↓</span>
            <span>Government Service</span>
            <span>↓</span>
            <span>Next Steps</span>
          </div>
        </div>
      </section>

      {status ? <div className="container-shell pb-3 text-sm font-medium text-slate-600">{status}</div> : null}

      {result ? (
        <section className="container-shell py-8">
          <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 shadow-[0_16px_40px_rgba(16,185,129,0.12)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">{String(t('results.understanding'))}</p>
            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {String(t('results.youSaid'))}: {problem}
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              {String(t('results.weUnderstood'))}: <span className="font-black text-slate-900">{renderIntentLabel(result.intent)}</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {String(t('results.confidence'))}: {result.confidence.toFixed(2)}
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {result.nextSteps.map((step) => (
                <div key={step} className="rounded-2xl border border-emerald-200 bg-white/80 p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-2xl font-black text-slate-900">{String(t('results.relevantServices'))}</h3>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {matches.length > 0 ? (
                matches.map((match) => {
                  const service = allServices.find((item) => item.id === match.serviceId);
                  if (!service) return null;
                  const localizedName = service.localizedName?.[language] ?? service.name;
                  const localizedDescription = service.localizedDescription?.[language] ?? service.description;

                  return (
                    <article key={service.id} className="service-card">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <h4 className="text-xl font-black text-slate-900">{localizedName}</h4>
                        <span className="badge-soft">{String(t('common.demo'))}</span>
                      </div>
                      <p className="mb-4 text-sm leading-6 text-slate-600">{localizedDescription}</p>
                      <div className="space-y-2 text-sm leading-6 text-slate-700">
                        <p><span className="font-bold">{String(t('service.department'))}:</span> {service.department}</p>
                        <p><span className="font-bold">{String(t('service.category'))}:</span> {service.category}</p>
                        <p><span className="font-bold">{String(t('results.whyThisMayHelp'))}:</span> {String(t('service.demoTrust'))}</p>
                        <p><span className="font-bold">{String(t('service.online'))}:</span> {service.onlineAvailable ? String(t('service.available')) : String(t('service.offline'))}</p>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <Link href={`/services/${service.id}`} className="primary-button flex-1 justify-center">
                          {String(t('results.viewDetails'))}
                        </Link>
                        <button type="button" onClick={() => speakText(localizedDescription)} className="secondary-button">
                          {String(t('service.listen'))}
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                  {String(t('results.noMatch'))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

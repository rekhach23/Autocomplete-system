"use client";

import { useLanguage } from '@/components/language-provider';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container-shell py-12">
        <h1 className="text-4xl font-black text-slate-900">{String(t('about.title'))}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">{String(t('about.intro'))}</p>
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">{String(t('about.panelTitle'))}</h2>
          <p className="mt-4 text-slate-700">{String(t('about.panelBody'))}</p>
        </div>
      </div>
    </main>
  );
}

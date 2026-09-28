"use client";

import { useLanguage } from '@/components/language-provider';

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const steps = Array.isArray(t('howItWorks.steps')) ? (t('howItWorks.steps') as string[]) : [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container-shell py-12">
        <h1 className="text-4xl font-black text-slate-900">{String(t('howItWorks.title'))}</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <div key={`${step}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">{index + 1}</div>
              <h2 className="text-xl font-bold">{step}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

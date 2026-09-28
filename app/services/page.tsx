"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';
import { getAllServices } from '@/lib/services/repository';

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const services = getAllServices();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="container-shell flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-black tracking-[0.12em] text-slate-900">SAHAAYAK SEARCH</Link>
          <nav className="flex gap-6 text-sm font-semibold text-slate-700">
            <Link href="/">{String(t('nav.home'))}</Link>
            <Link href="/services">{String(t('nav.services'))}</Link>
            <Link href="/how-it-works">{String(t('nav.howItWorks'))}</Link>
            <Link href="/about">{String(t('nav.about'))}</Link>
          </nav>
        </div>
      </header>

      <section className="container-shell py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">{String(t('results.relevantServices'))}</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">{String(t('common.searchServices'))}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const localizedName = service.localizedName?.[language] ?? service.name;
            const localizedDescription = service.localizedDescription?.[language] ?? service.description;
            return (
              <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold">{localizedName}</h2>
                  {service.onlineAvailable ? <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">{String(t('service.online'))}</span> : null}
                </div>
                <p className="mb-4 text-sm text-slate-600">{localizedDescription}</p>
                <div className="space-y-2 text-sm text-slate-700">
                  <p><span className="font-semibold">{String(t('service.department'))}:</span> {service.department}</p>
                  <p><span className="font-semibold">{String(t('service.category'))}:</span> {service.category}</p>
                  <p><span className="font-semibold">{String(t('service.state'))}:</span> {service.state}</p>
                </div>
                <Link href={`/services/${service.id}`} className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                  {String(t('common.openService'))}
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

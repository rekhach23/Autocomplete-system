"use client";

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useLanguage } from '@/components/language-provider';
import { getServiceById } from '@/lib/services/repository';

export default function ServiceDetailPage() {
  const { language, t } = useLanguage();
  const params = useParams<{ id: string }>();
  const service = getServiceById(params.id);

  if (!service) {
    notFound();
  }

  const localizedName = service.localizedName?.[language] ?? service.name;
  const localizedDescription = service.localizedDescription?.[language] ?? service.description;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container-shell py-10">
        <Link href="/services" className="text-sm font-medium text-emerald-700">← {String(t('service.back'))}</Link>
        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">{service.category}</p>
              <h1 className="mt-2 text-4xl font-bold">{localizedName}</h1>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase text-amber-700">{String(t('service.demo'))}</span>
          </div>

          <p className="mt-5 max-w-3xl text-lg text-slate-700">{localizedDescription}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-500">{String(t('service.department'))}</p><p className="mt-2 font-medium">{service.department}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-500">{String(t('service.online'))}</p><p className="mt-2 font-medium">{service.onlineAvailable ? String(t('service.available')) : String(t('service.offline'))}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-500">{String(t('service.state'))}</p><p className="mt-2 font-medium">{service.state}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-500">{String(t('service.officialSource'))}</p><p className="mt-2 font-medium">{service.officialUrl}</p></div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">{String(t('service.requiredDocuments'))}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {service.requiredDocuments.map((document) => <li key={document}>{document}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{String(t('results.detailTitle'))}</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700">
                {service.applicationSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">{String(t('common.trustNote'))}</p>
            <p className="mt-2 text-slate-700">{String(t('service.demoTrust'))}</p>
          </div>
        </article>
      </div>
    </main>
  );
}

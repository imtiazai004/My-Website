import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowUpRight, FileText } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';
import { SOURCES } from '../data/source';

export default function SourcePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'Source — Soft Tech Solution',
    description:
      'Downloadable source code and repos from Soft Tech Solution: AI product video workflows, ecommerce data APIs and free product listings for online sellers. Download the ZIPs free — every entry links back to its original repository.',
    canonical: `${BUSINESS.websiteUrl}/source`,
  });

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />

      <Navbar />

      <main className="relative z-20 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; Back to Home
          </Link>

          <header className="mb-12 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              <Download size={12} /> Free downloads
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Source
            </h1>
            <p className="text-lg text-slate-600">
              Downloadable source code and repos from {BUSINESS.brandName} —
              the same tools shared in our posts, ready to download and use.
              Every entry links back to its original repository.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {SOURCES.map((entry) => (
              <article
                key={entry.slug}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    <Download size={11} /> {entry.badge}
                  </span>
                </div>
                <h2
                  className="mb-2 text-xl font-bold text-slate-900"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {entry.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-slate-600">
                  {entry.description}
                </p>
                <div className="mb-5 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <FileText size={13} /> {entry.meta}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={entry.zipUrl}
                    download={`${entry.slug}.zip`}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    <Download size={16} /> Download ZIP
                  </a>
                  <a
                    href={entry.originUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
                  >
                    View origin on GitHub <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            More source is on the way. Written by {BUSINESS.brandName} — we
            build websites, tools and applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

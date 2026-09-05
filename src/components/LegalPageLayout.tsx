import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  /** Optional single-paragraph, directly-quotable answer shown right under the intro — for AI answer engines and snippet extraction. */
  answer?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, description, lastUpdated, answer, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div
        className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-20 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; Back to Home
          </Link>

          <header className="mb-12">
            <div className="mb-4 w-fit rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              Legal
            </div>
            <h1 className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">{description}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
              Last updated: {lastUpdated}
            </p>
            {answer && (
              <p
                data-answer-block="true"
                className="mt-6 max-w-2xl rounded-xl border border-slate-900/10 bg-slate-900/[0.03] px-5 py-4 text-sm leading-relaxed text-slate-600"
              >
                {answer}
              </p>
            )}
          </header>

          <div className="space-y-4">{children}</div>
        </div>
      </main>
    </div>
  );
}

export function LegalSection({ title, children, highlighted = false }: { title: string; children: ReactNode; highlighted?: boolean }) {
  return (
    <section className={`rounded-2xl border p-6 md:p-8 ${highlighted ? 'border-brand-accent/25 bg-brand-accent/[0.06]' : 'border-slate-900/10 bg-slate-900/[0.03]'}`}>
      <h2 className="mb-3 text-base font-bold text-slate-900 md:text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

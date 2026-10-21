import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, MessageSquareCode } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/client-website-prompt-pack.pdf';

export default function PromptPackGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Prompt Pack — Build a Client Website in a Weekend (Free Guide)',
    description:
      'The 4 prompts behind every client website we ship: discovery, design brief, copy polish and QA. Copy-paste ready, plus a weekend build checklist.',
    canonical: `${BUSINESS.websiteUrl}/guides/client-website-prompt-pack`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Prompt Pack — Build a Client Website in a Weekend (Free Guide)',
      description:
        'The exact 4 AI prompts used to build client websites in a weekend: a discovery interview prompt, a design brief prompt, a copy polisher prompt, and a ruthless QA prompt — all copy-paste ready, with the weekend build checklist.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/client-website-prompt-pack`,
      datePublished: '2026-10-20',
      inLanguage: 'en',
    },
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
            to="/guides"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; All guides
          </Link>

          <header className="mb-10 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              <MessageSquareCode size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Prompt Pack I Use to Build a Client Website in a Weekend
            </h1>
            <p className="text-lg text-slate-600">
              Most AI-built websites look identical because the prompts behind
              them are identical. This guide gives you the exact 4 prompts we
              run on every client build — the discovery interview, the design
              brief, the copy polisher, and the QA gate — copy-paste ready, plus
              the weekend build checklist and the build roadmap that turns the
              pack into a finished custom website.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 8 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="The-Prompt-Pack-Client-Website-Guide.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
            >
              <Download size={18} /> Download PDF
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <BookOpen size={18} /> Open in new tab
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <iframe
              src={PDF_URL}
              title="The Prompt Pack Guide (PDF)"
              className="h-[70vh] min-h-[480px] w-full bg-white"
            />
          </div>

          <article className="mx-auto mt-14 max-w-3xl">
            <h2
              className="mb-6 text-2xl font-bold text-slate-900"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The full breakdown
            </h2>
            <div className="space-y-5 text-[17px] leading-relaxed text-slate-700">
              <p>
                Type &ldquo;build me a website&rdquo; into any AI tool and you
                get the same template everyone else got — the same hero, the
                same filler copy, the same &ldquo;welcome to our website&rdquo;
                energy. That is why most AI-built websites look identical: the
                prompts behind them are identical.
              </p>
              <p>
                We stopped improvising. Every client website we build now runs
                on the same 4 prompts, in the same order:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>The Discovery Interview</strong> — 12 questions, one
                  at a time, that pull the truth out of the business before any
                  design: the single action a visitor must take, the
                  customer&apos;s biggest fear, the proof, the competitor&apos;s
                  weak spot.
                </li>
                <li>
                  <strong>The Design Brief</strong> — turns those answers into
                  a selling structure: a hero headline that states the outcome,
                  the page order, a 3-color palette, typography, and the exact
                  call-to-action — mobile-first, no filler sections.
                </li>
                <li>
                  <strong>The Copy Polisher</strong> — rewrites everything so
                  it sells without sounding like an ad: headlines as outcomes,
                  features as benefits, every unprovable claim deleted.
                </li>
                <li>
                  <strong>The QA Gate</strong> — tests the finished site like a
                  customer on their phone at 11pm: the main action in under 3
                  taps, tappable phone numbers, nothing broken at 360px width,
                  PASS or FAIL with the exact fix.
                </li>
              </ol>
              <p>
                Discovery, brief, copy and QA used to take 10&ndash;14 hours
                per project. With the pack it is about 2 — which is how a client
                gets a first demo in 48 hours instead of next week.
              </p>
              <p>
                The prompts are the engine. The meal is the finished custom
                website — with 24/7 AI chatbot, WhatsApp Business integration,
                and booking and follow-up automation, the parts prompts
                can&apos;t do alone. The guide includes the full build roadmap:
                first draft with modern AI site builders, refined in code,
                deployed on Vercel or Netlify.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="The-Prompt-Pack-Client-Website-Guide.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                <Download size={18} /> Download the Guide
              </a>
            </div>
          </article>

          <p className="mt-8 text-center text-sm text-slate-500">
            Written by {BUSINESS.brandName} — we build websites, tools and
            applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

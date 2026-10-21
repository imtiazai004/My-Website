import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/ai-agent-safety-audit.pdf';

export default function AgentSafetyAuditGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Agent Safety Audit — Free Guide',
    description:
      'Free checklist: 10 guardrails to demand before any AI agent touches your business, from approval gates to audit trails. Plain English, no jargon.',
    canonical: `${BUSINESS.websiteUrl}/guides/ai-agent-safety-audit`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Agent Safety Audit — Free Guide',
      description:
        '10 guardrails to demand before any AI agent touches your business: sandboxed access, approval gates, secret masking, traffic inspection, audit trails, data boundaries and more.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/ai-agent-safety-audit`,
      datePublished: '2026-10-19',
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
              <ShieldCheck size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Agent Safety Audit
            </h1>
            <p className="text-lg text-slate-600">
              Your AI agent might be the biggest security hole in your
              business. This guide is the exact 10-point checklist to run
              before any AI agent touches your systems, your data, or your
              customers — sandboxed access, approval gates, secret masking,
              traffic inspection, audit trails, data boundaries, and more.
              Plain English, no jargon.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 8 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="The-Agent-Safety-Audit-Guide.pdf"
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
              title="The Agent Safety Audit (PDF)"
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
                Your AI agent might be the biggest security hole in your
                business.
              </p>
              <p>
                This month alone: Anthropic admitted its own agents bypassed
                paywalls and filed a false report. India&apos;s CERT-In caught
                test agents wandering into live systems, reading confidential
                records unnoticed. And Symantec found malware specifically
                hunting AI agent credentials.
              </p>
              <p>
                The problem isn&apos;t AI. It&apos;s deploying agents with no
                guardrails.
              </p>
              <p>
                So I put together The Agent Safety Audit — the exact checklist
                I run before any agent touches a business. Demand all 10:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Sandboxed access</strong> — the agent runs in a
                  bounded environment, never your whole system.
                </li>
                <li>
                  <strong>Permission boundaries</strong> — least-privilege
                  access, explicitly granted, nothing inherited.
                </li>
                <li>
                  <strong>Human approval gates</strong> — consequential actions
                  pause for a human &ldquo;yes&rdquo;.
                </li>
                <li>
                  <strong>Secret masking</strong> — API keys and credentials
                  never travel in plain text.
                </li>
                <li>
                  <strong>Traffic inspection</strong> — you can see everything
                  the agent sends out.
                </li>
                <li>
                  <strong>Data masking</strong> — customer PII is masked before
                  it reaches the model.
                </li>
                <li>
                  <strong>Full audit trail</strong> — every action logged in
                  language you can actually read.
                </li>
                <li>
                  <strong>Data boundaries</strong> — your business data is
                  never used for model training.
                </li>
                <li>
                  <strong>Kill switch</strong> — you can stop the agent
                  instantly, no ticket required.
                </li>
                <li>
                  <strong>Named human owner</strong> — one accountable person
                  for every deployed agent.
                </li>
              </ol>
              <p>
                Every custom AI app we build ships with all 10 guardrails by
                default. The complete guide walks through each one — why it
                matters, the real failure mode it prevents, and the exact
                question to ask your developer.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="The-Agent-Safety-Audit-Guide.pdf"
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

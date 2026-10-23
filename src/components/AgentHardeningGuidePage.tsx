import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/agent-hardening-guide.pdf';

export default function AgentHardeningGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'From Demo to Production — The AI Agent Hardening Guide (Free Guide)',
    description:
      'Why AI agent demos always work and production agents fail silently — and the six hardening layers that close the gap: guardrails, approval gates, observability, evals, fallbacks and recovery, and cost controls. Includes the hardened skeleton prompt, the business math, the step-by-step build roadmap and the 7-point pre-launch checklist.',
    canonical: `${BUSINESS.websiteUrl}/guides/agent-hardening-guide`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'From Demo to Production — The AI Agent Hardening Guide (Free Guide)',
      description:
        'The six layers between an AI agent demo and a production system a business can trust: scoped guardrails, approval gates for money actions, immutable observability, evals with a target score, fallbacks with human handoff, and cost controls with a kill switch — plus the build roadmap and pre-launch checklist.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/agent-hardening-guide`,
      datePublished: '2026-10-23',
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
              From Demo to Production: The AI Agent Hardening Guide
            </h1>
            <p className="text-lg text-slate-600">
              Every AI agent demo works — clean data, scripted tasks, a human
              smiling through the rough edges. Production is a different
              discipline: messy inputs, unscripted edge cases and failures
              that happen silently. This guide covers the six hardening
              layers that close the gap — guardrails, approval gates,
              observability, evals, fallbacks and cost controls — with the
              honest business math, a step-by-step roadmap to a hardened
              agent skeleton, and the 7-point pre-launch checklist.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 10 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Agent-Hardening-Guide.pdf"
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
              title="From Demo to Production — The AI Agent Hardening Guide (PDF)"
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
              <p>Every AI agent demo works. That&apos;s the problem.</p>
              <p>
                In the demo, the data is clean, the task is scripted, and the
                agent looks flawless. Then it meets production: messy inputs,
                edge cases nobody scripted, a tool that returns something
                unexpected at 2 AM — and it fails silently, in ways nobody
                notices until the damage is done.
              </p>
              <p>
                The distance between a demo and a production agent isn&apos;t
                the model. It&apos;s the engineering around the model. After
                building agents that run inside real businesses, I harden
                every build with the same six layers:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Guardrails</strong> — scoped permissions,
                  allowlists, sandboxed tools, least-privilege keys. The
                  agent can only touch what its job requires — nothing else
                  exists for it.
                </li>
                <li>
                  <strong>Approval gates</strong> — money and irreversible
                  actions never execute autonomously. The agent proposes, a
                  human approves with one tap, then it acts.
                </li>
                <li>
                  <strong>Observability</strong> — immutable logs and a trace
                  for every run, so &ldquo;what did the agent do?&rdquo;
                  always has an exact answer.
                </li>
                <li>
                  <strong>Evals</strong> — a fixed test set runs before every
                  change, against a target score. If a tweak makes the agent
                  worse, you know before your customers do.
                </li>
                <li>
                  <strong>Fallbacks &amp; recovery</strong> — retries,
                  graceful degradation, human handoff, undo where undo
                  exists. Failure is planned, not improvised.
                </li>
                <li>
                  <strong>Cost controls</strong> — per-run and per-day spend
                  ceilings, single-use payment instruments, and a kill switch
                  that actually kills.
                </li>
              </ol>
              <p>
                Skip these and the math turns ugly fast: one unsupervised
                refund or purchase at the wrong amount costs more than the
                approval gate that would have caught it — and a silent
                failure doesn&apos;t just lose an hour, it quietly compounds
                for days before anyone sees it.
              </p>
              <p>
                The guide goes layer by layer with the concrete mechanics —
                permission scopes and deny-by-default tool registries, the
                one-tap approval pattern and single-use virtual cards,
                append-only run logs and per-run traces, a fixed eval set
                with a written target score and disaster cases, the failure
                table you write before launch, and the per-run and per-day
                ceilings that bound a bad day. It finishes with the full
                roadmap — define the job and its scope, scaffold a hardened
                skeleton with v0, Lovable, Bolt or Replit, wire the model
                APIs properly, add observability and the approval channel,
                build the eval set from real cases, then deploy behind tight
                ceilings and loosen only as the logged track record earns
                it — plus the 7-point checklist: scoped permissions,
                approval gates, immutable logs, eval set, human fallback,
                cost ceiling, kill switch. Download it above and ship agents
                that survive production.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Agent-Hardening-Guide.pdf"
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

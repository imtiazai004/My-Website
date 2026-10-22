import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Sunrise } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/morning-briefing-agent.pdf';

export default function MorningBriefingGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Morning Briefing Agent — An AI Agent That Briefs You at 6 AM (Free Guide)',
    description:
      'The Morning Briefing Agent is the custom AI agent AI Soft Tech Solution builds for business owners: it collects overnight email, calendar, orders and invoices, ranks them (money waiting first), delivers one WhatsApp brief at 6 AM, and never acts without your YES. Full guide with the ranking prompt, the business math and the build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/morning-briefing-agent`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Morning Briefing Agent — An AI Agent That Briefs You at 6 AM (Free Guide)',
      description:
        'How the Morning Briefing Agent works: overnight collectors for email, calendar and orders, an LLM ranker that scores money waiting first, 6 AM WhatsApp delivery, and an approval lock — plus the exact ranking prompt and the step-by-step build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/morning-briefing-agent`,
      datePublished: '2026-10-22',
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
              <Sunrise size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Morning Briefing Agent: The AI Agent I Build That Briefs You
              Before Your Day Starts
            </h1>
            <p className="text-lg text-slate-600">
              I build AI agents for businesses. This one collects everything
              that happened overnight — email, messages, appointments, orders,
              unpaid invoices — ranks it by what it is worth to you, and lands
              on your WhatsApp at 6 AM as one short brief. It never sends,
              replies or pays on its own: every action waits for your YES.
              This guide explains the agent piece by piece, the exact ranking
              prompt, the business math, and the full build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 9 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Morning-Briefing-Agent-Guide.pdf"
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
              title="The Morning Briefing Agent Guide (PDF)"
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
                I build AI agents that brief you before your day starts.
              </p>
              <p>
                Yesterday, Anthropic launched Claude Duet — a proactive AI
                agent for professionals and small-business owners. It
                doesn&apos;t wait for you to ask questions. It watches your
                apps overnight, briefs you in the morning, and asks your
                approval before it touches anything sensitive.
              </p>
              <p>
                They built a whole product around one pain I hear from every
                business owner I work with: you start the day blind. 40+
                unread emails. WhatsApp messages from three time zones.
                Today&apos;s appointments in one app, pending orders in
                another, unpaid invoices in a third. Your first hour — every
                single day — burned just figuring out what matters.
              </p>
              <p>
                So instead of joining a waitlist for someone else&apos;s
                generic agent, I build the Morning Briefing Agent — wired
                into YOUR business:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>The Collectors</strong> — Gmail, Google Calendar and
                  your orders/invoices source pull everything that happened
                  overnight.
                </li>
                <li>
                  <strong>The Ranker</strong> — every item scored by one rule:
                  money waiting first, customers waiting second, routine
                  last — then drafted into one short brief.
                </li>
                <li>
                  <strong>The Delivery</strong> — one WhatsApp message at
                  6:00 AM, readable in five minutes with your coffee.
                </li>
                <li>
                  <strong>The Approval Lock</strong> — the agent NEVER sends,
                  replies or pays on its own. It lists what needs your
                  decision, drafts the action, and moves only when you reply
                  YES.
                </li>
              </ol>
              <p>
                The math: 45&ndash;60 minutes of morning triage a day is ~5
                hours a week, ~260 hours a year — about $6,500 of owner time
                at $25/hour. The agent cuts it to a 5-minute read. And the
                lead who messaged at midnight? He&apos;s in your 6 AM brief
                with a reply already drafted — answered before your
                competitors open their inbox.
              </p>
              <p>
                The guide includes the full build roadmap: the exact ranking
                prompt, the no-code route (Make or n8n + the Claude or OpenAI
                API + WhatsApp Cloud API) and the code route (Node/Python +
                Gmail and Calendar APIs + a cron on Vercel or Railway), the
                approval-lock wiring, and the 7-day test that tunes the brief
                to your business. Download it above and wake up briefed.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Morning-Briefing-Agent-Guide.pdf"
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

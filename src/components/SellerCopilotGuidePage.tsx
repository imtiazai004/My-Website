import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Bot } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';

const PDF_URL = '/guides/build-your-own-ai-seller-copilot.pdf';

export default function SellerCopilotGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'Build Your Own AI Seller Copilot — Free Guide',
    description:
      'Free step-by-step guide: turn your sales playbooks into an AI copilot that answers like a specialist. Pick your coding agent, build the app, go from basic to advanced. No coding required.',
    canonical: `${BUSINESS.websiteUrl}/guides/build-your-own-ai-seller-copilot`,
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
              <Bot size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Build Your Own AI Seller Copilot
            </h1>
            <p className="text-lg text-slate-600">
              Your sales knowledge, trapped in your head, is worth nothing
              until an AI can use it. This guide shows you how to turn your
              playbooks — pricing rules, product research, listing
              optimization — into an AI copilot that answers like a
              specialist, not a generic chatbot. Pick your coding agent, build
              the app step by step, go from basic to advanced. No coding
              required.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 11 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Build-Your-Own-AI-Seller-Copilot-Guide.pdf"
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
              title="Build Your Own AI Seller Copilot (PDF)"
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
                Sellers are paying $49–$99/month for tools that show them
                dashboards.
              </p>
              <p>
                But no dashboard ever answered the real question:{' '}
                <em>"okay, but what should I DO next?"</em>
              </p>
              <p>
                That's the gap. And you don't need another subscription to
                close it — you can build your own AI seller copilot. No
                coding. Here's the exact path:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Pick ONE niche</strong> and list the 10 questions
                  your copilot must answer. (e.g. TikTok Shop affiliates:
                  what to sell, what commission, who to partner with.)
                </li>
                <li>
                  <strong>Pick your coding agent</strong> — the AI that writes
                  the app for you. (For non-technical founders, start with
                  Lovable: idea to live link, zero setup. The giants — Claude,
                  ChatGPT, Google Antigravity — are brilliant coders, but
                  they're built for developers.)
                </li>
                <li>
                  <strong>Feed it your playbooks</strong> — plain-text files
                  with your product research method, your pricing rules, your
                  listing checklist.
                </li>
                <li>
                  <strong>Connect the AI chat to those playbooks</strong>, so
                  it answers like a specialist — not a generic chatbot.
                </li>
                <li>
                  <strong>Test it with 5 real questions</strong> from your own
                  business. Generic answer? Your playbook is thin. Fix the
                  input, not the AI.
                </li>
                <li>
                  <strong>Deploy it.</strong> You now have a live link — your
                  own tool, built in an afternoon.
                </li>
              </ol>
              <p>
                The complete guide covers which coding agent to pick (and which
                to avoid), the exact copy-paste prompt for every step,
                troubleshooting, and the advanced moves — live data, logins,
                turning it into a product you can sell.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Build-Your-Own-AI-Seller-Copilot-Guide.pdf"
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

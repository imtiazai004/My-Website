import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Gauge } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/account-health.pdf';

export default function AccountHealthGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Account-Health App (Free Guide)',
    description:
      'The app that watches a TikTok Shop Account Health Rating — live score and milestone distance, WhatsApp alerts before the freeze, violation breakdown, cancellation and dispatch gauges, and the policy-quiz recovery path. The illustrative slide math and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/account-health`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Account-Health App (Free Guide)',
      description:
        'The app that watches a TikTok Shop Account Health Rating: the live AHR dashboard, threshold alerts before the freeze, violation breakdown order by order, cancellation and dispatch monitors, policy-quiz recovery path, and restriction countdown — plus the illustrative slide math and the full vibe-coding build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/account-health`,
      datePublished: '2026-10-29',
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
              <Gauge size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Account-Health App
            </h1>
            <p className="text-lg text-slate-600">
              In July 2026, TikTok replaced violation points with the
              Account Health Rating: a score from 0 to 1,000, and every
              shop starts at 200. One bad week — a cancellation spike
              plus one serious violation — drops a 200-point shop to
              around 150, and at 150 the shop is blocked from new
              listings and mega campaigns for 7 days. This guide covers
              the app that watches the score so you don&apos;t have to:
              the live dashboard, threshold alerts, violation
              breakdown, cancellation and dispatch gauges, and the
              policy-quiz recovery path — plus the math and the full
              build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 3 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Account-Health-App.pdf"
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
              title="The Account-Health App (PDF)"
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
                In July 2026, TikTok Shop replaced its old violation
                points system for U.S. sellers with the Account Health
                Rating (AHR): a score from 0 to 1,000, based on your
                shop&apos;s activity over the last 180 days. Every shop
                starts at 200 points — and that starting number is a
                trap.
              </p>
              <p>
                Points come back slowly: you earn 4 points for every
                200 completed orders, capped at 20 points a week. Points
                leave fast: a single serious violation can cost 20 to
                30 points, and since 15 October 2026, a seller-fault
                cancellation rate above TikTok&apos;s threshold can
                cost up to 25 more. The milestones are brutal: at 150,
                100, or 50 points, your shop is blocked from creating
                new listings and enrolling in mega campaigns for 7, 14,
                or 28 days. At 0 points, the account may be permanently
                deactivated. Most sellers check their score after the
                restriction lands. By then the damage is done.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Live AHR dashboard</strong> — your current
                  score, your distance from each milestone (150, 100,
                  50, 0), and the trend — whether the score is climbing
                  or sliding, and why. One screen, checked in seconds.
                </li>
                <li>
                  <strong>Threshold alerts before the freeze</strong> —
                  a WhatsApp alert the moment your trajectory points at
                  a milestone, while you can still act — not after the
                  listing block.
                </li>
                <li>
                  <strong>Violation breakdown, order by order</strong> —
                  every deduction explained: which violation, which
                  order, how many points it cost. This turns a mystery
                  score into a fixable problem.
                </li>
                <li>
                  <strong>Cancellation and dispatch monitors</strong> —
                  two live gauges for the two most common point-losers:
                  seller-fault cancellation rate against TikTok&apos;s
                  threshold, and late dispatch rate against the 10%
                  enforcement line.
                </li>
                <li>
                  <strong>Policy-quiz recovery path</strong> — each
                  active violation mapped to its TikTok policy quiz,
                  with completion tracking and the score recovery each
                  quiz is worth.
                </li>
                <li>
                  <strong>Restriction countdown</strong> — if a
                  milestone is crossed, exactly what is blocked, for
                  how many days, and what the score must reach to get
                  out.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Why this matters
              </h3>
              <p>
                On TikTok Shop, the AHR is not a report card — it is
                the permission to grow. At 150 you cannot launch new
                products. At 100 you cannot run mega campaigns for two
                weeks. At 50 you are frozen for 28 days. At 0 the shop
                is gone. And the asymmetry is the whole story: losing
                50 points takes one bad week; earning 50 points back
                through orders alone takes 2,500 completed orders. The
                sellers who survive are not the ones who never get a
                violation. They are the ones who see it coming and fix
                fulfillment before the next deduction.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The business impact, with the math
              </h3>
              <p>
                Take a shop doing 50 orders a day at a $25 average order
                value — $1,250 a day in sales. Week one, the slide: a
                cancellation spike costs up to 25 points and a serious
                violation costs around 25 more. Score: 200 to about
                150, and the launch pipeline stops for a week while
                competitors keep launching. The climb back: recovering
                those 50 points through orders alone needs 2,500
                completed orders — 50 days at 50 orders a day. Policy
                quizzes speed it up, but only if the seller knows which
                quiz maps to which violation. These are illustrative
                figures to show the shape of the leak, not a client
                result.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The build roadmap
              </h3>
              <p>
                This is the kind of tool you can build with vibe coding,
                piece by piece: connect the shop through TikTok&apos;s
                official Partner API so the app reads real AHR,
                violation, order, cancellation, and dispatch data;
                describe the dashboard, gauges, alert engine, and
                recovery checklist in a prompt template; build with v0,
                Lovable, Bolt or Replit with the milestone logic (150 /
                100 / 50 / 0) coded in as the alert thresholds; wire
                threshold warnings to WhatsApp and email; add the
                recovery module mapping each violation category to its
                policy quiz; and deploy on Vercel or Netlify. The guide
                finishes with the launch checklist: you know your
                current score today, your distance from 150, 100, and
                50, your cancellation rate below threshold, your late
                dispatch rate below 10%, every active violation mapped
                to a quiz — and something alerts you before a
                milestone, not after. Download it above and stop
                running your shop on a score you are not watching.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Account-Health-App.pdf"
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

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, TrendingDown } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/competitor-price-watch.pdf';

export default function CompetitorPriceWatchGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'Competitor Price Watch (Free Guide)',
    description:
      'The app that tracks competitors prices — alerts you the moment a rival cuts a price, guards your margin with a floor, and reprices by your rules. The five pieces, the illustrative leak math, and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/competitor-price-watch`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Competitor Price Watch (Free Guide)',
      description:
        'The app that tracks competitors prices: the competitor tracker, price-change alerts, margin floor guard, auto-reprice engine, and price history reports — plus the illustrative leak math and the full vibe-coding build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/competitor-price-watch`,
      datePublished: '2026-10-27',
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
              <TrendingDown size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Competitor Price Watch
            </h1>
            <p className="text-lg text-slate-600">
              Your competitor dropped their price at 9 AM. You found out
              at 9 PM. In between, every shopper comparing the two
              listings saw one cheaper option — and it wasn&apos;t yours.
              This guide covers the app that closes that leak: the
              competitor tracker, price-change alerts, margin floor
              guard, auto-reprice engine, and price history reports —
              plus the math and the full build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 3 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Competitor-Price-Watch.pdf"
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
              title="Competitor Price Watch (PDF)"
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
                Your competitor dropped their price at 9 AM. You found
                out at 9 PM.
              </p>
              <p>
                In between, every shopper comparing the two listings saw
                one cheaper option — and it wasn&apos;t yours. That is
                the leak most sellers never see: competitors adjust
                prices all day, and a seller checking by hand only ever
                sees a snapshot of a moving target. By the time you
                notice the cut, the day&apos;s sales have already gone
                elsewhere. And the damage compounds — fewer conversions
                today means lower placement tomorrow.
              </p>
              <p>
                Manual price-checking has three leaks: it is slow,
                checking dozens of listings takes hours nobody has; it
                is late, you find out hours or days after shoppers
                already acted; and it is blind to the floor, because
                dropping your price to match without a margin guard can
                turn a recovered sale into a loss-making one.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Competitor Tracker</strong> — the listings
                  your customers compare you with, watched
                  continuously, not once a day.
                </li>
                <li>
                  <strong>Price-Change Alerts</strong> — the moment a
                  tracked listing changes price, you know what changed,
                  by how much, and where.
                </li>
                <li>
                  <strong>Margin Floor Guard</strong> — your cost and
                  minimum margin, set in writing. The app never reprices
                  below your floor, so matching a competitor never turns
                  into a loss-making sale.
                </li>
                <li>
                  <strong>Auto-Reprice Engine</strong> — your rules,
                  applied automatically: match the competitor, stay a
                  fixed amount below, or hold and alert only.
                </li>
                <li>
                  <strong>Price History and Reports</strong> — every
                  change logged, so over weeks you see the patterns: who
                  cuts on weekends, who discounts before holidays, which
                  products are price wars and which ones customers buy
                  regardless.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Why this matters
              </h3>
              <p>
                Price is the first thing a shopper compares, and on a
                marketplace it is often the only thing they compare
                before clicking. A seller who reacts a day late
                doesn&apos;t just lose a day&apos;s sales — they lose
                ranking, because marketplaces reward listings that
                convert. A price-watch system reacts in minutes,
                protects the margin while doing it, and turns pricing
                from a guessing game into a record you can read.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The business impact, with the math
              </h3>
              <p>
                A seller whose 10 bestsellers get undercut regularly,
                losing just 5 sales a day at a $25 average order, is
                watching about $3,750 a month walk to competitors.
                Recovering even half of that through faster reactions is
                roughly $1,875 a month back — and that counts only the
                recovered sales, not the ranking protection that comes
                with steady conversions. These are illustrative figures
                to show the shape of the leak, not a client result.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The build roadmap
              </h3>
              <p>
                This is the kind of tool you can build with vibe coding,
                piece by piece: describe the tracker first in a prompt
                template, build the dashboard with v0, Lovable, Bolt or
                Replit, add the alert layer, add the floor guard, add
                the reprice rules per product, connect official
                marketplace APIs where they exist (Amazon SP-API, eBay
                APIs, Etsy API, TikTok Shop Partner API), and deploy on
                Vercel or Netlify. The guide finishes with the launch
                checklist: your 10 bestsellers and their competitors
                listed, your floor set in writing per product, your
                reprice rule chosen per product, alerts on for every
                tracked change, price history reviewed weekly — and
                never a reprice below the floor, no matter how
                aggressive the competitor. Download it above and stop
                finding out about price cuts a day late.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Competitor-Price-Watch.pdf"
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

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, RotateCcw } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/amazon-return-rule.pdf';
const SLIDE_1_URL = '/guides/amazon-return-rule-cover.png';
const SLIDE_4_URL = '/guides/amazon-return-rule-fees.png';

export default function AmazonReturnRuleGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Amazon Return-Rule Dashboard (Free Guide)',
    description:
      'The app that saves Amazon sellers from losing dollars — a 7-day label clock on every FBM return, auto prepaid labels through the returns workflow, a returnless-refund guard, and fee-category alerts for the 31 October move. The illustrative $3,000-a-year refund math and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/amazon-return-rule`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Amazon Return-Rule Dashboard (Free Guide)',
      description:
        'The app being built for Amazon sellers that stops peak-season returns becoming forced refunds: the 7-day prepaid-label clock on every FBM return, auto labels through the returns workflow, the returnless-refund guard, and fee-category alerts for the 31 October move — plus the illustrative refund math and the full build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/amazon-return-rule`,
      datePublished: '2026-11-03',
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
              <RotateCcw size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Amazon Return-Rule Dashboard
            </h1>
            <p className="text-lg text-slate-600">
              I build an app that saves Amazon sellers from losing dollars.
              From 18 December 2026, every US seller-fulfilled return needs
              a prepaid label within 7 calendar days — or a full refund
              without return. And from 31 October, some ASINs move to
              different referral-fee categories. This guide covers the
              dashboard being built to watch both: the 7-day label clock,
              the auto prepaid labels, the returnless-refund guard, and the
              fee-category alerts — plus the math and the full build
              roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 5 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Amazon-Return-Rule-Dashboard.pdf"
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
              title="The Amazon Return-Rule Dashboard (PDF)"
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
                From 18 December 2026, every US return on a
                seller-fulfilled (FBM) order needs a prepaid return label
                within 7 calendar days of the return request — or a full
                refund without return.
              </p>
              <p>
                The old option is gone. A seller used to be able to give
                the buyer only a return address, so the buyer paid to ship
                the item back. That no longer qualifies. Miss the window
                and Amazon may issue a returnless refund: the buyer is
                refunded in full, the amount is deducted from the
                seller&apos;s balance, and the buyer keeps the product.
                The seller loses the money and the inventory in the same
                move. And a label sent through Buyer-Seller Messaging does
                not count — only a label issued through Amazon&apos;s
                returns workflow counts. Heavy and bulky items are
                excluded for now.
              </p>
              <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <img
                  src={SLIDE_1_URL}
                  alt="From 18 December, every return needs a prepaid label — the Amazon rule US seller-fulfilled sellers cannot afford to miss"
                  className="w-full"
                />
              </figure>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The second hit comes first: 31 October
              </h3>
              <p>
                From 31 October 2026, Amazon moves some ASINs into
                different referral-fee categories. Referral fees change on
                listings that look identical — the same title, the same
                photo, the same price, a different fee. A seller who does
                not check the Fee Preview report before the change lands
                finds out from the settlement, weeks later, when the money
                is already gone. A wrong category can be disputed through
                Selling Partner Support.
              </p>
              <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <img
                  src={SLIDE_4_URL}
                  alt="31 October: fees move too — some ASINs move to different referral-fee categories"
                  className="w-full"
                />
              </figure>
              <p>
                The two rules land in the same peak season, which is the
                point. October brings the fee change; December brings the
                label deadline; between them sits the busiest returns
                period of the year.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <p>
                I am building a custom app for Amazon sellers — the Amazon
                Return-Rule Dashboard. The seller connects their shop
                account, and the app watches both rules so the seller
                does not have to:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>7-day label clock</strong> — every open return
                  gets a clock the moment it arrives, counting down from 7
                  calendar days, listed oldest first so the return closest
                  to the deadline is always at the top.
                </li>
                <li>
                  <strong>Auto prepaid labels</strong> — labels issued
                  through Amazon&apos;s returns workflow automatically,
                  while the window is still open. Never through
                  Buyer-Seller Messaging, which does not count.
                </li>
                <li>
                  <strong>Returnless-refund guard</strong> — any return
                  approaching day 7 without a label is flagged in red,
                  with the order value at risk shown next to it. A
                  returnless refund is the most expensive outcome in the
                  whole returns process — money out, product gone — and it
                  is entirely preventable if someone is watching the
                  clock.
                </li>
                <li>
                  <strong>Fee-category change alerts</strong> — the app
                  watches the seller&apos;s ASINs against Amazon&apos;s
                  referral-fee categories and flags the moment one moves,
                  showing the old fee and the new fee.
                </li>
                <li>
                  <strong>True-cost view per return</strong> — each return
                  shows what it actually cost: the refund, the label, the
                  lost inventory where the product was not returned, and
                  the fee change where the ASIN moved.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The business impact, with the math
              </h3>
              <p>
                Here is the math, illustrative: 5 missed windows a month
                at a $50 average order is $250 a month refunded with no
                return — $3,000 a year, and the inventory is gone too.
                Catching even half of those windows pays for the
                dashboard many times over. Every return that comes back
                instead of becoming a returnless refund is a product that
                can be resold, not a product the buyer kept for free. The
                dashboard does not create sales. It stops a seller from
                giving away the sales they already made — and the products
                they already shipped.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The build roadmap
              </h3>
              <p>
                This guide is the blueprint on which the app is being
                worked from: write the prompt as the spec, build the
                front end and dashboard with a vibe-coding platform (v0,
                Lovable, Bolt or Replit), build the 7-day label clock
                first and the fee watch second, connect the real data
                through Amazon&apos;s Selling Partner API and the Fee
                Preview report, test the day-7 guard against three real
                returns at different ages, deploy on Vercel or Netlify,
                then run the app for one month beside the old method and
                compare the windows caught against the refunds that
                actually went out. The guide finishes with the checklist
                before 18 December: every open return on a 7-day clock;
                labels through the returns workflow only; Fee Preview
                checked before 31 October; fee-category alerts switched
                on. Download it above and put every return on a clock
                before the deadline lands.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Amazon-Return-Rule-Dashboard.pdf"
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

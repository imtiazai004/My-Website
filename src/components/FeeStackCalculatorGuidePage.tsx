import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Calculator } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/fee-stack-calculator.pdf';

export default function FeeStackCalculatorGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Fee-Stack Calculator (Free Guide)',
    description:
      'The app Imtiaz is building for an agency that shows marketplace sellers the fees their calculator misses — across TikTok Shop, Amazon, Etsy, and eBay. The verified fee stacks, the $50,000-month math, the multi-marketplace adapter architecture and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/fee-stack-calculator`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Fee-Stack Calculator (Free Guide)',
      description:
        'The app being built for an agency that shows marketplace sellers the fees their profit calculator misses: the verified fee stacks for TikTok Shop, Amazon, Etsy and eBay, the $50,000 month that keeps $1,125, the shared-core plus per-marketplace-adapter architecture, and the full build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/fee-stack-calculator`,
      datePublished: '2026-10-26',
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
              <Calculator size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Fee-Stack Calculator
            </h1>
            <p className="text-lg text-slate-600">
              Your profit calculator only sees part of the fees. A TikTok
              seller can do $50,000 in a month — and keep $1,125 of it —
              because the visible platform fees are only about 10% of
              revenue while the other 57% is scattered across dashboards no
              one reads together. This guide covers the app being built for
              an agency that closes that gap across TikTok Shop, Amazon,
              Etsy and eBay: the verified fee stacks, the math, the
              multi-marketplace architecture and the full build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 8 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Fee-Stack-Calculator.pdf"
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
              title="The Fee-Stack Calculator (PDF)"
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
              <p>Your profit calculator only sees part of the fees.</p>
              <p>
                A TikTok seller can do $50,000 in a month — and keep $1,125
                of it. That is not a guess. That is the math once every fee
                layer is counted: referral fees, transaction and processing
                fees, shipping, affiliate commissions, Shop Ads, content
                production, returns, and operations. The visible platform
                fees are only about 10% of revenue. The other 57% is
                scattered across dashboards no one reads together — so
                sellers price from the visible number and find out the truth
                only when the payout lands.
              </p>
              <p>
                And if you sell on Amazon, Etsy, or eBay too, it is the
                same problem with different names. Amazon&apos;s 15%
                referral fee plus fulfilment and storage. Etsy&apos;s
                transaction fee plus Offsite Ads that can double the fee on
                one order. eBay&apos;s final value fee charged on shipping
                and tax too. Every marketplace advertises a low headline
                fee and collects the real money elsewhere — and no
                calculator you already use sees all of it, because it was
                never built to.
              </p>
              <p>
                I am building this for an agency — a custom app for sellers
                called the Fee-Stack Calculator. One core, one module per
                marketplace — TikTok Shop, Amazon, Etsy, and eBay. The
                seller connects their shop account, and the app scans their
                real orders — pulling every cost layer into one live margin
                dashboard that shows true profit per order, per product, and
                per marketplace. Before a seller lists or reprices anything,
                the app runs the full stack against the proposed price and
                warns when that price loses money. Pricing stops being a
                guess and becomes a decision made with the whole stack in
                view.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Why the calculators sellers already use miss it
              </h3>
              <p>
                Most sellers already use a profit calculator. That is
                exactly the problem. The calculators they have fail in
                three ways: they are manual — the seller types numbers into
                a spreadsheet and gets a snapshot that is a month old
                within a week; they only see the visible fees, about 10%
                of revenue on TikTok Shop, while the other 57% lives in
                other dashboards the calculator never touches; and they
                report after the fact, telling you what last month&apos;s
                profit was instead of stopping you before you list a
                product at a price that loses money. Sell on more than one
                marketplace and the gap gets worse, not better — fees
                scattered across three platforms, three ads dashboards and
                three returns queues, and no single calculator that sees
                all of them.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The four fee stacks, verified
              </h3>
              <p>
                <strong>TikTok Shop — the full worked example.</strong>{' '}
                From Darkroom Agency&apos;s 2026 fee breakdown for a fashion
                brand doing $50,000 a month (1,250 orders at a $40 average
                order value): referral fee 8% ($4,000), transaction fees
                ($375), payment processing 2.0% ($1,000), shipping and
                fulfilment ~10% ($5,000), affiliate commissions ~10%
                blended ($5,000), TikTok Shop Ads ~20% ($10,000), content
                production ($4,000), returns and chargebacks ~5% ($2,500),
                operational overhead ($2,000) — total selling costs
                $33,875, or 67.75% of revenue. After a 30% product cost
                ($15,000), the seller keeps $1,125: a 2.25% net margin.
                The visible platform fees alone are only $5,375, or
                10.75%. The other $28,500 is the fee stack.
              </p>
              <p>
                <strong>Amazon — the published per-order example.</strong>{' '}
                A $29.99 kitchen gadget on FBA: referral fee 15% ($4.50),
                FBA fulfilment ~$4.75, fuel and logistics surcharge 3.5%
                (~$0.17), monthly storage ~$0.15 — about $9.57, or 32% of
                the price, before product cost, Sponsored Products ad spend
                and returns. Amazon&apos;s stack is dominated by the
                referral fee and the per-unit fulfilment fee, plus storage
                that triples in Q4.
              </p>
              <p>
                <strong>Etsy — the published per-order example.</strong>{' '}
                A $30 item with free shipping, US seller, no ads: listing
                fee $0.20, transaction fee 6.5% ($1.95), payment processing
                3% + $0.25 ($1.15) — $3.30, or 11% of the order. If that
                sale comes through an Offsite Ad at 15%, another $4.50
                goes to Etsy and the total becomes $7.80, or 26% of the
                order. The transaction fee applies to shipping too, and
                the processing fee to the full order total including tax.
              </p>
              <p>
                <strong>eBay — illustrative arithmetic from published
                rates.</strong>{' '}
                A $50 sale in a typical category: final value fee 13.6%
                ($6.80) plus a $0.40 per-order fee — $7.20, or 14.4% of the
                sale; add a 5% Promoted Listings rate and it becomes
                $9.70, or 19.4%. The trap: the final value fee is charged
                on the whole amount the buyer pays, including shipping
                and sales tax.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Unified cost model</strong> — every cost, from
                  every marketplace, stored the same way: per order, per
                  SKU, per marketplace, per month — so a SKU sold on two
                  platforms can be compared side by side.
                </li>
                <li>
                  <strong>Live margin dashboard</strong> — the headline
                  number is not revenue, it is true margin: what the
                  seller actually keeps, updated as orders, fees and ad
                  spend change.
                </li>
                <li>
                  <strong>Warn-before-you-price simulator</strong> — run
                  the full stack for a marketplace against a proposed
                  price before listing, and get warned when the price
                  loses money.
                </li>
                <li>
                  <strong>Cross-marketplace view</strong> — one screen
                  showing which platform actually keeps the most per order
                  on the same product, so the next batch of stock goes
                  where the margin is.
                </li>
                <li>
                  <strong>One fee adapter per marketplace</strong> —
                  TikTok Shop partner and seller APIs, Amazon&apos;s
                  Selling Partner API, the Etsy API, and eBay&apos;s
                  developer APIs, each translating that platform&apos;s
                  fees into the shared model, verified against one real
                  statement before the next adapter is added.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The business impact, with the math
              </h3>
              <p>
                Here is the $50,000 month, line by line: $4,000 referral
                fees, $375 transaction fees, $1,000 processing, $5,000
                shipping, $5,000 affiliate commissions, $10,000 ads,
                $4,000 content, $2,500 returns, $2,000 operations —
                $33,875 in selling costs, 67.75% of revenue. After product
                cost, $1,125 is left. A 2.25% margin on a $50,000 month.
              </p>
              <p>
                And here is what changes when the seller can see the
                stack — an illustrative scenario, not a real
                client&apos;s result: reprice the SKUs that were selling
                below true cost, cut the ad campaigns whose ROAS cannot
                cover real margin — and the same $50,000 month keeps
                $5,125 instead. Same sales. Same volume. Just decisions
                made with the numbers visible first. The calculator does
                not create sales. It stops a seller from giving away the
                sales they already have.
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
                Lovable, Bolt or Replit), build the shared core first and
                then one marketplace adapter at a time, connect the real
                data per marketplace, build the price simulator and test
                it against three real SKUs, deploy on Vercel or Netlify,
                then run the app for one month beside the old method and
                compare the margin figure against the actual payout. The
                guide finishes with the launch checklist: every fee layer
                listed per marketplace, one real month&apos;s statement
                totalled per marketplace, true profit per order computed
                for the three highest-volume SKUs, SKUs below true cost
                flagged for repricing, affiliate rates and ad budgets set
                against true margin, and the price simulator run on every
                new listing before it goes live. Download it above and
                see the whole stack before you price.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="Fee-Stack-Calculator.pdf"
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

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Megaphone } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/tiktok-shop-outreach-seller-guide.pdf';

export default function TikTokShopOutreachSellerGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'TikTok Shop Outreach — Seller Guide — Free Guide',
    description:
      'Free guide: build AffiliatePilot — a custom app that recruits TikTok Shop creators to sell your products through shoppable videos and LIVE streams, on commission, zero ad spend up front. No coding needed.',
    canonical: `${BUSINESS.websiteUrl}/guides/tiktok-shop-outreach-seller-guide`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'TikTok Shop Outreach — Seller Guide — Free Guide',
      description:
        'The AffiliatePilot playbook: a custom TikTok Shop affiliate outreach app — creator discovery and scoring, automated outreach sequences, sample tracking, commission plans, per-creator analytics. Built with vibe coding, no coding required.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/tiktok-shop-outreach-seller-guide`,
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
              <Megaphone size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              TikTok Shop Outreach &mdash; Seller Guide
            </h1>
            <p className="text-lg text-slate-600">
              A complete guide to a custom outreach app that recruits TikTok
              creators to sell your products &mdash; through shoppable videos
              and LIVE streams, on commission, with zero ad spend up front.
              For online sellers, small businesses and D2C brands.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF &middot; 6 pages &middot; English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="TikTok-Shop-Outreach-Seller-Guide.pdf"
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
              title="TikTok Shop Outreach — Seller Guide (PDF)"
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
                If you sell on TikTok Shop, you already know the hard truth:
                listing a product is not the same as selling it. The For You
                page rewards creator-made videos and LIVE streams &mdash; and
                one seller, no matter how hard they post, cannot produce
                enough content alone.
              </p>
              <p>
                This guide shows you the gap, the custom application that
                closes it, what it is worth to your business, and the exact
                step-by-step roadmap to build it yourself with vibe coding.
              </p>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                1. The Gap: Buried on TikTok Shop
              </h3>
              <p>
                You did everything right &mdash; listed the products, wrote
                the titles, uploaded the photos. And still, the orders
                trickle. Here is why:
              </p>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Listings drown; creator videos float.</strong>{' '}
                  TikTok&rsquo;s algorithm pushes shoppable videos and LIVE
                  streams made by creators &mdash; not static seller listings
                  sitting in a catalog.
                </li>
                <li>
                  <strong>One seller cannot make enough content.</strong>{' '}
                  Winning on TikTok Shop is a volume game: hooks, trending
                  sounds, demos, unboxings, replies to comments. A solo seller
                  caps out at a few videos a week; the algorithm wants dozens.
                </li>
                <li>
                  <strong>Thousands of small creators want products to
                  promote.</strong>{' '}
                  They are actively hunting for products they can earn
                  commission on &mdash; but they cannot promote what they have
                  never heard of. The match never happens because nobody
                  reaches out.
                </li>
                <li>
                  <strong>Ads are a treadmill.</strong> Paid traffic stops the
                  second you stop paying. Creator content keeps selling for
                  months after it is posted.
                </li>
              </ul>
              <p>
                Benchmark estimates for 2026 put the average TikTok Shop
                affiliate commission at around 13%, with open collaborations
                typically at 10&ndash;15% and targeted deals at 15&ndash;25%
                or more for proven creators. Beauty and fashion sit at the top
                (15&ndash;30%); electronics at the bottom (5&ndash;13%). LIVE
                promoters often command 20&ndash;30%. You set the rate &mdash;
                you are never locked into a platform-fixed number.
              </p>
              <p>
                The gap is not your product. The gap is distribution &mdash;
                and on TikTok Shop, distribution means creators.
              </p>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                2. The Solution: A Custom Affiliate Outreach App
              </h3>
              <p>
                Doing outreach by hand &mdash; spreadsheets, DMs, lost sample
                parcels &mdash; breaks the moment you pass twenty creators.
                The answer is a custom application, built for your business: a
                command center that finds creators, runs your outreach, and
                tracks every sale. We call the concept{' '}
                <strong>AffiliatePilot</strong>.
              </p>
              <p>What the app does, piece by piece:</p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Creator discovery and scoring.</strong> The app
                  finds TikTok creators by niche, follower band, and
                  engagement rate &mdash; then scores each one for fit with
                  your product, so you contact the right 30 instead of
                  guessing at 300.
                </li>
                <li>
                  <strong>Automated outreach sequences.</strong> Personalized
                  invitation messages go out on a schedule, with automatic
                  follow-ups. Every reply lands in one inbox &mdash; no creator
                  is ever lost in a DM pile again.
                </li>
                <li>
                  <strong>Sample shipment tracking.</strong> You see exactly
                  who received a free sample, who posted, and who went quiet.
                  Samples to posting creators are inventory that sells itself;
                  samples to silent ones get cut off.
                </li>
                <li>
                  <strong>Commission plan management.</strong> Open
                  collaborations at your published rate plus targeted plans
                  with custom, higher rates for proven winners &mdash; all
                  managed from one panel, synced with TikTok Shop Seller
                  Center (seller.tiktok.com).
                </li>
                <li>
                  <strong>Per-creator analytics and live feed.</strong> Every
                  creator&rsquo;s GMV, orders, and conversion rate on one
                  dashboard, plus a live activity feed of affiliate sales as
                  they happen. Your weekly review becomes: raise the winners,
                  cut the silent, recruit lookalikes.
                </li>
              </ol>
              <p>
                This is not a plugin you rent or a spreadsheet you babysit
                &mdash; it is your application, built around your products,
                your margins, and your creators. That is the kind of system AI
                Soft Tech Solution builds.
              </p>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                3. Why This Matters
              </h3>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Creator content converts better than brand
                  posts.</strong>{' '}
                  A real person demoing your product beats a polished ad every
                  time &mdash; it looks like a recommendation, not a
                  commercial.
                </li>
                <li>
                  <strong>You pay only for results.</strong> Commission costs
                  you nothing until a sale completes. There is no ad-spend
                  risk: no clicks bought, no impressions wasted.
                </li>
                <li>
                  <strong>One good video can move hundreds of units.</strong>{' '}
                  A single creator video catching the algorithm can outsell a
                  month of your own posting &mdash; overnight.
                </li>
                <li>
                  <strong>Your data, your pipeline.</strong> With your own
                  app, every creator, message, sample, and sale lives in one
                  system you control &mdash; nothing lost in spreadsheets or
                  forgotten DMs, and the whole operation keeps running while
                  you sleep.
                </li>
                <li>
                  <strong>Social proof at scale.</strong> Twenty creators
                  posting about your product is twenty testimonials working for
                  you around the clock, in front of audiences you could never
                  reach alone.
                </li>
              </ul>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                4. Business Impact: The Math
              </h3>
              <p>
                A $20 product at 15% commission ($3/sale): 25 creators &times;
                4 sales a week = 400 extra sales a month.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left text-[15px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600">
                      <th className="px-4 py-3 font-semibold"></th>
                      <th className="px-4 py-3 font-semibold">
                        With your outreach app
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Equivalent TikTok ads (approx.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        Extra sales per month
                      </td>
                      <td className="px-4 py-3">400</td>
                      <td className="px-4 py-3">400</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        Revenue from those sales
                      </td>
                      <td className="px-4 py-3">$8,000</td>
                      <td className="px-4 py-3">$8,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        Marketing cost
                      </td>
                      <td className="px-4 py-3">
                        $1,200 (commission, paid after sale)
                      </td>
                      <td className="px-4 py-3">
                        $1,600&ndash;$2,400 (paid up front)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        You keep
                      </td>
                      <td className="px-4 py-3">
                        approx. $6,800, zero paid in advance
                      </td>
                      <td className="px-4 py-3">
                        approx. $5,600&ndash;$6,400, cash first
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The ad-spend figures are rough planning estimates &mdash; your
                mileage will vary &mdash; but the structural advantage does
                not: affiliates get paid from revenue that already happened;
                ads demand cash before a single sale. And beyond the math:
              </p>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>Follower spillover</strong> &mdash; creator audiences
                  discover your brand and your Shop, not just the one product.
                </li>
                <li>
                  <strong>Compounding</strong> &mdash; videos keep selling for
                  months; every new creator stacks on the last.
                </li>
              </ul>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                5. Build It Step by Step with Vibe Coding
              </h3>
              <p>
                No coding needed: describe the app in plain English, let an AI
                builder generate it, and connect it to TikTok Shop.
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Write the app idea as a plain-English
                  prompt.</strong>{' '}
                  Start with a clear description &mdash; copy this prompt into
                  your builder:
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-4 font-mono text-[13px] leading-relaxed text-slate-100">
{`Build a web app called AffiliatePilot — a TikTok Shop affiliate outreach
command center for online sellers. Dark modern dashboard with: (1) overview
stat cards showing creators contacted, active affiliates, units sold, and
commission paid; (2) a creator discovery list with niche tags, follower counts,
and engagement rates, each with an Invite button; (3) an outreach pipeline with
three stages — Contacted, Sample Sent, Active; (4) a commission plan panel with
a rate slider from 5 to 30 percent and toggles for open collaboration; (5) a
live activity feed of affiliate sales. Mobile-friendly, single page.`}
                  </pre>
                </li>
                <li>
                  <strong>Pick a vibe-coding tool.</strong> Paste it into
                  v0.dev, Lovable, Bolt, or Replit &mdash; then ask the AI to
                  fix anything that looks off.
                </li>
                <li>
                  <strong>Build the screens.</strong> Make sure these four
                  screens work: the dashboard (stats + live feed), the creator
                  list (search, filters, Invite buttons), the pipeline
                  (Contacted &rarr; Sample Sent &rarr; Active), and commission
                  settings (rate slider, toggle). Ask the builder to wire
                  Invite buttons into the pipeline.
                </li>
                <li>
                  <strong>Connect TikTok Shop.</strong> Link the app to TikTok
                  Shop Seller Center (seller.tiktok.com) so products, orders,
                  and per-creator sales flow in automatically. Keep API
                  credentials server-side.
                </li>
                <li>
                  <strong>Deploy it free.</strong> Ship the app on Vercel or
                  Netlify &mdash; both deploy directly from the builder or a
                  git push, free to start, with a live URL in minutes. Connect
                  your own domain later when it earns its keep.
                </li>
                <li>
                  <strong>Test with 5 creators, then scale.</strong> Invite
                  five creators, ship their samples, and watch the pipeline
                  work. Fix what feels clunky, then scale to 30, then 100.
                </li>
              </ol>

              <h3
                className="pt-4 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                6. Quick-Start Checklist
              </h3>
              <ul className="list-disc space-y-3 pl-6">
                <li>
                  App idea written as a plain-English prompt (use the template
                  in this guide).
                </li>
                <li>First prototype built in v0, Lovable, Bolt, or Replit.</li>
                <li>
                  Dashboard, creator list, pipeline, and commission screens
                  working.
                </li>
                <li>
                  TikTok Shop Seller Center connected &mdash; products and
                  order data flowing.
                </li>
                <li>
                  Commission set at a competitive 15&ndash;20% for the open
                  collaboration.
                </li>
                <li>
                  30 creators scored and shortlisted in the app &mdash; niche
                  fit, roughly 10k&ndash;200k followers.
                </li>
                <li>Outreach sequence turned on; first 20 invitations sent.</li>
                <li>
                  Free samples shipped to every creator who replied with
                  interest.
                </li>
                <li>
                  Per-creator dashboard reviewed weekly (GMV, orders,
                  conversion).
                </li>
                <li>
                  Top 5 creators moved to targeted plans with higher rates
                  &mdash; then scale what wins.
                </li>
              </ul>

              <p>
                The complete 6-page guide includes the full copy-paste prompt
                template and the quick-start checklist. Download it free below.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="TikTok-Shop-Outreach-Seller-Guide.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                <Download size={18} /> Download the Guide
              </a>
            </div>
          </article>

          <p className="mt-8 text-center text-sm text-slate-500">
            Written by {BUSINESS.brandName} &mdash; we build websites, tools
            and applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

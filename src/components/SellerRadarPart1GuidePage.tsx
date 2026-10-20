import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Radar } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/sellerradar-part-1.pdf';

export default function SellerRadarPart1GuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'SellerRadar Part 1 — TikTok Shop Product Research (Free Guide)',
    description:
      'Part 1 of the SellerRadar guide: a custom TikTok Shop research app — the Product Finder (rank products by sales velocity, rating and price) and the Shop & Competitor X-Ray (gaps, ratings, service metrics). Filters, sample X-ray and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/sellerradar-part-1`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'SellerRadar Part 1 — TikTok Shop Product Research (Free Guide)',
      description:
        'How SellerRadar (a custom research app by AI Soft Tech Solution) finds winning TikTok Shop products and X-rays competitor shops: filters by region, price, rating, units sold and velocity, plus competitor gap analysis. Part 1 of 2.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/sellerradar-part-1`,
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
              <Radar size={12} /> Free guide — Part 1 of 2
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              SellerRadar Part 1: Find What to Sell and Who You&apos;re Up
              Against
            </h1>
            <p className="text-lg text-slate-600">
              Most TikTok Shop sellers guess — they scroll, copy a big shop and
              hope. This guide covers the first two modules of SellerRadar, the
              custom research app we built for TikTok Shop sellers: the Product
              Finder and the Shop &amp; Competitor X-Ray — filters, a sample
              X-ray, the gap list, and the full build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 8 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="SellerRadar-Part-1-Guide.pdf"
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
              title="SellerRadar Part 1 Guide (PDF)"
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
                Most TikTok Shop sellers pick products by scrolling. Then they
                wonder why nothing sells.
              </p>
              <p>
                Here&apos;s the pattern we keep seeing: a seller watches three
                viral videos, copies what a big shop is selling, lists it —
                and discovers (too late) that the product peaked weeks ago, the
                margins were dead, and the &ldquo;big&rdquo; shop they copied
                was coasting on one old video.
              </p>
              <p>
                Guessing is not a strategy. So we built SellerRadar — a custom
                research app that runs the same 6-step pipeline every time.
                Part 1 covers the first two modules, because product choice is
                the 80% decision: a great video can&apos;t save a dead product.
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>The Product Finder</strong> — filters the TikTok Shop
                  catalog by region, price band, rating floor, units sold and
                  sales velocity. You feed it a category, a price range and a
                  country; it returns a ranked shortlist of 10&ndash;20
                  products that are accelerating — not just big. A sample
                  filter recipe: UK, &pound;5&ndash;&pound;25, rating 4.5+,
                  500+ units sold in 30 days, positive 7-day velocity.
                </li>
                <li>
                  <strong>The Shop &amp; Competitor X-Ray</strong> — takes any
                  rival shop and returns a one-page X-ray card: product count,
                  ratings, service metrics and sales performance, plus the gap
                  list — what they don&apos;t sell, who they don&apos;t serve,
                  where they&apos;re weak. The rule: never copy a
                  competitor&apos;s product blindly. Copy their weakness.
                </li>
              </ol>
              <p>
                Done by hand, this research takes most sellers 2&ndash;3 hours
                a day — 60 to 90 hours a month. SellerRadar compresses it into
                a 10-minute morning brief. And it stops the most expensive
                beginner mistake: picking a product (and later, creators) by
                loudness instead of evidence.
              </p>
              <p>
                The guide includes the full build roadmap: a coding agent, a
                TikTok Shop data source (honest note: the data layer is usually
                paid), the two starter research prompts, a simple dashboard,
                and deployment. Part 2 — tomorrow — adds the Viral Video
                Finder, the Creator Matcher, the Hook Decoder and the Action
                Plan Generator.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="SellerRadar-Part-1-Guide.pdf"
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

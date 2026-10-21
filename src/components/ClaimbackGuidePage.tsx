import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Wallet } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/claimback.pdf';

export default function ClaimbackGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'ClaimBack — The FBA Reimbursement Finder (Free Guide)',
    description:
      'ClaimBack finds lost, damaged and miscounted Amazon FBA units, builds the claim with evidence and tracks it to payout. Free guide with the build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/claimback`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'ClaimBack — The FBA Reimbursement Finder (Free Guide)',
      description:
        'How ClaimBack (a custom app by Soft Tech Solution) recovers the $2,000–$8,000 in FBA reimbursements Amazon owes most sellers: report pulling, mismatch auditing, claim case building and payout tracking — plus the step-by-step build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/claimback`,
      datePublished: '2026-10-21',
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
              <Wallet size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ClaimBack: The App I Build That Finds the Money Amazon Owes FBA
              Sellers
            </h1>
            <p className="text-lg text-slate-600">
              I build apps for online sellers. ClaimBack is the one that finds
              money that is already yours: it pulls your FBA inventory and
              shipment reports, flags every unit Amazon lost, damaged or
              miscounted, builds the claim case with evidence, and tracks it
              to payout. This guide explains the app piece by piece, the
              business math, and the full build roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 9 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="ClaimBack-FBA-Reimbursement-Guide.pdf"
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
              title="ClaimBack Guide (PDF)"
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
                I build apps for online sellers. This one might be the most
                satisfying of all — it finds money that is already yours.
              </p>
              <p>
                Here&apos;s something most Amazon FBA sellers never hear: when
                Amazon loses, damages or miscounts your inventory, Amazon owes
                you a reimbursement. It is in their own policy. What they
                don&apos;t do is tell you. No email, no alert. The money just
                sits inside your reports, unclaimed.
              </p>
              <p>
                Audits of FBA accounts keep finding the same thing: on a
                catalog doing $500K a year, unclaimed reimbursements typically
                run $2,000 to $8,000. Plus a second, quieter leak — a
                $2&ndash;$5 processing fee on every returned unit that most
                sellers never even track.
              </p>
              <p>
                Nobody claims it because checking by hand means lining up
                inventory, shipment and returns reports line by line. Hours of
                spreadsheet pain. So we built ClaimBack — a custom app that
                does the audit for you:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Report Puller</strong> — pulls your FBA inventory and
                  shipment reports from Seller Central.
                </li>
                <li>
                  <strong>Mismatch Auditor</strong> — lines them up and flags
                  every lost, damaged, miscounted or phantom-returned unit,
                  with the evidence attached.
                </li>
                <li>
                  <strong>Case Builder</strong> — turns each flag into a
                  ready-to-file claim case, in the format Amazon wants.
                </li>
                <li>
                  <strong>Payout Tracker</strong> — follows every claim from
                  filed to paid, and totals the money recovered.
                </li>
              </ol>
              <p>
                The math is the best part. Recovering even half of what is
                owed is $1,000&ndash;$4,000 a year of pure margin. At a 15% net
                margin, you would need roughly $26,000 in extra sales to earn
                the same profit. This money needs no ads, no ranking, no
                discounts. It is already yours — Amazon is just holding it.
              </p>
              <p>
                The guide includes the full build roadmap: the exact prompts
                to scaffold the app in a vibe-coding builder, teach it to read
                your Seller Central reports, add the case builder and the
                returns-fee tracker, and deploy it to a live link — with the
                SP-API connection as the advanced step. Download it above and
                run your first audit this week.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="ClaimBack-FBA-Reimbursement-Guide.pdf"
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

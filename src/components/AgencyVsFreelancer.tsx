import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';

// Pricing checked against this site's own published facts (see public/llms.txt) —
// keep this date current whenever those facts change, same discipline as the
// competitor comparison pages on softclipper.pro.
const CHECKED = 'September 2026';

const ROWS = [
  { f: 'Pricing model', a: 'Fixed price, agreed in a written proposal before work starts', b: 'Usually hourly or per-task — final cost often moves with scope' },
  { f: 'Skills covered under one contract', a: 'Full-stack, mobile, AI/LLM integration, cloud/DevOps and API work together', b: "Typically one person's specialty — extra skills mean extra freelancers to coordinate" },
  { f: 'Continuity risk', a: 'Not a single point of failure', b: 'Illness, other clients or a change of plans can stall the whole project' },
  { f: 'NDA & IP terms', a: 'NDA signed before any confidential discussion; contracts assign 100% IP to the client', b: 'Varies by individual — often needs to be negotiated separately' },
  { f: 'Response time', a: 'Under 24 hours', b: 'Varies with the freelancer\'s other commitments' },
  { f: 'Typical timeline', a: 'Quoted upfront — landing page 1-2 weeks, full web app 4-8 weeks, enterprise system 3-6 months', b: 'Estimated, but can slip if the freelancer is juggling other clients' },
  { f: 'Post-launch support', a: '30 days included free on every project', b: 'Usually ends at delivery unless separately agreed' },
  { f: 'Best for', a: 'A multi-discipline project you want one team accountable for, start to finish', b: 'A small, narrowly-scoped task where one specialist is genuinely all you need' },
];

const FAQS = [
  {
    q: 'Is a freelancer cheaper than an agency?',
    a: `For one small, well-defined task, often yes on an hourly basis. But a project that needs full-stack development, mobile, AI integration and cloud infrastructure usually means hiring and coordinating several freelancers — and that coordination time is a real cost. ${BUSINESS.brandName} quotes one fixed price that covers the whole scope.`,
  },
  {
    q: 'What happens if my freelancer becomes unavailable mid-project?',
    a: 'That is the core risk of a single-person engagement — illness, a higher-paying client, or simply disappearing can stall work with no easy way to recover it. A team-based engagement is built to not depend on any one person\'s availability.',
  },
  {
    q: `Is ${BUSINESS.brandName} a big agency or a small team?`,
    a: 'It runs as a lean, founder-led team rather than a large agency with account managers — you get direct access to the people actually building, with the contract and process structure (fixed price, NDA, IP assignment, 30 days of post-launch support) that a solo freelancer engagement typically doesn\'t formalise.',
  },
  {
    q: 'When does hiring a freelancer make more sense?',
    a: 'When the task is small, narrowly scoped, and squarely inside one person\'s specialty — a quick script, a single bug fix, a one-off design tweak. For that kind of work, a good freelancer is often the faster, cheaper choice.',
  },
];

export default function AgencyVsFreelancer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: `${BUSINESS.brandName} vs Hiring a Freelancer`,
    description: `An honest comparison of hiring ${BUSINESS.brandName} versus a freelancer: fixed-price scoped delivery with NDA and IP assignment built in, versus hourly, single-person work. Checked ${CHECKED}.`,
    canonical: `${BUSINESS.websiteUrl}/compare/agency-vs-freelancer`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.websiteUrl },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Agency vs Freelancer',
              item: `${BUSINESS.websiteUrl}/compare/agency-vs-freelancer`,
            },
          ],
        },
      ],
    },
  });

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div
        className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-20 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; Back to Home
          </Link>

          <header className="mb-12 max-w-2xl">
            <div className="mb-4 w-fit rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              Compare
            </div>
            <h1 className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {BUSINESS.brandName} vs hiring a freelancer
            </h1>
            {/* "answer" flags this as the citable, self-contained lead for
                bots that can't run JS — kept 20-90 words, same convention as
                every other page on this site. */}
            <p className="answer text-base leading-relaxed text-slate-600">
              Both can build your product. The real difference is structure: {BUSINESS.brandName} is a
              fixed-price engagement covering full-stack, mobile, AI and cloud work under one NDA-backed
              contract with 30 days of post-launch support, while a freelancer is usually one person, billed
              hourly, whose availability and skill coverage are their own. Choose the freelancer for a small,
              narrowly-scoped task; choose the team for anything bigger than one person's specialty.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
              Figures checked {CHECKED} — from this site's own published facts, not third-party data.
            </p>
          </header>

          <section className="mb-14">
            <h2 className="mb-2 text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Side by side
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              A freelancer's terms vary person to person — the figures on that side describe common industry
              patterns, not any specific individual.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-900/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-900/10 bg-slate-900/[0.03]">
                    <th className="p-4 font-bold text-slate-900">&nbsp;</th>
                    <th className="p-4 font-bold text-slate-900">{BUSINESS.brandName}</th>
                    <th className="p-4 font-bold text-slate-900">A typical freelancer</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.f} className="border-b border-slate-900/[0.06] last:border-0">
                      <td className="p-4 font-semibold text-slate-900 align-top">{r.f}</td>
                      <td className="p-4 text-slate-600 align-top">{r.a}</td>
                      <td className="p-4 text-slate-600 align-top">{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-900/10 bg-slate-900/[0.03] p-6 md:p-8">
              <h2 className="mb-4 text-lg font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Where a freelancer is the better choice
              </h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">The task is small and narrow.</strong> A quick script, one bug fix, a single design tweak — a specialist can be the faster route.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">Budget is very tight.</strong> An hourly rate for a few hours of work can undercut any fixed-scope quote.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">You already know exactly what you want built.</strong> Less need for the discovery/scoping process a larger engagement includes.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/[0.06] p-6 md:p-8">
              <h2 className="mb-4 text-lg font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Where {BUSINESS.brandName} is the better choice
              </h2>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">The project spans multiple disciplines.</strong> Full-stack, mobile, AI/LLM and cloud infrastructure covered under one contract, not coordinated across several people.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">You need continuity guaranteed.</strong> Delivery isn't tied to one person's availability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">IP and confidentiality need to be formal.</strong> NDA before any confidential discussion, and every contract assigns 100% IP to the client — written in, not negotiated case by case.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                  <span><strong className="text-slate-900">You want the price fixed upfront.</strong> One proposal, one price, agreed before work starts — no hourly meter running.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Common questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-slate-900/10 bg-slate-900/[0.03] p-6">
                  <p className="mb-2 text-sm font-semibold text-slate-900">{faq.q}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-brand-accent/25 bg-brand-accent/[0.06] p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Not sure which fits your project?
            </h2>
            <p className="mb-6 text-sm text-slate-600">
              A free 30-minute discovery call is the fastest way to find out — no commitment either way.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(26,127,230,0.3)] transition-all hover:bg-blue-400 hover:shadow-[0_0_40px_rgba(26,127,230,0.5)]"
            >
              Book a discovery call <ArrowRight className="h-4 w-4" />
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

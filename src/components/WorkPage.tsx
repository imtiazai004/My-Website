import { useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, MonitorPlay } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { PROJECTS } from '../data/projects';
import { DEMO_APPS } from '../data/demos';
import { BUSINESS, FOUNDER_JSONLD, ORGANIZATION_JSONLD } from '../config/business';
import { usePageSeo } from '../lib/seo';
import { ProjectVisual, StatusBadge } from './work/ProjectIcon';
import { ProjectLinks } from './work/ProjectLinks';

const Footer = lazy(() => import('./Footer'));

const CANONICAL = `${BUSINESS.websiteUrl}/work`;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_JSONLD,
    FOUNDER_JSONLD,
    {
      '@type': 'CollectionPage',
      '@id': `${CANONICAL}#page`,
      url: CANONICAL,
      name: `Our work — ${BUSINESS.brandName}`,
      about: { '@id': `${BUSINESS.websiteUrl}/#organization` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${CANONICAL}#${p.slug}`,
          item: {
            '@type': 'SoftwareApplication',
            name: p.title,
            description: p.summary,
            applicationCategory: p.category,
            creator: { '@id': `${BUSINESS.websiteUrl}/#organization` },
            ...(p.links?.live?.startsWith('http') ? { url: p.links.live } : {}),
          },
        })),
      },
    },
  ],
};

export default function WorkPage() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  usePageSeo({
    title: `Our Work — ${PROJECTS.length} Real Products & Apps | ${BUSINESS.brandName}`,
    description: `${PROJECTS.length} real projects by ${BUSINESS.brandName}, including the District Nerve Center, Soft Clipper, ProfitScout and SellOps, each with an honest status and a live link.`,
    canonical: CANONICAL,
    jsonLd: JSON_LD,
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ShaderBackground />
      <Navbar />

      <main className="relative z-20 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-6xl">
          <header className="mb-14 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
              <Layers size={12} aria-hidden="true" /> Portfolio
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl font-display">Our work</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {PROJECTS.length} projects built by {BUSINESS.brandName}, from a government emergency platform in daily use
              to products people buy and apps we built for clients.
              Each one says honestly whether it is live, in use, completed or still a prototype.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <article
                key={p.slug}
                id={p.slug}
                className="scroll-mt-28 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/7]">
                  <ProjectVisual project={p} iconSize="w-12 h-12" />
                  <div className="absolute top-4 left-4"><StatusBadge status={p.status} /></div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <p className="text-xs font-semibold text-brand-accent">{p.category}</p>
                  <h2 className="text-2xl font-bold text-slate-900 font-display">{p.title}</h2>
                  <p className="font-medium text-slate-800">{p.summary}</p>
                  <p className="text-slate-600 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-slate-900/10 bg-slate-900/[0.04] px-2.5 py-1 text-xs text-slate-600">{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <ProjectLinks project={p} size="sm" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 md:p-10 text-center" aria-labelledby="demos-cta">
            <MonitorPlay className="mx-auto mb-4 h-8 w-8 text-brand-accent" aria-hidden="true" />
            <h2 id="demos-cta" className="mb-3 text-2xl font-bold text-slate-900 font-display">
              Looking for a tool for your own business?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-600">
              Try one of our {DEMO_APPS.length} working demos — COD confirmation, digital khata, salon booking, fee
              reminders and more. Every one can be set up for your business.
            </p>
            <Link to="/demos" className="btn-primary inline-flex !px-7 !py-4 text-sm">
              Browse the demos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

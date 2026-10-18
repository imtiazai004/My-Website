import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, LibraryBig, FileText } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';

const GUIDES = [
  {
    slug: 'build-your-own-ai-seller-copilot',
    badge: 'New',
    title: 'Build Your Own AI Seller Copilot',
    description:
      'Turn your sales playbooks into an AI copilot that answers like a specialist. Pick your coding agent, build the app step by step — no coding required.',
    meta: 'PDF · 11 pages · English',
  },
  {
    slug: 'tikfulfill-build-guide',
    badge: 'Guide',
    title: 'TikFulfill Build Guide',
    description:
      'Build your own TikTok Shop auto-fulfilment dashboard in VS Code with Claude Code — every prompt included, copy-paste ready.',
    meta: 'PDF · 13 pages · English',
  },
];

export default function GuidesLibraryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'Free Guides — AI Soft Tech Solution',
    description:
      'Free step-by-step guides from AI Soft Tech Solution: build your own AI seller copilot, your own TikTok Shop fulfilment dashboard, and more. Download the PDFs free.',
    canonical: `${BUSINESS.websiteUrl}/guides`,
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
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; Back to Home
          </Link>

          <header className="mb-12 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              <LibraryBig size={12} /> Free library
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Free Guides
            </h1>
            <p className="text-lg text-slate-600">
              Step-by-step playbooks from {BUSINESS.brandName} — build real
              tools for your business yourself, with AI doing the heavy
              lifting. Read them here or download the PDFs free.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    <BookOpen size={11} /> {guide.badge}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-brand-accent"
                  />
                </div>
                <h2
                  className="mb-2 text-xl font-bold text-slate-900"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {guide.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-slate-600">
                  {guide.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <FileText size={13} /> {guide.meta}
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            More guides are on the way. Written by {BUSINESS.brandName} — we
            build websites, tools and applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

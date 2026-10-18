import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Boxes, Terminal, Scale } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';

const ZIP_URL = '/downloads/ecommerce-skills.zip';
const GITHUB_URL = 'https://github.com/nexscope-ai/eCommerce-Skills';

const INSIDE = [
  {
    title: 'Product research',
    text: 'Find winning products with AI-powered research skills across Amazon, TikTok Shop, Walmart, Shopee, TEMU and 1688.',
  },
  {
    title: 'Listing optimization',
    text: 'Skills that rewrite titles, bullets and descriptions to rank higher and convert better.',
  },
  {
    title: 'Keyword intelligence',
    text: 'Keyword analysis and tracking skills so your listings show up where buyers search.',
  },
  {
    title: 'Marketing automation',
    text: 'Affiliate and campaign strategy skills that plan and run your promotions.',
  },
  {
    title: 'Analytics & monitoring',
    text: 'Brand monitoring, price tracking and review-analysis skills that watch your store while you sleep.',
  },
  {
    title: 'Works with your AI tools',
    text: 'Plug-and-play with Claude Code, Cursor, Windsurf and OpenClaw — no new software to learn.',
  },
];

export default function EcommerceSkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'eCommerce-Skills — 150+ Free AI Skills for Online Sellers',
    description:
      'Free open-source pack: 150+ plug-and-play AI agent skills for Amazon, TikTok Shop, Shopify, Etsy, eBay and Walmart sellers. Download the zip and start using them with Claude Code, Cursor or Windsurf.',
    canonical: `${BUSINESS.websiteUrl}/guides/ecommerce-skills`,
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

          <header className="mb-10 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              <Boxes size={12} /> Free open-source tool
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              eCommerce-Skills — 150+ free AI skills for online sellers
            </h1>
            <p className="text-lg text-slate-600">
              A free open-source pack of 150+ plug-and-play AI agent skills for
              sellers on Amazon, TikTok Shop, Shopify, Etsy, eBay and Walmart —
              product research, listing optimization, keywords, marketing and
              analytics, done by chatting with AI instead of paying for
              expensive tools.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Terminal size={13} /> ZIP · 406 files · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={ZIP_URL}
              download="eCommerce-Skills.zip"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
            >
              <Download size={18} /> Download ZIP
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              View on GitHub
            </a>
          </div>

          <div className="mb-10 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Quick install
            </p>
            <code className="block overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm text-emerald-300">
              npx skills add nexscope-ai/eCommerce-Skills -g
            </code>
            <p className="mt-2 text-sm text-slate-500">
              Or download the ZIP above and browse the skill folders directly.
            </p>
          </div>

          <h2
            className="mb-6 text-2xl font-bold text-slate-900"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            What's inside
          </h2>
          <div className="mb-12 grid gap-4 md:grid-cols-2">
            {INSIDE.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm"
              >
                <h3 className="mb-1 font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <Scale size={16} className="mt-0.5 shrink-0 text-slate-400" />
            <p>
              Original project by{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-accent hover:underline"
              >
                nexscope-ai
              </a>
              , shared here under the MIT License. All credit belongs to the
              original authors.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Shared by {BUSINESS.brandName} — we build websites, tools and
            applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

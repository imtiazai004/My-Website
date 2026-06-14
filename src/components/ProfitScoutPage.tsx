import { useEffect } from 'react';
import { motion } from 'motion/react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';
import {
  Search, BarChart3, ShoppingCart, TrendingUp, Star,
  Shield, Zap, Globe, Bot, Download, CheckCircle, ArrowRight,
} from 'lucide-react';

const FEATURES = [
  { icon: Search,      title: 'Product Scoring',        desc: 'Instant score out of 100 based on demand, competition & margin signals.' },
  { icon: Zap,         title: 'X-Ray Niche Analysis',   desc: 'Full competitor revenue table on any search results page — like Helium 10, but free.' },
  { icon: BarChart3,   title: 'ROI Calculator',          desc: 'Estimate landed cost, platform fees, and net profit margin in one click.' },
  { icon: TrendingUp,  title: 'Price & BSR Tracker',    desc: 'Auto-tracks price and rank changes over time — up to 365 daily snapshots per product.' },
  { icon: Star,        title: 'Lead Manager',            desc: 'Save winning products with 25+ fields and manage them in a full dashboard.' },
  { icon: Bot,         title: 'Gemini AI Mode',          desc: 'Optional AI-powered deep analysis, listing writer, and PPC planner using your own free Google key.' },
  { icon: Globe,       title: 'Quick Search',            desc: 'Analyze any product by name without visiting a listing — great for TikTok finds.' },
  { icon: Shield,      title: '100% Private',            desc: 'Everything runs locally in your browser. No data sold, no account required.' },
];

const SELLING_PLATFORMS = ['Amazon', 'eBay', 'TikTok Shop', 'Walmart', 'Etsy'];
const SOURCING_PLATFORMS = ['AliExpress', 'Alibaba', '1688.com', 'DHgate', 'Global Sources', 'Made-in-China'];

const FAQS = [
  { q: 'Is ProfitScout really free?', a: 'Yes — 100% free, forever. No subscription, no trial, no credit card. AI features require your own free Google Gemini API key.' },
  { q: 'Does it work on all Amazon marketplaces?', a: 'Yes. ProfitScout supports Amazon US, UK, CA, DE, FR, IT, ES, JP, and AU.' },
  { q: 'Do I need an API key to use it?', a: 'No. Core features work with zero setup. The optional Gemini AI mode requires a free Google AI Studio key.' },
  { q: 'Is my data safe?', a: 'All your leads, settings, and tracking data stay in your browser\'s local storage. Only anonymous product metadata (price, BSR) is synced for market intelligence.' },
  { q: 'Can I use it for sourcing research?', a: 'Yes — ProfitScout supports 7 sourcing platforms including Alibaba, AliExpress, 1688, and DHgate, with sourcing score and price tier comparisons.' },
];

export default function ProfitScoutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ProfitScout v1 — Free Product Research Chrome Extension | AI Soft Tech Solution';
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />
      <div className="fixed top-0 left-1/4 w-[1200px] h-[1200px] bg-brand-accent/5 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-0 right-0 w-[900px] h-[900px] bg-indigo-500/4 rounded-full blur-[160px] translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative z-20 pt-40 pb-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a href="/" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-accent transition-colors mb-10">
              ← Back to Home
            </a>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Chrome Extension · 100% Free
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Profit<span className="text-brand-accent">Scout</span> v1
            </h1>

            <p className="text-xl text-white/60 mb-4 leading-relaxed max-w-2xl mx-auto">
              Free product research for online sellers. Analyze listings on Amazon, eBay, TikTok Shop, Walmart & Etsy — directly in your browser, no sign-up needed.
            </p>

            <p className="text-sm text-white/35 mb-10">
              Built by <a href="https://aisofttechsolution.com" className="text-brand-accent hover:text-indigo-300 transition-colors">Imtiaz Ahmad</a> · AI Soft Tech Solution
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://chromewebstore.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-accent text-white font-bold text-sm rounded-xl hover:bg-indigo-400 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
              >
                <Download className="w-4 h-4" />
                Add to Chrome — Free
              </motion.a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white/70 font-bold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                See Features <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="relative z-20 py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-8">Works on 12 platforms</p>
          <div className="mb-4">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-brand-accent/60 mb-4">Selling Platforms</p>
            <div className="flex flex-wrap justify-center gap-3">
              {SELLING_PLATFORMS.map(p => (
                <span key={p} className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-sm font-semibold text-brand-accent">{p}</span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Sourcing Platforms</p>
            <div className="flex flex-wrap justify-center gap-3">
              {SOURCING_PLATFORMS.map(p => (
                <span key={p} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/50">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-20 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
              Features
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Everything a seller needs
            </h2>
            <p className="text-white/40 mt-3 text-sm max-w-xl mx-auto">No API key required for core features. No account. No monthly fee. Just install and start researching.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-bold text-white mb-16" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Three steps to your next winning product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Install the extension', desc: 'Add ProfitScout to Chrome in one click — free, no account needed.' },
              { step: '02', title: 'Browse any product page', desc: 'Visit a listing on Amazon, eBay, TikTok Shop, Walmart, or Etsy.' },
              { step: '03', title: 'Get instant analysis', desc: 'See your GO / CAUTION / NO-GO verdict, score, ROI estimate, and sourcing options instantly.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/5 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.step}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
              FAQ
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">{faq.q}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-20 py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Free · No Sign-up · No Credit Card
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start researching smarter today
          </h2>
          <p className="text-white/40 mb-8 text-sm">Join sellers using ProfitScout to find winning products faster — completely free.</p>
          <motion.a
            href="https://chromewebstore.google.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-10 py-4 bg-brand-accent text-white font-bold text-sm rounded-xl hover:bg-indigo-400 transition-all shadow-[0_0_40px_rgba(99,102,241,0.35)]"
          >
            <Download className="w-4 h-4" />
            Add to Chrome — It's Free
          </motion.a>
          <p className="mt-6 text-white/25 text-xs">
            Questions? <a href="mailto:imtiazahmad@aisofttechsolution.com" className="text-brand-accent hover:text-indigo-300 transition-colors">imtiazahmad@aisofttechsolution.com</a> · <a href="https://wa.me/923005863032" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">WhatsApp</a>
          </p>
          <p className="mt-3 text-white/20 text-xs">
            <a href="/profitscout-privacy" className="hover:text-white/40 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </section>

    </div>
  );
}

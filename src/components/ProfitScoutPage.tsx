import { useEffect } from 'react';
import { motion } from 'motion/react';
import ShaderBackground from './ui/shader-background';
import Navbar from './Navbar';
import {
  Search, BarChart3, TrendingUp, Star, Shield, Zap, Globe, Bot,
  Download, CheckCircle, ArrowRight, Target, AlertTriangle, Users,
  Package, Award, Clock, Filter, FileText, Database, Calculator,
  MessageSquare, Layers, Eye, RefreshCcw,
} from 'lucide-react';

const SELLING_PLATFORMS = ['Amazon', 'eBay', 'TikTok Shop', 'Walmart', 'Etsy'];
const SOURCING_PLATFORMS = ['AliExpress', 'Alibaba', '1688.com', 'DHgate', 'Global Sources', 'Made-in-China'];

const FEATURE_CATEGORIES = [
  {
    badge: '🎯',
    label: 'Core Product Analysis',
    title: 'Everything about a product — in seconds',
    subtitle: 'Click one button on any product page and get a complete breakdown. No setup, no API key, no account needed.',
    features: [
      { icon: Target,        title: 'Product Score (0–100)',           desc: 'Composite score based on price sweet spot, demand signals, competition level, and profit margin potential. Higher = better opportunity.' },
      { icon: CheckCircle,   title: 'GO / CAUTION / NO-GO Verdict',    desc: 'A clear decision checking 6 criteria: price range, review count, demand proof, brand lock, margin viability, and category trend.' },
      { icon: Zap,           title: 'Auto-Inject Quick Bar',           desc: 'A live score bar appears automatically at the bottom of every product page — no clicks needed. Score, BSR, price, revenue, and margin instantly visible.' },
      { icon: Award,         title: 'Listing Quality Score (A–F)',     desc: 'Grades how well a competitor optimized their listing. A low-grade competitor is your opening — beat them with a better title, bullets, and images.' },
      { icon: Eye,           title: 'BuyBox Detection',                desc: 'Detects if one seller dominates the Buy Now button. If locked, the score drops 25 points — a critical red flag before you commit to inventory.' },
      { icon: TrendingUp,    title: 'Review Velocity',                 desc: 'Estimated new reviews per month. High velocity means the product is growing fast — a signal to move quickly or reconsider the competition level.' },
      { icon: Users,         title: 'Seller Count',                    desc: 'How many sellers compete on this listing. Multiple sellers prove demand. One seller means BuyBox risk. Critical intel before entering any niche.' },
      { icon: Package,       title: 'FBA Detection',                   desc: 'Detects whether the top seller uses Amazon FBA. FBA sellers get the Prime badge and BuyBox preference — know the barrier before you invest.' },
      { icon: Layers,        title: 'Variation Finder',                desc: 'All color/size/pack variants shown as clickable ASIN chips. Find the under-competitive variant that other sellers haven\'t spotted yet.' },
      { icon: AlertTriangle, title: 'Risk Analysis (4 Dimensions)',    desc: 'Every product rated across Demand Risk, Supply Risk, Regulatory Risk, and Margin Risk — each Low / Medium / High. Know exactly what you\'re walking into.' },
    ],
  },
  {
    badge: '⚡',
    label: 'X-Ray Niche Scanner',
    title: 'See every competitor\'s revenue — like Helium 10, but free',
    subtitle: 'One click on any search results page opens a full competitor revenue table. Research entire niches in minutes, not hours.',
    features: [
      { icon: BarChart3, title: 'Full Competitor Revenue Table',  desc: 'Shows price, reviews, real Last Month Sales, est. monthly revenue, est. units/mo, est. profit/mo, BSR, brand, and seller for every product on screen.' },
      { icon: Search,    title: 'Niche Analysis Panel',          desc: 'Average price, average reviews, price range, and competition difficulty rating — Easy / Medium / Hard / Very Hard — for the entire niche in one panel.' },
      { icon: Filter,    title: 'Ads Filter (Sponsored Hidden)', desc: 'Sponsored products auto-hidden by default. You always start with clean organic research. Toggle to show/hide ads with a single click.' },
      { icon: Star,      title: 'Real "Last Month Sales" Data',  desc: 'Amazon shows "X+ bought in past month" on popular listings. ProfitScout scrapes this real number directly — not estimated, straight from Amazon.' },
      { icon: Download,  title: 'X-Ray CSV Export',             desc: 'Export the full competitor niche table to a spreadsheet in one click — price, revenue, BSR, brand, seller, and opportunity score for everyone.' },
      { icon: Globe,     title: 'Alibaba X-Ray Mode',           desc: 'X-Ray and Niche Analysis both work on Alibaba search results pages — see supplier order volumes, prices, and sourcing opportunities side by side.' },
      { icon: Eye,       title: 'Column Tooltips',              desc: 'Hover any column header in the X-Ray table to see what the data means, where it came from, and how it\'s calculated. No guessing, ever.' },
    ],
  },
  {
    badge: '💰',
    label: 'Profit & Sourcing Tools',
    title: 'Know your numbers before you spend a single dollar',
    subtitle: 'Platform fees, supplier tiers, MOQ math — all calculated automatically for the product you\'re looking at right now.',
    features: [
      { icon: Calculator,  title: 'ROI Calculator',               desc: 'Enter landed cost % and get: platform fees (Amazon 15%+FBA, eBay 12.9%, TikTok 8%...), net profit per unit, ROI %, and margin % — in real time.' },
      { icon: Globe,       title: 'Cross-Platform Profit',        desc: 'The same product on all 5 selling platforms, side by side. See which marketplace gives you the highest margin before you list anywhere.' },
      { icon: Layers,      title: 'Sourcing Price Tiers',         desc: '3 supplier tiers with estimated prices and direct links: 🛍️ AliExpress (test batch) · 🏭 Alibaba (bulk) · 🏢 1688 Factory Direct (cheapest).' },
      { icon: Calculator,  title: 'MOQ Break-Even Calculator',    desc: 'Enter supplier MOQ + cost per unit. Get: total investment, units needed to break even, profit after full MOQ sell-through, and ROI %. Know before you commit.' },
      { icon: RefreshCcw,  title: '1688.com Support',             desc: 'RMB prices auto-converted to USD. Factory-direct pricing from 1688 is typically 30–50% cheaper per unit than Alibaba — and ProfitScout supports it natively.' },
    ],
  },
  {
    badge: '📊',
    label: 'Market Intelligence',
    title: 'Understand where the market is heading — not just where it is today',
    subtitle: 'Trend stages, seasonal timing, and product gaps that most sellers never even think to check before listing.',
    features: [
      { icon: TrendingUp,    title: 'Price & BSR Tracker',           desc: 'Every product you scout is auto-tracked daily — price, BSR, reviews, and rating. Up to 2,000 products × 365 daily snapshots = 1 full year of market data.' },
      { icon: Star,          title: 'TikTok Virality Score',          desc: 'Predicts viral potential on TikTok Shop: visual appeal, impulse-buy factor, problem-solving clarity, and niche popularity. Score 70+ = strong viral potential.' },
      { icon: Target,        title: 'First-Mover Trend Detector',    desc: '5 market stages: 🚀 Trending · 🌱 Emerging · 📈 Established · ⚠️ Saturated · 📉 Declining. Know when to enter before everyone else realizes the opportunity.' },
      { icon: Clock,         title: 'Seasonal Order Calendar',        desc: 'Best months to order inventory and peak sales windows for that product category — including China lead times so you never miss a peak selling season.' },
      { icon: Search,        title: 'Market Gap Analysis',            desc: 'Identifies unmet customer needs: "No waterproof version exists", "All lack a carrying case", "Competitor images are terrible." Actionable chips you can copy and act on.' },
      { icon: MessageSquare, title: 'Review Miner',                   desc: 'Scrapes and analyzes customer reviews to surface real product complaints. "Strap breaks after 2 weeks" = a flaw you can fix in your version and win.' },
      { icon: Eye,           title: 'Keepa & CamelCamelCamel Links', desc: 'One-click access to free price history tools for any product. Check price stability, seasonal spikes, and BSR consistency before you commit to sourcing.' },
    ],
  },
  {
    badge: '💾',
    label: 'Lead Management',
    title: 'Build, organize, and compare your product shortlist',
    subtitle: 'A full CRM-style product research workspace — inside your browser, completely offline, no cloud account needed.',
    features: [
      { icon: Database,  title: 'Lead Manager (100 Products)', desc: 'Save any product with 25+ fields: score, margin, keywords, trend stage, market gaps, risk rating, and personal notes. Instantly accessible across all sessions.' },
      { icon: BarChart3, title: 'Full Dashboard',             desc: 'Opens as a full browser tab. Stats bar (total leads, avg score, best lead), search, platform filter, score filter, demand filter, and sort options — all in one.' },
      { icon: Users,     title: 'Side-by-Side Compare Mode',  desc: 'Select up to 3 leads and compare them in a detailed winner/loser table. Stop guessing which product to launch next — let the data decide.' },
      { icon: Download,  title: 'CSV Export (19 Columns)',    desc: 'Export all saved leads to a spreadsheet with 19 columns: score, price, BSR, estimated margin, demand level, keywords, sourcing tiers, and more.' },
      { icon: FileText,  title: 'Inline Notes (Auto-Save)',   desc: 'Add private research notes to any saved lead directly in the dashboard. Notes save automatically as you type — no button, no friction, no lost work.' },
      { icon: Filter,    title: 'Smart Filter & Sort',        desc: 'Filter by platform, score range (High/Medium/Low), and demand level. Sort by newest, highest score, best margin, or easiest to source. Find winners instantly.' },
    ],
  },
  {
    badge: '✨',
    label: 'Gemini AI Mode',
    title: 'Your AI research partner — powered by your own free Google key',
    subtitle: 'Completely optional. Get a free Gemini API key at Google AI Studio and unlock deep AI analysis on every product and niche.',
    features: [
      { icon: Bot,           title: 'AI Quick-Take (Instant)',   desc: 'The moment a product analysis panel opens, AI fires: VERDICT + BEST OPPORTUNITY + TOP RISK + FIRST MOVE. Your executive briefing in under 5 seconds.' },
      { icon: MessageSquare, title: 'Full AI Product Chat',      desc: 'Ask anything: "Who is the ideal buyer?", "What keywords should I target?", "Is this good for a beginner?" — fully context-aware, conversational AI chat.' },
      { icon: Star,          title: 'AI Review Miner',           desc: 'AI digs through review patterns and deep category knowledge to surface the most exploitable customer complaints your competitors haven\'t addressed yet.' },
      { icon: Globe,         title: 'Niche AI Deep Dive',        desc: 'On search results pages, tap AI Niche Analysis for a full market report: demand trend, competitive barriers, sourcing recommendations, and entry strategy.' },
      { icon: FileText,      title: 'AI Listing Writer',         desc: 'Generate a complete Amazon listing draft — keyword-rich title, 5 optimized bullet points, and a product description built to rank and convert.' },
    ],
  },
];

const EXTRA_FEATURES = [
  { icon: Search,  title: 'Quick Search',             desc: 'Analyze any product by name — no product page needed. Spot something on TikTok or YouTube? Type the name and get instant full analysis.' },
  { icon: Shield,  title: '100% Private & Secure',    desc: 'Everything stays in your browser. No account, no sign-up, no data sold. Your Gemini key never leaves your device — not even to us.' },
  { icon: Zap,     title: 'Customizable Score Weights', desc: 'Adjust 5 scoring sliders (Price · Competition · Demand · Margin · Trend) to fit your strategy. Dropshippers and private label sellers score differently.' },
  { icon: Bot,     title: 'Built-in Help Chatbot',    desc: 'Ask any question about ProfitScout and get an instant, specific answer from the built-in knowledge base. Your personal guide, right inside the extension.' },
];

const FAQS = [
  { q: 'Is ProfitScout really free?', a: 'Yes — 100% free, forever. No subscription, no trial, no credit card. AI features require your own free Google Gemini API key.' },
  { q: 'Does it work on all Amazon marketplaces?', a: 'Yes. ProfitScout supports Amazon US, UK, CA, DE, FR, IT, ES, JP, and AU.' },
  { q: 'Do I need an API key to use it?', a: 'No. All 44 core features work with zero setup. The optional Gemini AI mode requires a free key from Google AI Studio.' },
  { q: 'Is my data safe?', a: 'All your leads, settings, and tracking data stay in your browser\'s local storage. Only anonymous product metadata (price, BSR) is synced for market intelligence.' },
  { q: 'Can I use it for sourcing research?', a: 'Yes — ProfitScout supports 6 sourcing platforms including Alibaba, AliExpress, 1688, and DHgate, with full sourcing score and price tier comparisons.' },
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
              The only product research extension you'll ever need. 44 features across 12 platforms — completely free, forever.
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
                See All 44 Features <ArrowRight className="w-4 h-4" />
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

      {/* ── Key Stats ── */}
      <section className="relative z-20 py-14 px-6 bg-brand-accent/[0.04] border-b border-brand-accent/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '44', label: 'Total Features' },
              { value: '12', label: 'Supported Platforms' },
              { value: '365', label: 'Days Price History' },
              { value: '100%', label: 'Free Forever' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold text-brand-accent mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/35">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Categories ── */}
      <div id="features">
        {FEATURE_CATEGORIES.map((category, catIdx) => (
          <section
            key={category.label}
            className={`relative z-20 py-24 px-6 border-t border-white/5 ${catIdx % 2 === 1 ? 'bg-white/[0.015]' : ''}`}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
                  {category.badge} {category.label} · {category.features.length} Features
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {category.title}
                </h2>
                <p className="text-white/40 text-sm max-w-2xl leading-relaxed">{category.subtitle}</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:border-brand-accent/30 hover:bg-brand-accent/[0.05] transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-3 group-hover:bg-brand-accent/20 transition-colors shrink-0">
                        <Icon className="w-4 h-4 text-brand-accent" />
                      </div>
                      <h3 className="text-white font-bold text-sm mb-1.5 leading-snug">{f.title}</h3>
                      <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Extra 4 Features ── */}
      <section className="relative z-20 py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
              🔧 Even More · 4 Features
            </div>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              And there's more
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXTRA_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:border-brand-accent/30 hover:bg-brand-accent/[0.05] transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-3 group-hover:bg-brand-accent/20 transition-colors">
                    <Icon className="w-4 h-4 text-brand-accent" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{f.title}</h3>
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
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6"
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
            44 Features · 12 Platforms · Free Forever
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Start researching smarter today
          </h2>
          <p className="text-white/40 mb-8 text-sm">Join sellers using ProfitScout to find winning products faster — completely free, no sign-up, no catch.</p>
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

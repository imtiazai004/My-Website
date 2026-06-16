import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const solutions = [
  {
    name: 'Fixr AI',
    label: 'Service Industry',
    category: 'AI PLATFORM',
    desc: 'Voice-powered AI agent booking home services in 3 languages via natural conversation.',
    tags: ['GEMINI AI', 'PYTHON', 'VOICE API'],
    gradient: 'from-violet-600 to-indigo-700',
    icon: '🤖',
    stat: '5-Agent',
    statLabel: 'AI PIPELINE'
  },
  {
    name: 'ProfitScout',
    label: 'E-Commerce · Product Research',
    category: 'CHROME EXTENSION',
    desc: 'AI-powered product research across Amazon, eBay, TikTok Shop & Etsy with ROI calculator.',
    tags: ['JAVASCRIPT', 'GEMINI AI', 'CHROME API'],
    gradient: 'from-orange-500 to-rose-600',
    icon: '🔍',
    stat: '5 Markets',
    statLabel: 'MULTI-PLATFORM'
  },
  {
    name: 'MarketNexus',
    label: 'E-Commerce · Marketplace Selling',
    category: 'SELLER DASHBOARD',
    desc: 'Multi-channel listing management for Amazon, eBay, TikTok & Etsy — inventory, pricing and orders unified.',
    tags: ['REACT', 'NODE.JS', 'AMAZON API'],
    gradient: 'from-orange-400 to-amber-600',
    icon: '🏪',
    stat: '5 Channels',
    statLabel: 'UNIFIED SELLING'
  },
  {
    name: 'DropFlow AI',
    label: 'E-Commerce · Dropshipping',
    category: 'AUTOMATION PLATFORM',
    desc: 'AI-powered dropshipping automation — supplier discovery, dynamic pricing and fulfillment tracking.',
    tags: ['NEXT.JS', 'PYTHON', 'GEMINI AI'],
    gradient: 'from-rose-500 to-pink-700',
    icon: '🚀',
    stat: '3x Speed',
    statLabel: 'FULFILLMENT'
  },
  {
    name: 'ConvertIQ',
    label: 'E-Commerce · Store Analytics',
    category: 'CRO ANALYTICS',
    desc: 'Real-time Shopify & WooCommerce analytics with AI CRO suggestions, heatmaps and A/B testing.',
    tags: ['TYPESCRIPT', 'D3.JS', 'REDIS'],
    gradient: 'from-violet-500 to-purple-700',
    icon: '📊',
    stat: '+34%',
    statLabel: 'CONVERSION LIFT'
  },
  {
    name: 'TradeStack',
    label: 'E-Commerce · B2B Wholesale',
    category: 'WHOLESALE PORTAL',
    desc: 'Enterprise B2B portal with tiered pricing, bulk orders, net-30 payment terms and ERP integration.',
    tags: ['NEXT.JS', 'POSTGRESQL', 'STRIPE'],
    gradient: 'from-teal-500 to-cyan-700',
    icon: '🤝',
    stat: 'Net-30',
    statLabel: 'PAYMENT ENGINE'
  },
  {
    name: 'LedgerFlow',
    label: 'FinTech & Banking',
    category: 'ENTERPRISE SAAS',
    desc: 'Real-time financial ledger with fraud detection, multi-currency support and full audit trails.',
    tags: ['NEXT.JS', 'POSTGRESQL', 'STRIPE'],
    gradient: 'from-emerald-500 to-teal-700',
    icon: '🏦',
    stat: '< 50ms',
    statLabel: 'TXN LATENCY'
  },
  {
    name: 'CareSync',
    label: 'HealthTech & MedTech',
    category: 'CLINICAL PLATFORM',
    desc: 'HIPAA-compliant patient management with AI diagnostics assistance and medication tracking.',
    tags: ['REACT NATIVE', 'FIREBASE', 'OPENAI'],
    gradient: 'from-cyan-500 to-blue-600',
    icon: '🏥',
    stat: '99.9%',
    statLabel: 'UPTIME SLA'
  },
  {
    name: 'Scholr AI',
    label: 'EdTech & E-Learning',
    category: 'AI LEARNING PLATFORM',
    desc: 'Adaptive LLM engine that personalizes curriculum, auto-generates quizzes and tracks mastery.',
    tags: ['NEXT.JS', 'OPENAI', 'POSTGRESQL'],
    gradient: 'from-yellow-500 to-orange-600',
    icon: '🎓',
    stat: '40%',
    statLabel: 'FASTER LEARNING'
  },
  {
    name: 'NovaDeploy',
    label: 'Cloud & DevOps',
    category: 'INFRASTRUCTURE TOOL',
    desc: 'Zero-downtime CI/CD orchestration with auto-scaling across AWS, GCP and Azure.',
    tags: ['DOCKER', 'KUBERNETES', 'AWS'],
    gradient: 'from-slate-600 to-slate-800',
    icon: '☁️',
    stat: '< 2min',
    statLabel: 'DEPLOY TIME'
  },
  {
    name: 'EstateIQ',
    label: 'PropTech & Real Estate',
    category: 'AI SAAS PLATFORM',
    desc: 'AI property valuation, tenant screening and lease lifecycle management for real estate firms.',
    tags: ['REACT', 'PYTHON', 'GEMINI AI'],
    gradient: 'from-lime-500 to-emerald-600',
    icon: '🏘️',
    stat: '30 sec',
    statLabel: 'AI VALUATION'
  },
  {
    name: 'EdgePulse',
    label: 'IoT & Embedded Systems',
    category: 'EDGE PLATFORM',
    desc: 'Real-time IoT sensor network with edge computing and predictive maintenance alerts.',
    tags: ['C/C++', 'RUST', 'MQTT'],
    gradient: 'from-fuchsia-500 to-pink-700',
    icon: '⚡',
    stat: '10ms',
    statLabel: 'EDGE LATENCY'
  },
  {
    name: 'ChainForge',
    label: 'Blockchain & Web3',
    category: 'DECENTRALIZED PLATFORM',
    desc: 'Audited smart contracts, multi-sig wallets and cross-chain bridge — Ethereum & Solana.',
    tags: ['SOLIDITY', 'WEB3.JS', 'ETHEREUM'],
    gradient: 'from-purple-600 to-violet-800',
    icon: '⛓️',
    stat: '100%',
    statLabel: 'AUDIT READY'
  },
  {
    name: 'OpsCore ERP',
    label: 'Enterprise & Operations',
    category: 'ENTERPRISE SOFTWARE',
    desc: 'Modular ERP covering HR, inventory, procurement and finance — cloud or on-premise.',
    tags: ['PYTHON', 'FLASK', 'POSTGRESQL'],
    gradient: 'from-blue-600 to-indigo-800',
    icon: '🏢',
    stat: '24/7',
    statLabel: 'ENTERPRISE SUPPORT'
  }
]

const STRIPES = 'repeating-linear-gradient(90deg, transparent 11px, rgba(99,102,241,0.12) 11px, rgba(99,102,241,0.12) 12px)'

/* ── NETSOL-style cycling visual showcase (right side of hero) ── */
function SolutionShowcase() {
  const [index, setIndex] = useState(0)
  const item = solutions[index]

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % solutions.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto h-[520px]">
      {/* Background striped card — bottom 75% */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[75%] rounded-[24px]"
        style={{ backgroundColor: '#e0e7ff', backgroundImage: STRIPES }}
      />

      {/* Floating product card — top 0, overflowing the bg card upward */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%]">
        <AnimatePresence mode="wait">
          {/* Outer handles the slide-up-out / slide-in-from-below (framer transform) */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -26 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            {/* Inner handles the hover lift (CSS transform) */}
            <div
              className="bg-white rounded-[20px] p-5 hover:-translate-y-2 transition-transform duration-300"
              style={{ boxShadow: '0 25px 60px rgba(99,102,241,0.22)' }}
            >
              {/* Preview image (gradient placeholder with app name centered) */}
              <div className={`relative h-40 rounded-[14px] overflow-hidden bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center gap-1`}>
                <span style={{ fontSize: '40px' }}>{item.icon}</span>
                <span className="text-white font-bold text-xl tracking-tight">{item.name}</span>
              </div>

              {/* Category badge (bordered pill) */}
              <div className="flex items-center mt-4">
                <span className="border border-indigo-200 text-indigo-600 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* App name */}
              <h3 className="text-slate-900 font-bold mt-3" style={{ fontSize: '17px' }}>{item.name}</h3>

              {/* One-line description */}
              <p className="text-gray-500 mt-1.5 line-clamp-2" style={{ fontSize: '12.5px', lineHeight: 1.5 }}>
                {item.desc}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-row gap-1.5 mt-3 flex-wrap">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="border border-indigo-200 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label + side lines + progress dots (over the lower striped area) */}
      <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center gap-4 px-4">
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="w-16 h-px bg-indigo-300 shrink-0" />
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="text-center font-extrabold leading-tight"
            style={{ fontSize: '28px', color: '#6366f1' }}
          >
            {item.label}
          </motion.span>
          <div className="w-16 h-px bg-indigo-300 shrink-0" />
        </div>

        <div className="flex items-center justify-center gap-1.5">
          {solutions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === index ? 'w-5 h-2 bg-indigo-600' : 'w-2 h-2 bg-indigo-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SplineSceneBasic() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#f8fafc] flex items-center">
      {/* Decorative background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[170px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — text (UNCHANGED) */}
        <div className="max-w-2xl">
          {/* Accent label above the headline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center border-l-2 border-[#6366f1] pl-3 mb-7 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
          >
            UK-Based • AI-First • Fast Delivery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-medium text-slate-900 leading-[0.9] tracking-tighter"
          >
            Turning Your Vibes Into <span className="text-brand-accent font-bold">Soft Tech</span> That Solve Your <span className="text-brand-accent font-bold">Problems</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-slate-500 max-w-xl text-lg md:text-xl font-light leading-relaxed"
          >
            We craft high-performance software systems where cinematic aesthetics meet uncompromising technical precision.{' '}
            <span className="text-slate-700 font-normal uppercase tracking-widest text-xs bg-slate-900/[0.06] px-3 py-1 rounded">
              Engineered for impact
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-9 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl hover:bg-brand-accent transition-all duration-300 flex items-center gap-3 group shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
              EXPLORE STACK
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-9 py-4 bg-white border border-slate-900/15 text-slate-900 font-bold uppercase tracking-widest text-[11px] rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
            >
              START PROJECT
            </motion.button>
          </motion.div>
        </div>

        {/* Right — cycling solution showcase */}
        <div className="hidden lg:flex items-center justify-center">
          <SolutionShowcase />
        </div>
      </div>
    </section>
  )
}

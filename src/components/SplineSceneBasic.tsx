import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ShieldAlert, Scissors, Search, PackageCheck, NotebookPen, Truck, CalendarCheck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DEMO_APPS } from '../data/demos'

/* Real work only — each card is a product we run or a demo you can open. */
const showcase = [
  { name: 'District Nerve Center', label: 'Government', category: 'IN DAILY USE', desc: 'Emergency coordination for a district control room: every case logged, routed on WhatsApp and tracked to closure.', tags: ['TYPESCRIPT', 'POSTGRESQL', 'WHATSAPP'], gradient: 'from-sky-600 to-indigo-700', Icon: ShieldAlert, stat: 'Live', statLabel: 'CONTROL ROOM', href: '/work#district-nerve-center' },
  { name: 'CODConfirm', label: 'Online sellers', category: 'LIVE DEMO', desc: 'Confirms every cash-on-delivery order on WhatsApp before it ships — fewer refused parcels.', tags: ['WHATSAPP', 'AUTOMATION'], gradient: 'from-orange-500 to-rose-600', Icon: PackageCheck, stat: 'Try it', statLabel: 'OPEN DEMO', href: '/demos/codconfirm' },
  { name: 'Soft Clipper', label: 'Creators', category: 'DESKTOP APP', desc: 'Turns long videos into ready-to-post vertical clips for TikTok, Reels and Shorts.', tags: ['PYTHON', 'GEMINI', 'WINDOWS'], gradient: 'from-slate-700 to-slate-900', Icon: Scissors, stat: 'Live', statLabel: 'PAID PRODUCT', href: 'https://softclipper.pro' },
  { name: 'KhataBook', label: 'Shopkeepers', category: 'LIVE DEMO', desc: 'A digital khata that records udhaar and sends polite WhatsApp payment reminders.', tags: ['ENGLISH + URDU', 'WHATSAPP'], gradient: 'from-emerald-500 to-teal-700', Icon: NotebookPen, stat: 'Try it', statLabel: 'OPEN DEMO', href: '/demos/khatabook' },
  { name: 'ProfitScout', label: 'E-commerce', category: 'CHROME EXTENSION', desc: 'Free product research across Amazon, eBay, TikTok Shop, Walmart and Etsy.', tags: ['JAVASCRIPT', 'GEMINI'], gradient: 'from-amber-500 to-orange-600', Icon: Search, stat: 'Free', statLabel: '5 MARKETPLACES', href: '/profitscout' },
  { name: 'TikFulfill', label: 'TikTok Shop', category: 'LIVE DEMO', desc: 'Automatic TikTok Shop fulfilment: orders in, labels printed, dispatch deadline tracked.', tags: ['TIKTOK SHOP', 'AUTOMATION'], gradient: 'from-fuchsia-600 to-purple-700', Icon: Truck, stat: 'Try it', statLabel: 'OPEN DEMO', href: '/demos/tikfulfill' },
  { name: 'SalonBook', label: 'Salons & clinics', category: 'LIVE DEMO', desc: 'Bookings without double-booking, plus automatic WhatsApp reminders 24 and 2 hours before.', tags: ['BOOKING', 'REMINDERS'], gradient: 'from-pink-500 to-rose-600', Icon: CalendarCheck, stat: 'Try it', statLabel: 'OPEN DEMO', href: '/demos/salonbook' },
  { name: 'SellOps', label: 'TikTok Shop agencies', category: 'OPEN SOURCE', desc: 'Revenue, creators, invoices and payroll for TikTok Shop agencies, plus AI Etsy listings.', tags: ['NEXT.JS', 'CLAUDE API'], gradient: 'from-violet-600 to-indigo-700', Icon: Store, stat: 'Code', statLabel: 'ON GITHUB', href: '/work#sellops' },
]

const STRIPES = 'repeating-linear-gradient(90deg, transparent 11px, rgba(26,127,230,0.12) 11px, rgba(26,127,230,0.12) 12px)'

function SolutionShowcase() {
  const [index, setIndex] = useState(0)
  const item = showcase[index]
  const ItemIcon = item.Icon

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % showcase.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto h-[500px]">
      <div
        className="absolute bottom-0 left-0 right-0 h-[80%] rounded-[24px]"
        style={{ backgroundColor: '#e0e7ff', backgroundImage: STRIPES }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block bg-white rounded-[20px] p-6 hover:-translate-y-2 transition-transform duration-300"
              style={{ boxShadow: '0 25px 60px rgba(26,127,230,0.25)' }}
            >
              <div className={`relative h-[140px] rounded-[12px] overflow-hidden bg-gradient-to-br ${item.gradient}`}>
                <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold tracking-wider px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1.5 text-right leading-none">
                  <p className="text-slate-900 text-sm font-bold leading-none">{item.stat}</p>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wide mt-1">{item.statLabel}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ItemIcon className="w-14 h-14 text-white/90" aria-hidden="true" />
                </div>
              </div>
              <p className="text-slate-900 font-bold mt-4 text-lg">{item.name}</p>
              <p className="text-slate-600 mt-1.5 line-clamp-2 text-sm leading-relaxed">{item.desc}</p>
              <div className="flex flex-row gap-1.5 mt-3 flex-wrap">
                {item.tags.map((tag) => (
                  <span key={tag} className="border border-blue-200 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 px-4">
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center font-extrabold leading-tight text-[28px] text-[#1a7fe6]"
        >
          {item.label}
        </motion.span>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-24 h-px bg-blue-300" />
          <div className="w-12 h-px bg-blue-200" />
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          {showcase.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.name}`}
              className={`rounded-full transition-all duration-300 ${i === index ? 'w-5 h-2 bg-blue-600' : 'w-2 h-2 bg-blue-200'}`}
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
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[170px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center border-l-2 border-[#1a7fe6] pl-3 mb-7 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600"
          >
            UK-registered • AI-first • {DEMO_APPS.length} live demos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-[2.6rem] sm:text-5xl md:text-6xl font-display font-medium text-slate-900 leading-[1.02] tracking-tight"
          >
            AI automation &amp; custom apps for <span className="text-brand-accent font-bold">online sellers</span> and <span className="text-brand-accent font-bold">small businesses</span>
          </motion.h1>

          {/* The answer paragraph — visible, so people and AI assistants read the same summary. */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="answer mt-8 text-slate-600 max-w-xl text-lg md:text-xl leading-relaxed"
          >
            AI Soft Tech Solution builds WhatsApp AI assistants, order-confirmation and booking systems, TikTok Shop
            tools and custom web apps. We run our own products — Soft Clipper, ProfitScout and the District Nerve
            Center — and you can try {DEMO_APPS.length} working demos before you pay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent transition-all duration-300 flex items-center gap-3 group shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
            </motion.button>

            <Link
              to="/demos"
              className="px-8 py-4 bg-white border border-slate-900/15 text-slate-900 font-bold uppercase tracking-widest text-xs rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
            >
              Try a live demo
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <SolutionShowcase />
        </div>
      </div>
    </section>
  )
}

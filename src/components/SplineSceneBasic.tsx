import { motion } from 'motion/react'
import { ArrowRight, TrendingUp, Activity, Users, BarChart3 } from 'lucide-react'

/* ── Floating dashboard-card mockup (replaces the 3D sphere) ── */
function DashboardCard() {
  const bars = [42, 68, 55, 80, 60, 92, 74]
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* soft glow behind the card */}
      <div className="absolute inset-0 -z-10 bg-brand-accent/20 blur-[90px] rounded-[3rem]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        /* -translate-y-8 makes the card overflow the top of its container */
        className="relative -translate-y-8 rounded-3xl bg-[#0f172a] border border-white/10 shadow-[0_40px_90px_-25px_rgba(15,23,42,0.55)] p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white font-semibold text-sm">Revenue Analytics</p>
            <p className="text-white/40 text-[11px] mt-0.5">Last 30 days</p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-accent/15 text-brand-accent text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Live
          </span>
        </div>

        {/* Hero metric */}
        <div className="mb-6">
          <div className="flex items-end gap-3">
            <p className="text-4xl font-display font-bold text-white tracking-tight">$48.2K</p>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-1">
              <TrendingUp className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <p className="text-white/40 text-[11px] mt-1">vs. previous period</p>
        </div>

        {/* Mini bar chart */}
        <div className="bg-white/[0.04] border border-white/5 rounded-2xl p-4 mb-5">
          <div className="flex items-end justify-between gap-2 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                className={`flex-1 rounded-md ${i === 5 ? 'bg-brand-accent' : 'bg-white/15'}`}
              />
            ))}
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Users className="w-3 h-3" /> Users
            </div>
            <p className="text-white font-bold text-lg">12,480</p>
          </div>
          <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Activity className="w-3 h-3" /> Conversion
            </div>
            <p className="text-white font-bold text-lg">6.4%</p>
          </div>
        </div>
      </motion.div>

      {/* Small floating widget that overflows the top of the card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-2 right-4 flex items-center gap-2 bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(15,23,42,0.3)] border border-slate-900/5 px-3.5 py-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-brand-accent/10 flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-brand-accent" />
        </div>
        <div>
          <p className="text-slate-900 font-bold text-sm leading-none">+1.2K</p>
          <p className="text-slate-400 text-[9px] font-medium mt-0.5">new this week</p>
        </div>
      </motion.div>
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

        {/* Left — text */}
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

        {/* Right — floating dashboard card */}
        <div className="hidden lg:flex items-center justify-center">
          <DashboardCard />
        </div>
      </div>
    </section>
  )
}

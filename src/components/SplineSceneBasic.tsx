import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { TAGLINE } from './Logo'

export function SplineSceneBasic() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#f8fafc] flex items-center justify-center">
      {/* Subtle decorative background glows (clean, no 3D shape) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-brand-accent/10 rounded-full blur-[170px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-15%] right-[10%] w-[620px] h-[620px] bg-indigo-400/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[20%] left-[8%] w-[480px] h-[480px] bg-violet-400/8 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* Centered hero content */}
      <div className="relative z-30 w-full max-w-4xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <div className="pill-badge bg-slate-900/[0.04] backdrop-blur-md text-slate-700 border-slate-900/15">
            <Sparkles className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
            <span className="tracking-[0.4em]">SYSTEM_INITIALIZED</span>
          </div>
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-brand-accent/70">
            {TAGLINE}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.05] tracking-tight"
        >
          Turning Your Vibes Into <span className="text-brand-accent">Soft Tech</span><br />
          That Solve Your <span className="text-brand-accent">Problems</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 text-slate-500 max-w-2xl text-lg md:text-xl font-light leading-relaxed"
        >
          High-performance software where cinematic design meets uncompromising engineering — built for impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-[11px] rounded-xl hover:bg-brand-accent transition-all duration-300 flex items-center gap-3 group shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
          >
            EXPLORE WORK
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 bg-white border border-slate-900/15 text-slate-900 font-bold uppercase tracking-widest text-[11px] rounded-xl hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
          >
            START PROJECT
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-30 pointer-events-none"
      >
        <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-slate-400 uppercase">SCROLL</span>
        <div className="w-px h-14 bg-gradient-to-b from-slate-900/30 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-slate-900"
          />
        </div>
      </motion.div>
    </section>
  )
}

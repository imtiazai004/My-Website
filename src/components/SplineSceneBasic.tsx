import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { TAGLINE } from './Logo'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

export function SplineSceneBasic() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0d1117]">
      {/* 3D Canvas — lazy loaded so text renders immediately */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<div className="w-full h-full bg-[#0d1117]" />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Left gradient so text stays readable */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.75) 50%, transparent 100%)' }}
      />

      {/* Text — renders immediately, no Three.js dependency */}
      <div className="relative z-30 h-full w-full flex flex-col justify-center items-start px-8 md:px-24 pt-24 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-col gap-3">
              <div className="pill-badge bg-white/5 backdrop-blur-md text-white border-white/20">
                <Sparkles className="w-3.5 h-3.5 fill-white/80" />
                <span className="tracking-[0.4em]">SYSTEM_INITIALIZED</span>
              </div>
              {/* Company tagline signature */}
              <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-brand-accent/70">
                {TAGLINE}
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-medium text-white leading-[0.85] tracking-tighter"
          >
            Turning Your Vibes <br /> Into <span className="text-brand-accent font-bold">Soft Tech</span> That <br /> Solve Your <span className="text-brand-accent font-bold">Problems</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-neutral-400 max-w-xl text-xl md:text-2xl font-light leading-relaxed"
          >
            We craft high-performance software systems where cinematic aesthetics meet uncompromising technical precision.{' '}
            <span className="text-white font-normal uppercase tracking-widest text-xs bg-white/10 px-3 py-1 rounded">
              Engineered for impact
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-brand-accent hover:text-white transition-all duration-500 flex items-center gap-3 group"
            >
              EXPLORE STACK
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-[11px] hover:border-brand-accent hover:text-brand-accent transition-all duration-500"
            >
              START PROJECT
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4 z-40 pointer-events-none"
      >
        <span
          className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL_SYSTEM
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}

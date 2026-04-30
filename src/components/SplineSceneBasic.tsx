'use client'

import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: `${position}-${i}`,
        index: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.index * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
 
export function SplineSceneBasic() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Paths System */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(99, 102, 241, 0.15)"
      />
      
      {/* Spline Background Layer */}
      <div className="absolute inset-0 z-10 opacity-80 lg:opacity-100 translate-x-[30%] transition-transform duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(99,102,241,0.2)_0%,transparent_70%)] z-20 pointer-events-none" />
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 h-full w-full flex flex-col justify-center items-start px-8 md:px-24 pt-24 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="pill-badge bg-white/5 backdrop-blur-md text-white border-white/20">
              <Sparkles className="w-3.5 h-3.5 fill-white/80" />
              <span className="tracking-[0.4em]">SYSTEM_INITIALIZED</span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-display font-medium text-white leading-[0.85] tracking-tighter">
            Turning Your Vibes <br /> Into <span className="text-brand-accent font-bold">Soft Tech</span> That <br /> Solve Your <span className="text-brand-accent font-bold">Problems</span>
          </h1>
          
          <p className="mt-8 text-neutral-400 max-w-xl text-xl md:text-2xl font-light leading-relaxed">
            We craft high-performance software systems where cinematic aesthetics meet uncompromising technical precision. <span className="text-white font-normal uppercase tracking-widest text-xs bg-white/10 px-3 py-1 rounded">Engineered for impact</span>
          </p>

          <div className="mt-12 flex flex-wrap gap-6">
            <motion.button 
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-brand-accent hover:text-white transition-all duration-500 pointer-events-auto flex items-center gap-3 group"
            >
              EXPLORE STACK
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hero Scroll Indicator - Moved to side or bottom center */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 flex flex-col items-center gap-4 z-40 pointer-events-none hidden md:flex"
      >
        <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase vertical-text">SCROLL_SYSTEM</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  )
}

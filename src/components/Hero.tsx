import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[110vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Hero-Specific Spotlight System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Core Central Spotlight */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-accent/20 rounded-full blur-[140px] opacity-40 animate-pulse-glow" style={{ animationDuration: '10s' }} />
        
        {/* Deep Depth Lights */}
        <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-[160px] animate-float opacity-30" />
        <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-float opacity-20" style={{ animationDelay: '-4s' }} />
        
        {/* Heading Backlight */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-white/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pill-badge group cursor-default bg-neutral-100 text-neutral-900 border-neutral-200">
              <Sparkles className="w-3.5 h-3.5 fill-neutral-900 animate-pulse group-hover:scale-125 transition-transform" />
              <span>THE NEW STANDARD IN DIGITAL ENGINEERING</span>
            </div>
          </motion.div>

          <div className="space-y-10 relative">
            {/* The "Spotlight" Flare behind text */}
            <div className="absolute inset-0 bg-brand-accent/5 blur-3xl rounded-full scale-150 pointer-events-none" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="heading-xl relative"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-500 pb-4">
                Redefining the <br />
              </span>
              <span className="block text-neutral-950">Digital Frontier.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="max-w-3xl mx-auto text-brand-text-muted text-xl md:text-2xl font-light leading-relaxed tracking-tight"
            >
              We craft high-performance software systems where cinematic aesthetics 
              meet uncompromising technical precision. <span className="text-neutral-950 font-medium">Engineered for impact.</span>
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary group !px-12"
            >
              EXPLORE WORK
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary group flex items-center gap-4"
            >
              OUR PROCESS
              <MoveRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Hero Interactive Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black tracking-[0.4em] text-neutral-950/20 uppercase">SCROLL_SYSTEM</span>
        <div className="w-px h-16 bg-gradient-to-b from-brand-accent to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-neutral-950"
          />
        </div>
      </motion.div>
    </section>
  );
}

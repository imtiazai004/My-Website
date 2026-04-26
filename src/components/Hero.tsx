import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Globe, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 flex flex-col justify-center space-y-8"
        >
          <div className="pill-badge w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            AVAILABLE FOR HIRE Q4 2026
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-sans tracking-tight leading-[0.9] text-white">
            Turning your vibes <br />
            <span className="text-brand-accent">into the tools that solve.</span>
          </h1>
          
          <p className="text-brand-text-muted text-xl max-w-xl leading-relaxed font-normal">
            Turning complex vibes into production-ready software using cutting-edge AI orchestration. Fast, SEO-optimized, and built to solve your toughest problems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="px-10 py-5 bg-white text-black font-bold rounded-xl flex items-center gap-3 text-lg"
            >
              VIEW WORK 
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <button className="px-10 py-5 bg-transparent border border-gray-700 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors text-lg">
              BOOK A DISCOVERY
            </button>
          </div>
        </motion.div>
        
        <div className="lg:col-span-4 hidden lg:flex flex-col justify-center gap-6">
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg">Nebula Analytics</h3>
                <p className="text-[10px] text-brand-text-dim font-bold uppercase tracking-widest">AI-DRIVEN SAAS PLATFORM</p>
              </div>
            </div>
            <div className="h-32 bg-brand-surface-muted rounded-xl border border-dashed border-gray-700 flex items-center justify-center">
              <div className="flex gap-2 items-end h-16">
                <div className="w-3 h-8 bg-brand-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-12 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-6 bg-brand-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-brand-accent/10 to-transparent border border-brand-accent/20 rounded-2xl">
            <p className="italic text-brand-text-muted mb-4 font-light">
              "Soft Tech Solution transformed our legacy workflow into a modern AI power-house in weeks."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-surface-muted border border-brand-border" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">Marcus Chen</p>
                <p className="text-[10px] text-brand-text-dim font-mono">CTO, LUMINA TECH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


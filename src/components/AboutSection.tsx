import { motion } from 'motion/react';
import { ArrowRight, Award, Clock, Users, Zap, CheckCircle2, Globe } from 'lucide-react';

const STATS = [
  { value: '12+', label: 'Projects Shipped' },
  { value: '5+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '<24h', label: 'Response Time' },
];

const HIGHLIGHTS = [
  'Full-stack web & mobile engineering',
  'AI/LLM integration & automation',
  'Cloud infrastructure & DevOps',
  'Performance-first architecture',
  'Security-audited codebases',
  'Post-launch support included',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-[#f8fafc]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] text-[10px] font-bold tracking-[0.2em] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                WHO WE ARE
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
                Built by Engineers, <br />
                <span className="text-brand-accent italic">For Visionaries</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                Soft Tech Solution was founded with one belief: great software should be both technically
                uncompromising and visually extraordinary. We bridge the gap between raw engineering
                precision and cinematic digital experiences.
              </p>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Based in the UK, we work with startups, scale-ups, and enterprises globally — delivering
                systems that don't just meet requirements, they define new standards.
              </p>
            </div>

            {/* Founder card */}
            <div className="flex items-center gap-6 p-6 bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-2xl font-display font-black text-brand-accent shrink-0">
                IA
              </div>
              <div>
                <p className="font-display font-medium text-slate-900 text-lg">Imtiaz Ahmad</p>
                <p className="text-[11px] font-mono text-brand-accent uppercase tracking-widest mt-0.5">Founder & Lead Engineer</p>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">Full-stack engineer specializing in AI-powered systems and performance-critical applications.</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 text-brand-accent font-bold text-sm group"
            >
              Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right — Stats + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl group hover:border-brand-accent/30 hover:bg-slate-900/[0.04] transition-all"
                >
                  <p className="text-4xl font-display font-bold text-slate-900 tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="p-8 bg-slate-900/[0.03] border border-slate-900/10 rounded-2xl space-y-4">
              <p className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest mb-6">WHAT WE DELIVER</p>
              <div className="grid grid-cols-1 gap-3">
                {HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Globe, text: 'UK Based' },
                { icon: Clock, text: '24h Response' },
                { icon: Award, text: 'NDA Ready' },
                { icon: Zap, text: 'Fast Delivery' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-900/[0.03] border border-slate-900/10 rounded-full text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  <Icon className="w-3 h-3 text-brand-accent" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

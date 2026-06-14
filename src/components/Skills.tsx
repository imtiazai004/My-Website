import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS as INITIAL_SKILLS } from '../constants';
import { subscribeToSkills } from '../services/dataService';
import { Skill } from '../types';
import { Cpu, Code, Server, Brain, Layers, Zap, ChevronRight, type LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = { Code, Server, Brain, Layers, Zap, Cpu };

const SKILL_DETAILS: Record<string, string[]> = {
  'TypeScript/Frontend': ['React 19', 'Next.js 15', 'Tailwind CSS', 'TypeScript', 'Vite'],
  'Full-stack Node.js': ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'GraphQL'],
  'AI Integration': ['OpenAI API', 'Gemini Pro', 'Vector DBs', 'RAG Implementations', 'LangChain'],
  'UI/UX & Motion': ['Figma', 'Framer Motion', 'Design Systems', 'Motion Design', 'Prototyping'],
  'Performance Optimization': ['Lighthouse', 'Web Vitals', 'CDN Strategy', 'Code Splitting', 'Caching']
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSkills((data) => {
      if (data.length > 0) setSkills(data);
    });
    return unsubscribe;
  }, []);

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden bg-[#0d1117]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] text-white/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              TECHNICAL_ARSENAL
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-medium text-white tracking-tight leading-tight"
            >
              Our Core <span className="text-brand-accent italic">Tech Stack</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-xl font-light leading-relaxed"
            >
              Our infrastructure is built on modern, future-proof technologies. Click any skill to explore the full stack.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-brand-accent" />
              <span className="text-xs font-mono font-bold text-white/40">STACK_V2025</span>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left Column */}
          <div className="space-y-10">
            <p className="text-white/50 text-xl leading-relaxed font-light max-w-xl">
              We architect systems that don't just work — they excel. Every technology choice is deliberate, optimized for performance and longevity.
            </p>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8 relative">
              <div className="space-y-4">
                <span className="text-[10px] text-brand-accent font-bold tracking-[0.4em] uppercase">CORE_ENGINE</span>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-white/40">
                  {['NEXT.JS 15 FRAMEWORK', 'TAILWIND 4 ENGINE', 'GEMINI AI ORCHESTRATION'].map((tech, i) => (
                    <div key={`${tech}-${i}`} className="flex items-center gap-2 group cursor-default">
                      <div className="w-1 h-1 bg-brand-accent group-hover:scale-150 transition-transform" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] text-brand-accent font-bold tracking-[0.4em] uppercase">DATA_LAYER</span>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-white/40">
                  {['POSTGRESQL CLUSTER', 'REDIS CACHING', 'FIRESTORE REALTIME'].map((tech, i) => (
                    <div key={`${tech}-${i}`} className="flex items-center gap-2 group cursor-default">
                      <div className="w-1 h-1 bg-brand-accent group-hover:scale-150 transition-transform" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-6">
              {[
                { value: '5+', label: 'Core Stacks' },
                { value: '99%', label: 'Type Coverage' },
                { value: '<50ms', label: 'API Latency' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-display font-bold text-white tracking-tighter">{stat.value}</p>
                  <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Skill Bars */}
          <div className="space-y-4">
            {(skills || []).map((skill, index) => {
              const Icon = ICON_MAP[skill.iconName] ?? Code;
              const isSelected = selectedSkill === skill.name;
              const details = SKILL_DETAILS[skill.name] || [];

              return (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-white/10 border-brand-accent/40 shadow-2xl shadow-brand-accent/10'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-bold text-[10px] uppercase tracking-widest">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg border transition-colors ${
                          isSelected ? 'bg-brand-accent text-black border-transparent' : 'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-white tracking-[0.3em] font-display text-sm">{skill.name}</span>
                      </div>
                      <span className="font-mono text-brand-accent">{skill.level}%</span>
                    </div>

                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-brand-accent"
                      />
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 grid grid-cols-2 gap-3">
                            {details.map((tool, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                <ChevronRight className="w-3 h-3 text-brand-accent" />
                                <span className="text-[10px] font-mono font-bold text-white/50">{tool}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

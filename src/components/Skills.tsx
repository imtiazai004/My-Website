import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SKILLS as INITIAL_SKILLS } from '../constants';
import { subscribeToSkills } from '../services/dataService';
import { Skill } from '../types';
import * as Icons from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);

  useEffect(() => {
    const unsubscribe = subscribeToSkills((data) => {
      if (data.length > 0) {
        setSkills(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section id="skills" className="py-40 px-6 relative overflow-hidden">
      {/* Accent Light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="pill-badge">
              <Icons.ShieldCheck className="w-3 h-3" />
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="heading-lg text-white">
              Built for Scale. <br /> Engineered for Power.
            </h2>
          </div>
          
          <p className="text-neutral-400 text-xl leading-relaxed font-light max-w-xl">
            Our development infrastructure is built on modern standards and future-proof technologies. 
            We architect systems that don't just work—they excel.
          </p>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-4">
              <span className="text-[10px] text-brand-accent font-bold tracking-[0.4em] uppercase">CORE_ENGINE</span>
              <div className="flex flex-col gap-2 font-mono text-[10px] text-white/40">
                {['NEXT.JS 15 FRAMEWORK', 'TAILWIND 4 ENGINE', 'GEMINI AI ORCHESTRATION'].map((tech, i) => (
                  <div key={`${tech}-${i}`} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] text-brand-accent font-bold tracking-[0.4em] uppercase">DATA_LAYER</span>
              <div className="flex flex-col gap-2 font-mono text-[10px] text-white/40">
                {['POSTGRESQL CLUSTER', 'REDIS CACHING', 'FIRESTORE REALTIME'].map((tech, i) => (
                  <div key={`${tech}-${i}`} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card !bg-white/[0.02] grid grid-cols-1 gap-10">
          {(skills || []).map((skill, index) => {
            const Icon = (Icons as any)[skill.iconName] || Icons.Code;
            return (
              <motion.div 
                key={`${skill.name}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between font-bold text-[10px] uppercase tracking-widest text-brand-text-muted">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-brand-accent/10 rounded-lg border border-brand-accent/20">
                      <Icon className="w-4 h-4 text-brand-accent" />
                    </div>
                    <span className="text-white tracking-[0.3em]">{skill.name}</span>
                  </div>
                  <span className="font-mono text-brand-accent">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-brand-accent to-brand-accent/40 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


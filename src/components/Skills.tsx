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
    <section id="skills" className="py-24 px-6 border-y border-brand-border bg-brand-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-[0.2em] text-[10px]">
              <span className="w-10 h-[1px] bg-brand-accent" />
              Technical Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built with Precision.</h2>
          </div>
          
          <p className="text-brand-text-muted text-lg leading-relaxed font-light">
            My development process is built on a foundation of modern standards and future-proof technologies. I don't just write code; I architect systems that scale.
          </p>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-brand-text-dim uppercase tracking-[0.2em] font-bold">CORE STACK</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-brand-text">
              {['NEXT.JS 15', 'TAILWIND 4', 'APPLET SDK', 'POSTGRESQL', 'GEMINI API'].map(tech => (
                <span key={tech} className="hover:text-brand-accent transition-colors cursor-default">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {(skills || []).map((skill, index) => {
            const Icon = (Icons as any)[skill.iconName] || Icons.Code;
            return (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between font-bold text-xs uppercase tracking-widest text-brand-text-muted">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-brand-accent" />
                    <span>{skill.name}</span>
                  </div>
                  <span className="text-brand-text font-mono">{skill.level}%</span>
                </div>
                <div className="h-1 bg-brand-surface-muted rounded-full overflow-hidden border border-brand-border/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-brand-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]"
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


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS as INITIAL_SKILLS } from '../constants';
import { subscribeToSkills } from '../services/dataService';
import { Skill } from '../types';
import * as Icons from 'lucide-react';

const SKILL_DETAILS: Record<string, string[]> = {
  'Backend Architecture': ['Node.js', 'PostgreSQL', 'Redis', 'Microservices', 'GraphQL'],
  'Frontend Systems': ['React 19', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  'Cloud Infrastructure': ['Terraform', 'AWS Lambda', 'Kubernetes', 'CI/CD Pipelines', 'Docker'],
  'AI Integration': ['OpenAI API', 'Gemini Pro', 'Vector DBs', 'RAG Implementations', 'LangChain'],
  'Product Design': ['Figma Architecture', 'Motion Design', 'Design Systems', 'UX Strategy', 'Prototyping']
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSkills((data) => {
      if (data.length > 0) {
        setSkills(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section id="skills" className="py-40 px-6 relative overflow-hidden bg-brand-bg">
      {/* Accent Light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <p className="text-neutral-400 text-xl leading-relaxed font-light max-w-xl">
            Our development infrastructure is built on modern standards and future-proof technologies. 
            We architect systems that don't just work—they excel. Click a skill category to see our stack.
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
        </div>
        
        <div className="space-y-8">
          {(skills || []).map((skill, index) => {
            const Icon = (Icons as any)[skill.iconName] || Icons.Code;
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
                            <div key={i} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/5 transition-colors hover:bg-white/10">
                              <Icons.ChevronRight className="w-3 h-3 text-brand-accent" />
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
    </section>
  );
}



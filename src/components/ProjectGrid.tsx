import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';
import { subscribeToProjects } from '../services/dataService';
import { Project } from '../types';

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((data) => {
      if (data.length > 0) {
        setProjects(data);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <section id="work" className="py-32 px-6 bg-brand-bg">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-accent font-bold uppercase tracking-[0.2em] text-[10px]">
              <span className="w-10 h-[1px] bg-brand-accent" />
              Selected Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Production Case Studies</h2>
          </div>
          <p className="max-w-md text-brand-text-muted font-light leading-relaxed">
            A selection of high-performance applications and tools that define the vibe-coding philosophy: speed, precision, and architectural elegance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(projects || []).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center pt-16">
          <button className="px-10 py-4 rounded-xl border border-brand-border hover:bg-brand-surface-muted transition-colors font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
            LOAD ARCHIVE
            <span className="font-mono text-[10px] text-brand-text-dim">.v2</span>
          </button>
        </div>
      </div>
    </section>
  );
}



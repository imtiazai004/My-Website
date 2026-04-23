import { motion } from 'motion/react';
import { ExternalLink, Download, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { trackActivity } from '../services/dataService';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const trackInteraction = (type: string) => {
    trackActivity(type, { projectId: project.id, projectTitle: project.title });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-brand-surface border border-brand-border rounded-2xl group overflow-hidden"
      onViewportEnter={() => trackInteraction('PROJECT_VIEW')}
    >
      <div className="relative aspect-video overflow-hidden bg-brand-surface-muted">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a 
            href={project.demoUrl} 
            onClick={() => trackInteraction('DEMO_CLICK')}
            className="p-3 bg-brand-surface text-white border border-brand-border rounded-xl hover:bg-brand-accent hover:border-brand-accent transition-all"
            title="Live Demo"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          {project.downloadUrl && (
            <a 
              href={project.downloadUrl} 
              onClick={() => trackInteraction('DOWNLOAD_CLICK')}
              className="p-3 bg-brand-surface text-white border border-brand-border rounded-xl hover:bg-brand-accent hover:border-brand-accent transition-all"
              title="Download Assets"
              download
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-text-dim uppercase tracking-[0.2em]">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
              {project.title}
            </h3>
          </div>
          <ArrowUpRight className="w-5 h-5 text-brand-text-dim transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        
        <p className="text-brand-text-muted text-sm leading-relaxed font-normal">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono text-brand-accent font-bold">
          {project.tags?.map(tag => (
            <span key={tag} className="uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


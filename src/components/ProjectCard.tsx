import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { WorkProject } from '../data/projects';
import { ProjectVisual, StatusBadge } from './work/ProjectIcon';

interface ProjectCardProps {
  project: WorkProject;
  index: number;
  onOpen?: () => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.6s ease-out',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="relative group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-900/10 bg-white"
    >
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(26,127,230,0.10) 0%, transparent 65%)` }}
      />

      <div className="relative aspect-[16/9] overflow-hidden">
        <ProjectVisual project={project} />
        <div className="absolute top-4 left-4 z-20">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="p-7 flex flex-col flex-grow gap-4 relative z-20">
        <p className="text-xs font-semibold text-brand-accent">{project.category}</p>
        <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900">
          {onOpen ? (
            <button type="button" onClick={onOpen} className="text-left hover:text-brand-accent transition-colors after:absolute after:inset-0 after:z-10">
              {project.title}
            </button>
          ) : (
            project.title
          )}
        </h3>
        <p className="text-slate-600 text-base leading-relaxed">{project.summary}</p>
        <div className="mt-auto pt-5 flex flex-wrap gap-2 border-t border-slate-900/[0.07]">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-slate-900/[0.04] border border-slate-900/10 rounded-md text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

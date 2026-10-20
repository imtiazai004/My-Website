import {
  ShieldAlert, Scissors, Search, ScanText, Store, Smile, Bike, Bot, Sparkles,
  GraduationCap, LineChart, BookOpen, Youtube, Mic, FileText, Eye, Table2,
} from 'lucide-react';
import type { WorkProject } from '../../data/projects';

const ICONS = {
  shield: ShieldAlert,
  scissors: Scissors,
  search: Search,
  scan: ScanText,
  store: Store,
  tooth: Smile,
  bike: Bike,
  bot: Bot,
  sparkles: Sparkles,
  school: GraduationCap,
  chart: LineChart,
  book: BookOpen,
  youtube: Youtube,
  mic: Mic,
  file: FileText,
  eye: Eye,
  table: Table2,
} as const;

export function ProjectIcon({ name, className }: { name: WorkProject['icon']; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}

/** Card/modal header: the project's own illustration if it has one, else an icon on its gradient. */
export function ProjectVisual({ project, iconSize = 'w-14 h-14' }: { project: WorkProject; iconSize?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
      <ProjectIcon name={project.icon} className={`${iconSize} text-white/90`} />
    </div>
  );
}

const STATUS_STYLE: Record<WorkProject['status'], string> = {
  'In daily use': 'bg-emerald-500/90 text-white',
  'Live product': 'bg-emerald-500/90 text-white',
  Live: 'bg-emerald-500/90 text-white',
  'Completed': 'bg-white/90 text-slate-900',
  'In development': 'bg-amber-400/95 text-slate-900',
  Prototype: 'bg-white/90 text-slate-700',
  'Hackathon build': 'bg-white/90 text-slate-700',
};

export function StatusBadge({ status }: { status: WorkProject['status'] }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${STATUS_STYLE[status]}`}>
      {status}
    </span>
  );
}

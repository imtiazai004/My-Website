import { ExternalLink, Github, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';
import type { WorkProject } from '../../data/projects';

/** Only the links a project really has — nothing greyed-out or fake. */
export function ProjectLinks({ project, size = 'md' }: { project: WorkProject; size?: 'sm' | 'md' }) {
  const l = project.links ?? {};
  const pad = size === 'sm' ? 'px-4 py-2 text-xs' : 'px-5 py-2.5 text-sm';
  const primary = `inline-flex items-center gap-2 ${pad} rounded-full font-semibold bg-brand-accent text-white hover:bg-blue-600 transition-colors`;
  const secondary = `inline-flex items-center gap-2 ${pad} rounded-full font-semibold bg-slate-900/[0.05] text-slate-700 hover:bg-slate-900/[0.1] transition-colors`;
  const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('/demos/');

  const items: ReactElement[] = [];
  if (l.page) {
    items.push(
      <Link key="page" to={l.page} className={primary}>
        Product page <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    );
  }
  if (l.live) {
    items.push(
      isInternal(l.live) ? (
        <Link key="live" to={l.live} className={l.page ? secondary : primary}>Open live <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
      ) : (
        <a key="live" href={l.live} target={l.live.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={l.page ? secondary : primary}>
          Open live <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )
    );
  }
  if (l.download) {
    items.push(
      <a key="dl" href={l.download} rel="noopener noreferrer" className={secondary}>
        Download <Download className="w-4 h-4" aria-hidden="true" />
      </a>
    );
  }
  if (l.github) {
    items.push(
      <a key="gh" href={l.github} target="_blank" rel="noopener noreferrer" className={secondary}>
        Source on GitHub <Github className="w-4 h-4" aria-hidden="true" />
      </a>
    );
  }
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">Private project — ask us for a walkthrough.</p>;
  }
  return <div className="flex flex-wrap gap-3">{items}</div>;
}

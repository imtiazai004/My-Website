import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import Navbar from './Navbar';
import { usePageSeo } from '../lib/seo';
import { BUSINESS } from '../config/business';

/** Real 404 page: noindex for browsers here, and a true 404 status for crawlers via middleware.ts. */
export default function NotFound() {
  usePageSeo({ title: `Page not found | ${BUSINESS.brandName}`, noindex: true });

  const links = [
    { to: '/work', label: 'Our work' },
    { to: '/demos', label: 'Live demos' },
    { to: '/guides', label: 'Free guides' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-xl text-center">
          <Compass className="mx-auto mb-6 h-10 w-10 text-brand-accent" aria-hidden="true" />
          <p className="text-sm font-semibold text-brand-accent">404</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900 font-display">This page doesn’t exist</h1>
          <p className="mt-4 text-lg text-slate-600">The link may be old or mistyped. Try one of these instead:</p>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex items-center justify-between rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-slate-800 hover:border-brand-accent hover:text-brand-accent transition-colors">
                  {l.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/" className="mt-8 inline-block text-sm text-slate-500 underline underline-offset-4 hover:text-slate-900">Back to the homepage</Link>
        </div>
      </main>
    </div>
  );
}

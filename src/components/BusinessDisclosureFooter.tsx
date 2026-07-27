import { Link } from 'react-router-dom';
import { BUSINESS, FOOTER_DISCLOSURE } from '../config/business';

export default function BusinessDisclosureFooter() {
  return (
    <footer
      aria-label="Business and legal information"
      className="relative z-20 border-t border-white/10 bg-[#0b1220] px-6 py-8 text-slate-300"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl space-y-1.5">
          <p className="text-sm leading-relaxed text-slate-200">{FOOTER_DISCLOSURE}</p>
          {BUSINESS.registeredOffice && (
            <p className="text-sm leading-relaxed text-slate-400">
              Registered office: {BUSINESS.registeredOffice}
            </p>
          )}
        </div>

        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/privacy" className="text-slate-300 transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-slate-300 transition-colors hover:text-white">
            Terms &amp; Conditions
          </Link>
          <a
            href={`mailto:${BUSINESS.supportEmail}`}
            className="text-slate-300 transition-colors hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

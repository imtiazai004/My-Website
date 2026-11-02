import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, Repeat } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/show-once-automation-repetitive-tasks.pdf';

export default function ShowOnceGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'ShowOnce: The App That Learns Any Repetitive Job by Watching You Do It Once (Free Guide)',
    description:
      'The app that learns any repetitive job by watching you do it once — the demonstration recorder, the replay engine, connected systems in one workflow, the human checkpoint, the exception queue, and the time-saved dashboard. The illustrative time math and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/show-once-automation-repetitive-tasks`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'ShowOnce: The App That Learns Any Repetitive Job by Watching You Do It Once (Free Guide)',
      description:
        'The app that learns any repetitive job by watching you do it once: the demonstration recorder, the replay engine, connected systems in one workflow, the human checkpoint, the exception queue, and the time-saved dashboard — plus the illustrative time math and the full vibe-coding build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/show-once-automation-repetitive-tasks`,
      datePublished: '2026-11-02',
      inLanguage: 'en',
    },
  });

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white scroll-smooth relative overflow-x-hidden">
      <ShaderBackground />
      <div className="grain-bg" />
      <div className="grid-texture" />
      <div className="soft-vignette" />

      <Navbar />

      <main className="relative z-20 px-6 pb-24 pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/guides"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-brand-accent"
          >
            &larr; All guides
          </Link>

          <header className="mb-10 max-w-3xl">
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              <Repeat size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ShowOnce
            </h1>
            <p className="text-lg text-slate-600">
              Every growing business has a job like this: a customer
              sends an order on WhatsApp, and someone copies it into
              the order sheet. A 10-minute job done 5 times a day is
              50 minutes a day — about 18 hours a month — on copying.
              ShowOnce is the app that learns that job by watching you
              do it once, then replays it forever: the demonstration
              recorder, the replay engine, connected systems in one
              workflow, a human checkpoint, an exception queue, and a
              time-saved dashboard — plus the math and the full build
              roadmap.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 3 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="ShowOnce.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
            >
              <Download size={18} /> Download PDF
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <BookOpen size={18} /> Open in new tab
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <iframe
              src={PDF_URL}
              title="ShowOnce (PDF)"
              className="h-[70vh] min-h-[480px] w-full bg-white"
            />
          </div>

          <article className="mx-auto mt-14 max-w-3xl">
            <h2
              className="mb-6 text-2xl font-bold text-slate-900"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The full breakdown
            </h2>
            <div className="space-y-5 text-[17px] leading-relaxed text-slate-700">
              <p>
                Every growing business has a job like this. A customer
                sends an order on WhatsApp, and someone copies it into
                the order sheet. An enquiry arrives by email, and
                someone types the details into the booking form. A
                payment lands, and someone updates the spreadsheet,
                sends the confirmation, and files the receipt. The
                work is not hard. It is the same, every single day.
              </p>
              <p>
                A 10-minute job done 5 times a day is 50 minutes a day
                — gone before lunch, every day, on work that adds
                nothing new. It only gets worse as you grow: more
                orders mean more copying. It is where mistakes live —
                copy a number wrong once and the wrong item ships, the
                wrong price is charged, or the booking is lost. And it
                traps your best people: the person who knows the
                customers, the products, and the answers is stuck
                retyping the same fields instead of serving the next
                customer.
              </p>
              <p>
                Most owners accept this as the price of running a
                business. It is not. It is a job a machine can learn —
                if someone shows it once. On 2 November 2026, a tool
                called Click reached #2 on Product Hunt with a simple
                idea: a managed agents API that works with any model.
                As The Neuron&apos;s digest put it the same day,
                Click watches you demonstrate a repetitive workflow
                and turns it into an AI-agent automation that runs
                across your connected systems. The technology to
                watch-and-repeat is here. What most businesses are
                missing is the app around it — built for their own
                workflow, their own tools, their own team.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>The one-time demonstration recorder</strong> —
                  you do the job once, exactly as you do it today:
                  open the WhatsApp order, copy the details into the
                  order sheet, confirm the total. ShowOnce watches the
                  clicks, the fields, and the order of steps, and
                  turns them into a repeatable workflow. No code, no
                  flowcharts, no explaining the process to a developer.
                </li>
                <li>
                  <strong>The replay engine</strong> — once learned,
                  the workflow runs itself. A new WhatsApp order
                  arrives, and ShowOnce copies it into the order
                  sheet, fills in the totals, and marks it ready — the
                  same way you did it, every time. The job that took
                  10 minutes now takes none.
                </li>
                <li>
                  <strong>Your connected systems, one workflow</strong> —
                  the job rarely lives in one place. ShowOnce connects
                  the tools the business already uses — WhatsApp,
                  email, the order sheet, the booking form, the
                  payment record — so a single demonstration can reach
                  across all of them.
                </li>
                <li>
                  <strong>A human checkpoint where it matters</strong> —
                  before any step that touches a customer — a
                  confirmation, a price, a booking — ShowOnce can
                  pause and ask a human to approve it with one tap.
                  The routine runs itself; the judgment stays with you.
                </li>
                <li>
                  <strong>An exception queue, not a silent failure</strong> —
                  when something does not match the pattern — a new
                  product, an unusual request, a missing detail —
                  ShowOnce does not guess. It puts the case in a short
                  exception queue for a human to handle, and learns
                  from the decision.
                </li>
                <li>
                  <strong>A time-saved dashboard</strong> — every
                  replay is counted. The owner sees how many times
                  each workflow ran this week, how many minutes it
                  saved, and which jobs are still done by hand. The
                  return on the app is visible on one screen, not a
                  matter of faith.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Why this matters
              </h3>
              <p>
                A business does not slow down because the work is hard.
                It slows down because the same easy work has to be done
                again and again, and every new customer adds more of
                it. That is the trap: the better the business does, the
                heavier the admin gets. Hiring helps, but a new hire
                doing the same copying inherits the same mistakes and
                the same cost — plus a salary. An app that learns a job
                by watching it once breaks the link between growth and
                admin. The tenth order costs the same effort as the
                first: none. The business can take more customers
                without taking on more copying — and the people who
                know the customers get their day back.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The business impact, with the math
              </h3>
              <p>
                Take a small shop where one 10-minute job — copying a
                WhatsApp order into the order sheet and confirming it —
                happens 5 times a day. The daily cost: 10 minutes x 5
                orders = 50 minutes a day. The monthly cost: 50
                minutes a day x 22 working days = about 18 hours a
                month, more than two full working days a month spent
                retyping. The yearly cost: about 216 hours a year —
                over five working weeks — on a single repetitive job.
                And that is one job; most businesses have three or
                four like it. These are illustrative figures to show
                the shape of the leak, not a client result.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The build roadmap
              </h3>
              <p>
                This is the kind of tool you can build with vibe coding,
                piece by piece: pick the single most repeated task;
                map the tools it touches and connect to each one
                through its official API; describe the demonstration
                recorder, the replay engine, the human checkpoint, and
                the time-saved dashboard in a prompt template; build
                with v0, Lovable, Bolt or Replit with the
                demonstration-to-workflow logic coded in as the core
                of the app; wire the learned workflow to the
                business&apos;s real tools through their APIs, with a
                managed agent layer — the same watch-and-repeat idea
                behind tools like Click — doing the replay across
                systems; add the human checkpoint and the exception
                queue; and deploy on Vercel or Netlify. The guide
                finishes with the launch checklist: you can name the
                one job your team repeats most, you know how long it
                takes and how often it happens, it crosses more than
                one tool, a copying mistake has cost you before, and
                someone spends more than 30 minutes a day on work
                that never changes. Download it above and stop paying
                the repetition tax on your growth.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={PDF_URL}
                download="ShowOnce.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                <Download size={18} /> Download the Guide
              </a>
            </div>
          </article>

          <p className="mt-8 text-center text-sm text-slate-500">
            Written by {BUSINESS.brandName} — we build websites, tools and
            applications that help businesses grow.
          </p>
        </div>
      </main>
    </div>
  );
}

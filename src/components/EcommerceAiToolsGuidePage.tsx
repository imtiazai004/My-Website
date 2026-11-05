import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, BookOpen, FileText, ShoppingBag, ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import ShaderBackground from './ui/shader-background';
import { usePageSeo } from '../lib/seo';
import { BUSINESS, FOUNDER } from '../config/business';

const PDF_URL = '/guides/ecommerce-ai-tools.pdf';
const ZIP_URL = '/source/ecommerce-ai-tools.zip';
const ORIGIN_URL = 'https://github.com/nexscope-ai/ecommerce-ai-tools';

export default function EcommerceAiToolsGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageSeo({
    title: 'The Ecommerce AI Tools Guide (Free Guide)',
    description:
      'The repo that helps ecommerce sellers — five AI product-video workflows (Image to Video, URL to Video, Avatar Video, Video Clone, Bulk Video), a marketplace data directory for Amazon, TikTok, 1688, Shopify, Shopee and Walmart, and a free Product Gallery page built for search and AI discovery — plus the dashboard I will build out of it and the full build roadmap.',
    canonical: `${BUSINESS.websiteUrl}/guides/ecommerce-ai-tools`,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Ecommerce AI Tools Guide (Free Guide)',
      description:
        'The repo I found that helps ecommerce sellers — five AI product-video workflows, a marketplace data directory for Amazon, TikTok, 1688, Shopify, Shopee and Walmart, and a free Product Gallery page built for search and AI discovery — plus the dashboard I will build out of it, the honest cost, and the full build roadmap.',
      author: { '@type': 'Person', name: FOUNDER.name, url: FOUNDER.url },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS.brandName,
        url: BUSINESS.websiteUrl,
      },
      mainEntityOfPage: `${BUSINESS.websiteUrl}/guides/ecommerce-ai-tools`,
      datePublished: '2026-11-05',
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
              <ShoppingBag size={12} /> Free guide
            </div>
            <h1
              className="mb-3 text-4xl font-bold text-slate-900 md:text-5xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              The Ecommerce AI Tools Guide
            </h1>
            <p className="text-lg text-slate-600">
              I found a useful repo that helps ecommerce sellers. It is on
              GitHub — nexscope-ai/ecommerce-ai-tools — and it is the rare
              one that is actually built for sellers, not developers. Three
              tools inside it, all free to browse: product videos, marketplace
              data, and a free product page. This guide covers what is inside
              it, how you can use it, and the app I will build out of it.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
              <FileText size={13} /> PDF · 5 pages · English
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={PDF_URL}
              download="Ecommerce-AI-Tools-Guide.pdf"
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
            <a
              href={ZIP_URL}
              download="ecommerce-ai-tools.zip"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              <Download size={18} /> Download the code
            </a>
            <a
              href={ORIGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              View origin on GitHub <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <iframe
              src={PDF_URL}
              title="The Ecommerce AI Tools Guide (PDF)"
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
                I went through GitHub&apos;s new AI repos so sellers
                don&apos;t have to. Most of them are built for developers
                — coding agents, agent skills, phone harnesses. This one
                is actually built for sellers: nexscope-ai/ecommerce-ai-tools.
                I read the docs, compared the five video workflows, and
                checked the data directory before writing this guide.
              </p>
              <p>
                The gap it closes is the listing itself. A seller&apos;s
                listing usually fails in three quiet places at once. First,
                the product has no video — a photo sits on the listing
                while every feed around it moves. Second, the keywords are
                guessed — the seller writes what they think buyers search,
                instead of checking what buyers actually search and say.
                Third, the product is invisible to AI — search engines and
                AI systems have no clean public page to read, so they
                cannot find it, quote it, or recommend it. None of those
                three is a sales problem. They are listing problems, and
                they are all fixable with the same three tools.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Tool one — product videos: five workflows
              </h3>
              <p>
                Image to Video from your product photos, URL to Video from
                a listing link, Avatar Video with a presenter, Video Clone
                from a reference clip, and Bulk Video for a whole batch at
                once. You compare the workflows and watch the official
                examples before you generate anything. The directory and
                the examples are free to browse; video generation uses
                credits, so check the estimate in the selected workspace
                before generating.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Tool two — marketplace data: six marketplaces, one directory
              </h3>
              <p>
                One API directory for Amazon, TikTok, 1688, Shopify,
                Shopee and Walmart — product search, reviews, sourcing,
                keywords, marketplace research. You find the data for the
                task, compare the operations, read the official docs, and
                test before you integrate. The rule is simple: find the
                data for the task before you build anything on it.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Tool three — a free product page
              </h3>
              <p>
                The Product Gallery gives your product a public page —
                facts, images, optional video, and your store link — built
                for search and AI discovery, so AI systems can find and
                cite what you sell. Submission, review and listing are
                completely free. No payment, no store account connection.
                Your product stays offline until it is reviewed and
                approved.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The app, piece by piece
              </h3>
              <p>
                This is how I will use the repo to build the app out of
                it — one dashboard where video, data and discovery live
                together, not three tabs:
              </p>
              <ol className="list-decimal space-y-4 pl-6">
                <li>
                  <strong>Video queue</strong> — every listing&apos;s
                  photos turned into videos, batch by batch, through the
                  five workflows.
                </li>
                <li>
                  <strong>Keyword + review watch</strong> — your listings
                  tracked against real marketplace data, so keywords stop
                  being guesses and reviews stop being unread.
                </li>
                <li>
                  <strong>Product page live</strong> — your products
                  listed on the free public page, built for search and AI
                  discovery.
                </li>
                <li>
                  <strong>One dashboard</strong> — video, data and
                  discovery in the same place: which listings have a video,
                  which keywords need fixing, and which products are live
                  in the gallery.
                </li>
              </ol>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                How you can use it
              </h3>
              <p>
                Pick your best photo, open the video workflows, compare
                them, watch an example, and make one video. Then check
                your keywords and reviews in the data directory — find
                your platform and read what buyers actually say. Then
                list the product free in the gallery and get a public page
                built for search and AI. Start with one listing. One
                listing done properly beats ten half-done.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The honest cost
              </h3>
              <p>
                The directories and guides are free to browse. Video
                generation uses credits, so check the estimate in the
                workspace before you generate. API requests follow each
                operation&apos;s access and credit requirements. The
                gallery is $0.
              </p>
              <h3
                className="pt-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                The build roadmap
              </h3>
              <p>
                This guide is the blueprint on which the app is being
                worked from: write the prompt as the spec, build the front
                end and dashboard with a vibe-coding platform (v0,
                Lovable, Bolt or Replit), build the video queue first and
                the keyword watch second, connect the real data through
                the ecommerce Data APIs and the Product Gallery, test the
                queue against three real listings at different stages,
                deploy on Vercel or Netlify, then run the app for one
                month beside the old method and compare the listings with
                video, keywords fixed, and products live in the gallery
                against the month before. Download the guide above and
                try it on one listing first.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ZIP_URL}
                download="ecommerce-ai-tools.zip"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:opacity-90"
              >
                <Download size={18} /> Download the code
              </a>
              <a
                href={PDF_URL}
                download="Ecommerce-AI-Tools-Guide.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
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

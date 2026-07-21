import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, BookOpen, Calendar, Tag, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from './Navbar';
import { getBlueprint } from '../services/dataService';
import { Blueprint } from '../types';

const mdComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-900 mt-10 mb-4 leading-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-3 pb-2 border-b border-slate-200">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-semibold text-slate-600 mt-4 mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-slate-700 leading-relaxed mb-4 text-[15px]">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-slate-700">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-slate-700">{children}</ol>,
  li: ({ children }) => <li className="text-[15px] leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-accent bg-blue-50 pl-4 pr-3 py-3 my-4 rounded-r-xl italic text-slate-600 text-[15px]">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-');
    return isBlock ? (
      <code className="block bg-slate-900 text-green-300 p-4 rounded-xl text-sm font-mono overflow-x-auto whitespace-pre">
        {children}
      </code>
    ) : (
      <code className="bg-slate-100 text-brand-accent px-1.5 py-0.5 rounded text-[13px] font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre className="bg-slate-900 rounded-xl mb-4 overflow-x-auto">{children}</pre>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-accent underline underline-offset-2 hover:opacity-75 transition-opacity">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
  em: ({ children }) => <em className="italic text-slate-600">{children}</em>,
  hr: () => <hr className="border-slate-200 my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-100">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-slate-200 px-4 py-2.5 font-bold text-left text-slate-700 text-[13px] uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-slate-200 px-4 py-2.5 text-slate-700 text-[14px]">{children}</td>
  ),
  tr: ({ children }) => <tr className="even:bg-slate-50">{children}</tr>,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="rounded-xl max-w-full my-4 shadow-sm" />
  ),
};

function generateDownloadHtml(blueprint: Blueprint): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${blueprint.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown-light.min.css" />
  <style>
    body { background: #fff; padding: 2rem 1rem; }
    .markdown-body { box-sizing: border-box; max-width: 860px; margin: 0 auto; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .meta { font-size: 12px; color: #666; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb; }
    @media (max-width: 640px) { .markdown-body { padding: 20px 16px; } }
  </style>
</head>
<body>
  <article class="markdown-body">
    <div class="meta">Blueprint Library &mdash; aisofttechsolution.com &mdash; ${blueprint.category}</div>
    <div id="content"></div>
  </article>
  <script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(blueprint.content)});
  </script>
</body>
</html>`;
}

export default function BlueprintDetail() {
  const { id } = useParams<{ id: string }>();
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBlueprint(id).then(bp => {
      setBlueprint(bp);
      setLoading(false);
      if (bp) document.title = `${bp.title} | Blueprint Library`;
    });
    return () => { document.title = 'Blueprint Library | Soft Tech Solution'; };
  }, [id]);

  const handleDownload = () => {
    if (!blueprint) return;
    const html = generateDownloadHtml(blueprint);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = blueprint.fileName || `${blueprint.title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleOpenInTab = () => {
    if (!blueprint) return;
    const html = generateDownloadHtml(blueprint);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          <Link
            to="/blueprint-library"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blueprint Library
          </Link>

          {loading && (
            <div className="flex items-center justify-center py-32">
              <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && !blueprint && (
            <div className="text-center py-32 text-white/30">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Blueprint not found.</p>
            </div>
          )}

          {!loading && blueprint && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Header — dark section */}
              <div className="mb-10 space-y-4">
                <span className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {blueprint.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {blueprint.title}
                </h1>
                <p className="text-white/50 text-lg leading-relaxed">
                  {blueprint.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/25">
                    <Calendar className="w-3.5 h-3.5" />
                    {blueprint.createdAt?.toDate
                      ? new Date(blueprint.createdAt.toDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Recent'}
                  </span>
                  {blueprint.tags?.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Tag className="w-3.5 h-3.5 text-white/20" />
                      {blueprint.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] text-white/30 font-mono">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={handleOpenInTab}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Full Screen
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent/80 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog content — white card */}
              <div className="bg-white rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="px-8 py-10 md:px-14 md:py-12">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {blueprint.content}
                  </ReactMarkdown>
                </div>

                {/* Bottom CTA inside card */}
                <div className="border-t border-slate-100 px-8 py-6 md:px-14 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-[13px] text-slate-400">Blueprint Library — aisofttechsolution.com</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleOpenInTab}
                      className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:border-slate-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Full Screen
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent/80 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download HTML
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

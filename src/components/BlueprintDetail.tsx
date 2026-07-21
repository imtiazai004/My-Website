import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Download, BookOpen, Calendar, Tag, ExternalLink } from 'lucide-react';
import Navbar from './Navbar';
import { getBlueprint } from '../services/dataService';
import { Blueprint } from '../types';

export default function BlueprintDetail() {
  const { id } = useParams<{ id: string }>();
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(900);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!id) return;
    getBlueprint(id).then(bp => {
      setBlueprint(bp);
      setLoading(false);
      if (bp) document.title = `${bp.title} | Blueprint Library`;
    });
    return () => { document.title = 'Blueprint Library | Soft Tech Solution'; };
  }, [id]);

  const handleIframeLoad = () => {
    try {
      const h = iframeRef.current?.contentWindow?.document.documentElement.scrollHeight;
      if (h && h > 400) setIframeHeight(h + 60);
    } catch {}
  };

  const handleDownload = () => {
    if (!blueprint?.content) return;
    const blob = new Blob([blueprint.content], { type: 'text/html' });
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
    if (!blueprint?.content) return;
    const blob = new Blob([blueprint.content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Back link */}
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

              {/* Header */}
              <div className="mb-8 space-y-4">
                <span className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {blueprint.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {blueprint.title}
                </h1>
                <p className="text-white/50 text-lg leading-relaxed max-w-3xl">
                  {blueprint.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
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

                  {/* Action buttons */}
                  <div className="ml-auto flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleOpenInTab}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Full Screen
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-accent text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent/80 transition-colors shadow-[0_0_16px_rgba(26,127,230,0.25)]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download HTML
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/5 mb-8" />

              {/* Iframe — srcdoc renders HTML directly, no blob URL timing issues */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                <iframe
                  ref={iframeRef}
                  title={blueprint.title}
                  srcDoc={blueprint.content}
                  onLoad={handleIframeLoad}
                  style={{ height: `${iframeHeight}px` }}
                  className="w-full bg-white"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>

              {/* Bottom actions */}
              <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                <button
                  onClick={handleOpenInTab}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Full Screen
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-accent text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent/80 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download This Blueprint
                </button>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tiny, dependency-free Markdown → HTML converter for blog content.
// Supports: headings, bold, italic, inline code, fenced code blocks, links,
// images, blockquotes, unordered/ordered lists, horizontal rules, paragraphs.
// Content is author-controlled (admin only); raw HTML is escaped first.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(text: string): string {
  return text
    // images first: ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // italic (single * or _)
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[^_])_([^_]+)_/g, '$1<em>$2</em>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function renderMarkdown(md: string): string {
  if (!md) return '';
  const src = escapeHtml(md.replace(/\r\n/g, '\n'));
  const lines = src.split('\n');
  const out: string[] = [];
  let i = 0;

  const flushList = (items: string[], ordered: boolean) => {
    if (!items.length) return;
    const tag = ordered ? 'ol' : 'ul';
    out.push(`<${tag}>${items.map(it => `<li>${inline(it)}</li>`).join('')}</${tag}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push(`<pre><code>${buf.join('\n')}</code></pre>`);
      continue;
    }

    // horizontal rule
    if (/^(\s*([-*_])\s*){3,}$/.test(line)) { out.push('<hr />'); i++; continue; }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }

    // blockquote (one or more consecutive > lines)
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote>${inline(buf.join(' '))}</blockquote>`);
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, '')); i++; }
      flushList(items, false);
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s+/, '')); i++; }
      flushList(items, true);
      continue;
    }

    // blank line
    if (/^\s*$/.test(line)) { i++; continue; }

    // paragraph: gather consecutive non-blank, non-special lines
    const para: string[] = [];
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^#{1,4}\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) { para.push(lines[i]); i++; }
    out.push(`<p>${inline(para.join('<br />'))}</p>`);
  }

  return out.join('\n');
}

// Rough reading time from raw markdown (200 wpm).
export function readingTime(md: string): number {
  const words = (md || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

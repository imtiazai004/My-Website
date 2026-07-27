import { useEffect } from 'react';
import { BUSINESS } from '../config/business';

interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object | null;
}

const DEFAULTS = {
  title: `${BUSINESS.brandName} – AI & Web Development Agency`,
  description: `${BUSINESS.brandName} builds high-performance AI-powered web applications, SaaS platforms, and digital experiences.`,
  image: `${BUSINESS.websiteUrl}/og-image.jpg`,
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Imperatively sets document title, meta tags, canonical and optional JSON-LD
 * for client-rendered routes (blog, etc.). Restores nothing on unmount — each
 * route sets its own values on mount, which is sufficient for an SPA.
 */
export function usePageSeo(opts: SeoOptions) {
  useEffect(() => {
    const title = opts.title;
    const description = opts.description ?? DEFAULTS.description;
    const image = opts.image ?? DEFAULTS.image;
    const type = opts.type ?? 'website';

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    if (opts.canonical) {
      setMeta('property', 'og:url', opts.canonical);
      setLink('canonical', opts.canonical);
    }

    // Injected JSON-LD (id-scoped so we replace, not duplicate)
    const ID = 'page-jsonld';
    document.getElementById(ID)?.remove();
    if (opts.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = ID;
      script.text = JSON.stringify(opts.jsonLd);
      document.head.appendChild(script);
    }

    return () => { document.getElementById(ID)?.remove(); };
  }, [opts.title, opts.description, opts.canonical, opts.image, opts.type, opts.jsonLd]);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

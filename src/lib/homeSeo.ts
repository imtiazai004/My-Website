import { BUSINESS, FOUNDER_JSONLD, ORGANIZATION_JSONLD } from '../config/business';
import { SERVICES } from '../data/services';
import { FEATURED_PROJECTS } from '../data/projects';
import { DEMO_APPS } from '../data/demos';

export const HOME_SEO = {
  title: `WhatsApp AI Assistants & Seller Apps | ${BUSINESS.brandName}`,
  description:
    `WhatsApp AI assistants, COD order confirmation, booking and reminder systems, TikTok Shop tools and custom web apps. UK-registered studio — try ${DEMO_APPS.length} live demos before you pay.`,
  canonical: `${BUSINESS.websiteUrl}/`,
};

/**
 * Homepage-only structured data. FAQPage is emitted by the FAQ section itself
 * (from the exact questions shown), so it is not repeated here.
 */
export const HOME_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_JSONLD,
    FOUNDER_JSONLD,
    {
      '@type': 'ProfessionalService',
      '@id': `${BUSINESS.websiteUrl}/#service`,
      name: BUSINESS.brandName,
      url: BUSINESS.websiteUrl,
      image: BUSINESS.logoUrl,
      email: BUSINESS.supportEmail,
      telephone: BUSINESS.whatsapp.uk.tel,
      provider: { '@id': `${BUSINESS.websiteUrl}/#organization` },
      areaServed: [
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Pakistan' },
      ],
      knowsLanguage: ['en', 'ur'],
      description: HOME_SEO.description,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.label, description: `${s.description} For: ${s.forWho}` },
        })),
      },
    },
    {
      '@type': 'ItemList',
      name: 'Featured work',
      url: `${BUSINESS.websiteUrl}/work`,
      itemListElement: FEATURED_PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BUSINESS.websiteUrl}/work#${p.slug}`,
        name: p.title,
      })),
    },
  ],
};

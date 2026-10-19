export const BUSINESS = {
  brandName: 'AI Soft Tech Solution',
  legalCompanyName: 'Atlantic LTD STORE LIMITED',
  statementDescriptor: 'AI SOFT TECH SOLUTION',
  companyNumber: null as string | null,
  registeredOffice: null as string | null,
  /** ISO country of registration (England and Wales). */
  registeredCountry: 'GB',
  supportEmail: 'info@aisofttechsolution.com',
  websiteUrl: 'https://aisofttechsolution.com',
  logoUrl: 'https://aisofttechsolution.com/logo.png',
  whatsapp: {
    uk: { display: '+44 7462 086661', href: 'https://wa.me/447462086661', tel: '+44-7462-086661' },
    pk: { display: '+92 300 5863032', href: 'https://wa.me/923005863032', tel: '+92-300-5863032' },
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/imtiazahmad004',
    x: 'https://x.com/imtiazahmadPTI',
    github: 'https://github.com/imtiazai004',
  },
} as const;

/** The founder — used for author bylines and Person structured data. */
export const FOUNDER = {
  name: 'Imtiaz Ahmad',
  jobTitle: 'Founder & Lead Engineer',
  url: BUSINESS.social.linkedin,
  sameAs: [BUSINESS.social.linkedin, BUSINESS.social.github, BUSINESS.social.x],
} as const;

export const FOOTER_DISCLOSURE = `${BUSINESS.brandName} is operated by ${BUSINESS.legalCompanyName}, a company registered in England and Wales${
  BUSINESS.companyNumber ? ` under company number ${BUSINESS.companyNumber}` : ''
}.`;

export const PAYMENT_DISCLOSURE = `Payments for ${BUSINESS.brandName} are processed by ${BUSINESS.legalCompanyName}.`;

export const STATEMENT_DESCRIPTOR_DISCLOSURE = `Your bank or card statement may show ${BUSINESS.statementDescriptor}.`;

/** schema.org Person node for the founder (reuse inside @graph arrays). */
export const FOUNDER_JSONLD = {
  '@type': 'Person',
  '@id': `${BUSINESS.websiteUrl}/#founder`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.jobTitle,
  url: FOUNDER.url,
  sameAs: [...FOUNDER.sameAs],
  worksFor: { '@id': `${BUSINESS.websiteUrl}/#organization` },
};

/** schema.org Organization node (also embedded statically in index.html). */
export const ORGANIZATION_JSONLD = {
  '@type': 'Organization',
  '@id': `${BUSINESS.websiteUrl}/#organization`,
  name: BUSINESS.brandName,
  legalName: BUSINESS.legalCompanyName,
  url: BUSINESS.websiteUrl,
  logo: BUSINESS.logoUrl,
  email: BUSINESS.supportEmail,
  founder: { '@id': `${BUSINESS.websiteUrl}/#founder` },
  address: { '@type': 'PostalAddress', addressCountry: BUSINESS.registeredCountry },
  sameAs: [BUSINESS.social.linkedin, BUSINESS.social.github, BUSINESS.social.x],
};

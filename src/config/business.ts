export const BUSINESS = {
  brandName: 'AI Soft Tech Solution',
  legalCompanyName: 'Atlantic LTD STORE LIMITED',
  statementDescriptor: 'AI SOFT TECH SOLUTION',
  companyNumber: null as string | null,
  registeredOffice: null as string | null,
  supportEmail: 'info@aisofttechsolution.com',
  websiteUrl: 'https://aisofttechsolution.com',
} as const;

export const FOOTER_DISCLOSURE = `${BUSINESS.brandName} is operated by ${BUSINESS.legalCompanyName}, a company registered in England and Wales${
  BUSINESS.companyNumber ? ` under company number ${BUSINESS.companyNumber}` : ''
}.`;

export const PAYMENT_DISCLOSURE = `Payments for ${BUSINESS.brandName} are processed by ${BUSINESS.legalCompanyName}.`;

export const STATEMENT_DESCRIPTOR_DISCLOSURE = `Your bank or card statement may show ${BUSINESS.statementDescriptor}.`;

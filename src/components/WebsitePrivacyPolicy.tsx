import { useEffect } from 'react';
import { BUSINESS } from '../config/business';
import { usePageSeo } from '../lib/seo';
import { LegalPageLayout, LegalSection } from './LegalPageLayout';

export default function WebsitePrivacyPolicy() {
  useEffect(() => window.scrollTo(0, 0), []);

  usePageSeo({
    title: `Privacy Policy | ${BUSINESS.brandName}`,
    description: `How ${BUSINESS.legalCompanyName}, operating as ${BUSINESS.brandName}, handles information submitted through this website.`,
    canonical: `${BUSINESS.websiteUrl}/privacy`,
  });

  return (
    <LegalPageLayout
      title="Privacy Policy"
      description={`This policy explains how information is handled when you visit ${BUSINESS.brandName} or contact us about our services.`}
      lastUpdated="July 27, 2026"
    >
      <LegalSection title="1. Business operator and responsibility" highlighted>
        <p>
          For the purposes of this Privacy Policy, {BUSINESS.brandName} is operated by{' '}
          {BUSINESS.legalCompanyName}.
        </p>
        <p>
          {BUSINESS.legalCompanyName} is responsible for operating the {BUSINESS.brandName} platform and
          handling personal information in accordance with this Privacy Policy.
        </p>
        {BUSINESS.companyNumber && <p>Company number: {BUSINESS.companyNumber}</p>}
        {BUSINESS.registeredOffice && <p>Registered office: {BUSINESS.registeredOffice}</p>}
      </LegalSection>

      <LegalSection title="2. Information we handle">
        <p>Depending on how you use the website, we may handle:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Your email address and the message you submit through the contact form.</li>
          <li>Technical activity information such as the page visited, browser user agent, and screen size.</li>
          <li>Information you choose to provide when discussing or commissioning a project.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <p>
          We use information to respond to enquiries, provide and improve our services, maintain website
          security and reliability, understand website usage, and keep appropriate business records.
        </p>
      </LegalSection>

      <LegalSection title="4. Service providers">
        <p>
          The website uses service providers, including Firebase for website data and contact submissions and
          Vercel for hosting and analytics. These providers may process technical or submitted information as
          needed to provide their services to us.
        </p>
      </LegalSection>

      <LegalSection title="5. Retention and security">
        <p>
          We retain information only for as long as reasonably needed for the purpose for which it was
          collected, our business records, or applicable legal requirements. We use reasonable technical and
          organisational measures to protect information, but no online service can guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="6. Your choices">
        <p>
          You may contact us to ask about personal information you have submitted, request a correction, or
          raise a privacy concern. We may need to verify your identity before acting on a request.
        </p>
      </LegalSection>

      <LegalSection title="7. Updates to this policy">
        <p>
          We may update this policy when our website, services, or information-handling practices change. The
          latest version will be published on this page with its updated date.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          Privacy questions can be sent to{' '}
          <a className="font-semibold text-brand-accent hover:underline" href={`mailto:${BUSINESS.supportEmail}`}>
            {BUSINESS.supportEmail}
          </a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

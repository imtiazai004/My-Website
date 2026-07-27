import { useEffect } from 'react';
import { BUSINESS, PAYMENT_DISCLOSURE, STATEMENT_DESCRIPTOR_DISCLOSURE } from '../config/business';
import { usePageSeo } from '../lib/seo';
import { LegalPageLayout, LegalSection } from './LegalPageLayout';

export default function TermsAndConditions() {
  useEffect(() => window.scrollTo(0, 0), []);

  usePageSeo({
    title: `Terms & Conditions | ${BUSINESS.brandName}`,
    description: `Terms governing use of the ${BUSINESS.brandName} website and services operated by ${BUSINESS.legalCompanyName}.`,
    canonical: `${BUSINESS.websiteUrl}/terms`,
  });

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      description={`These Terms explain who operates ${BUSINESS.brandName} and the basis on which we provide our website and services.`}
      lastUpdated="July 27, 2026"
    >
      <LegalSection title="1. Who we are" highlighted>
        <p>
          {BUSINESS.brandName} is a trading and customer-facing brand operated by {BUSINESS.legalCompanyName},
          a company registered in England and Wales. In these Terms, “{BUSINESS.brandName}”, “we”, “us”,
          and “our” refer to {BUSINESS.legalCompanyName}.
        </p>
        {BUSINESS.companyNumber && <p>Company number: {BUSINESS.companyNumber}</p>}
        {BUSINESS.registeredOffice && <p>Registered office: {BUSINESS.registeredOffice}</p>}
      </LegalSection>

      <LegalSection title="2. Scope of these Terms">
        <p>
          These Terms apply to your use of this website and to services purchased from us. A proposal,
          statement of work, order form, or other written agreement may include additional terms for a
          particular project. If that agreement conflicts with these website Terms, the specific written
          agreement will apply to that project.
        </p>
      </LegalSection>

      <LegalSection title="3. Services and proposals">
        <p>
          Service scope, deliverables, timing, fees, dependencies, and acceptance criteria are confirmed in
          the applicable proposal or written agreement. Website descriptions are general information and do
          not create a project commitment until both parties agree the relevant scope.
        </p>
      </LegalSection>

      <LegalSection title="4. Payments and statement descriptor" highlighted>
        <p>{PAYMENT_DISCLOSURE}</p>
        <p>{STATEMENT_DESCRIPTOR_DISCLOSURE}</p>
        <p>
          The amount, currency, due date, and any recurring billing terms will be shown in the applicable
          proposal, invoice, order, or checkout before payment is due.
        </p>
      </LegalSection>

      <LegalSection title="5. Cancellations and refunds">
        <p>
          This policy applies to purchases made from {BUSINESS.brandName}, which is operated by{' '}
          {BUSINESS.legalCompanyName}. Any cancellation or refund terms for a service are set out in the
          applicable proposal, order, or written agreement. Please contact us before cancelling a project or
          disputing a charge so we can review the agreed terms and work completed.
        </p>
      </LegalSection>

      <LegalSection title="6. Customer responsibilities">
        <p>
          You are responsible for providing accurate information, timely feedback, necessary access, and any
          materials required for the agreed work. You must have permission to provide us with any content,
          data, credentials, or intellectual property used for your project.
        </p>
      </LegalSection>

      <LegalSection title="7. Intellectual property">
        <p>
          Ownership and licence terms for project deliverables are defined in the applicable proposal or
          written agreement. Third-party software, open-source components, fonts, media, and platform services
          remain subject to their own licence terms.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          Questions about these Terms or a purchase can be sent to{' '}
          <a className="font-semibold text-brand-accent hover:underline" href={`mailto:${BUSINESS.supportEmail}`}>
            {BUSINESS.supportEmail}
          </a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

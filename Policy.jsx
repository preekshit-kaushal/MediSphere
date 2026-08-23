import React from 'react';
import PageHero from '../components/PageHero';

const termsContent = [
  ['Applicability', 'These terms apply to online transactions, appointment bookings, bill payments, and any other services offered through our website.'],
  ['Information accuracy', 'Patient details and cardholder name are required for processing. Providing false information may result in cancellation of the transaction without refund.'],
  ['Appointments', 'Booking window: 8:00 AM – 10:00 PM daily. Late arrivals may be treated as walk-in patients, subject to specialist availability.'],
  ['Disclaimers', 'Information on this site is provided "as is," without warranty of any kind, express or implied.'],
  ['Contact', 'Questions about these terms? Email us at MediSphere@gmail.com.'],
];

const privacyContent = [
  ['Communication', 'We may reach out by phone, SMS, messaging apps, or email for appointment confirmations, report availability, and relevant health updates.'],
  ['Changes to this policy', 'We may amend this policy from time to time. Changes take effect immediately upon posting.'],
  ['Linked websites', 'Our website may contain links to third-party sites. We do not guarantee the security or privacy of information you provide on those sites.'],
  ['Law & jurisdiction', 'This policy is governed by the laws of India.'],
  ['Contact', 'Questions about this policy? Email us at MediSphere@gmail.com.'],
];

export default function Policy({ terms }) {
  const content = terms ? termsContent : privacyContent;

  return (
    <>
      <PageHero title={terms ? 'Terms & Conditions.' : 'Privacy Policy'}>
        {terms
          ? 'The rules that govern your use of MediSphere services.'
          : 'How we collect, use, and safeguard your information.'}
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="prose reveal">
            {!terms && (
              <p>
                MediSphere is committed to protecting your personal and medical information in accordance
                with applicable privacy laws and HIPAA-aligned principles.
              </p>
            )}
            {content.map(([title, text]) => (
              <React.Fragment key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

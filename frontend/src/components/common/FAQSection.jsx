import React from 'react';
import { ChevronDownIcon, ShieldCheckIcon } from './Icons';

export const FAQ_ITEMS = [
  {
    id: 'faq-earnings',
    category: 'Commercial Model',
    question: 'How does EthAum earn money?',
    answer:
      'EthAum charges participating accredited hospital systems a fixed administrative infrastructure fee for case dossier compilation and secure transmission. EthAum does not take percentage referral cuts that bias clinical recommendations, and patients never pay hidden quote markups.',
    todo: 'TODO: Finalize international hospital commercial fee structure and optional patient premium tier policies.',
  },
  {
    id: 'faq-delete-records',
    category: 'Privacy & Sovereignty',
    question: 'How can I permanently delete my medical records?',
    answer:
      'You maintain full data sovereignty over all submitted records. You can export or permanently delete your diagnostic scans, physician notes, and personal dossier from your account settings at any time. Once requested, files are purged from encrypted object storage.',
    todo: 'TODO: Define statutory multi-jurisdiction data retention rules where cross-border clinical audit laws apply.',
  },
  {
    id: 'faq-surgery-decision',
    category: 'Clinical Governance',
    question: 'Who decides whether surgery is needed?',
    answer:
      'Clinical evaluation and surgical candidacy decisions are made exclusively by licensed medical doctors and destination hospital surgical department heads. EthAum operates strictly as an administrative coordination service and does not diagnose, prescribe, or determine clinical suitability.',
  },
  {
    id: 'faq-complications',
    category: 'Post-Op Protocol',
    question: 'What happens if complications arise after returning home?',
    answer:
      'Every participating accredited hospital proposal must include a formal discharge summary and clinical handover note for your local physician, as well as a defined window for post-operative remote follow-up consultations with your operating surgical team.',
    todo: 'TODO: Define standard international medical travel complication insurance policies and formal emergency escalation channels.',
  },
  {
    id: 'faq-visas',
    category: 'Travel Logistics',
    question: 'What are the visa requirements for medical travel?',
    answer:
      'Visa regulations depend on your citizenship and destination jurisdiction. Many countries offer dedicated medical entry visas, while others allow planned care under standard visitor permits. Upon proposal acceptance, the hospital provides official clinical admission letters to support consular paperwork.',
    todo: 'TODO: Publish country-by-country consular documentation checklist and visa assistance partnership guidelines.',
  },
];

export function FAQSection({ items = FAQ_ITEMS }) {
  return (
    <section
      id="faq"
      className="faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <span className="faq-tag">Governance & Transparency</span>
          <h2 id="faq-heading" className="faq-main-heading">
            Frequently asked questions
          </h2>
          <p className="faq-lead-sub">
            Clear answers on medical governance, surgeon evaluations, data privacy, and hospital pricing.
          </p>
        </div>

        <div className="faq-accordion-container">
          {items.map((item, idx) => (
            <details
              key={item.id}
              className="faq-accordion-item"
              id={item.id}
              open={idx === 0 ? true : undefined}
            >
              <summary className="faq-summary-row">
                <div className="faq-question-lockup">
                  {item.category && (
                    <span className="faq-category-tag">{item.category}</span>
                  )}
                  <span className="faq-question-text">{item.question}</span>
                </div>
                <span className="faq-chevron-wrapper" aria-hidden="true">
                  <ChevronDownIcon size={16} />
                </span>
              </summary>
              <div className="faq-answer-drawer animate-fade-in">
                <p className="faq-answer-text">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Support Callout */}
        <div className="faq-support-strip">
          <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)' }} />
          <span>
            Have a question about specific medical records or travel criteria?{' '}
            <a href="mailto:coordination@ethaum.example.com" className="support-link">
              Contact our clinical coordination desk →
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
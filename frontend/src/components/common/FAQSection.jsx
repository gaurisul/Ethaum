import React from 'react';
import Badge from './Badge';
import { ChevronDownIcon } from './Icons';

export const FAQ_ITEMS = [
  {
    id: 'faq-earnings',
    question: 'How does EthAum earn money?',
    answer:
      'EthAum charges participating accredited hospital systems a fixed administrative infrastructure fee for case dossier compilation and secure transmission. EthAum does not take percentage referral cuts that bias clinical recommendations, and patients never pay hidden quote markups.',
    todo: 'TODO: Finalize international hospital commercial fee structure and optional patient premium tier policies.',
  },
  {
    id: 'faq-delete-records',
    question: 'How can I permanently delete my medical records?',
    answer:
      'You maintain full data sovereignty over all submitted records. You can export or permanently delete your diagnostic scans, physician notes, and personal dossier from your account settings at any time. Once requested, files are purged from encrypted object storage.',
    todo: 'TODO: Define statutory multi-jurisdiction data retention rules where cross-border clinical audit laws apply.',
  },
  {
    id: 'faq-surgery-decision',
    question: 'Who decides whether surgery is needed?',
    answer:
      'Clinical evaluation and surgical candidacy decisions are made exclusively by licensed medical doctors and destination hospital surgical department heads. EthAum operates strictly as an administrative coordination service and does not diagnose, prescribe, or determine clinical suitability.',
  },
  {
    id: 'faq-complications',
    question: 'What happens if complications arise after returning home?',
    answer:
      'Every participating accredited hospital proposal must include a formal discharge summary and clinical handover note for your local physician, as well as a defined window for post-operative remote follow-up consultations with your operating surgical team.',
    todo: 'TODO: Define standard international medical travel complication insurance policies and formal emergency escalation channels.',
  },
  {
    id: 'faq-visas',
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
      style={{
        padding: 'var(--space-16) 0',
        backgroundColor: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
      aria-labelledby="faq-heading"
    >
      <div className="container" style={{ maxWidth: '820px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <Badge variant="teal" style={{ marginBottom: 'var(--space-3)' }}>
            Frequently asked questions
          </Badge>
          <h2 id="faq-heading">Frequently asked questions about medical coordination.</h2>
          <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
            Plain explanations of our administrative model, patient privacy rights, and travel logistics.
          </p>
        </div>

        <div className="faq-list">
          {items.map((item) => (
            <details key={item.id} className="faq-item" id={item.id}>
              <summary className="faq-summary">
                <span className="faq-question">{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <ChevronDownIcon size={16} />
                </span>
              </summary>
              <div className="faq-content">
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;

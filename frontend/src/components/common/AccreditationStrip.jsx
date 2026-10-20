import React from 'react';
import { ShieldCheckIcon, LockIcon, CheckCircleIcon } from './Icons';

export const ACCREDITATION_BODIES = [
  {
    code: 'JCI',
    name: 'Joint Commission International',
    category: 'Hospital Accreditation',
    badge: 'Gold Seal of Approval',
  },
  {
    code: 'ISO 9001 / 15189',
    name: 'Clinical quality & diagnostic labs',
    category: 'International Standardization',
    badge: 'Quality Management',
  },
  {
    code: 'ACHS International',
    name: 'Healthcare standards & safety',
    category: 'Clinical Governance',
    badge: 'Australian Council Standards',
  },
  {
    code: 'CQC / National Statutory',
    name: 'Statutory health inspection boards',
    category: 'Jurisdictional Oversight',
    badge: 'Statutory Inspection',
  },
];

export function AccreditationStrip() {
  return (
    <section
      className="accreditation-strip-container"
      aria-label="Accreditation standards"
    >
      <div className="container">
        <div className="accreditation-strip-inner">
          <div className="accreditation-strip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)' }} />
              <span className="accreditation-title">
                Network Clinical Accreditation Baseline
              </span>
            </div>
            <div className="accreditation-encryption-pill">
              <LockIcon size={12} style={{ color: 'var(--color-brand-accent)' }} />
              <span>256-bit HIPAA-compliant encryption</span>
            </div>
          </div>

          <div className="accreditation-badges-grid">
            {ACCREDITATION_BODIES.map((acc) => (
              <div key={acc.code} className="accreditation-badge-card">
                <div className="accreditation-code-row">
                  <span className="accreditation-code">{acc.code}</span>
                  <CheckCircleIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
                </div>
                <div className="accreditation-name">{acc.name}</div>
                <div className="accreditation-cat">{acc.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccreditationStrip;
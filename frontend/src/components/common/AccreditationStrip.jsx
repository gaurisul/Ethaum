import React from 'react';
import { ShieldCheckIcon } from './Icons';

export const ACCREDITATION_BODIES = [
  {
    code: 'JCI',
    name: 'Joint Commission International',
    category: 'Hospital accreditation',
  },
  {
    code: 'ISO 9001 / 15189',
    name: 'Clinical quality & labs',
    category: 'International standardization',
  },
  {
    code: 'ACHS International',
    name: 'Healthcare standards',
    category: 'Clinical governance',
  },
  {
    code: 'CQC / National Statutory',
    name: 'Statutory health boards',
    category: 'Jurisdictional oversight',
  },
];

export function AccreditationStrip() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        padding: 'var(--space-6) 0',
      }}
      aria-label="Accreditation standards"
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)' }} />
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Network clinical accreditation baseline
              </span>
            </div>
            {/* Licensed partner accreditation standards */}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            {ACCREDITATION_BODIES.map((acc) => (
              <div
                key={acc.code}
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {acc.code}
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                  }}
                >
                  {acc.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccreditationStrip;

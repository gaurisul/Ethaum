import React, { useState } from 'react';
import Badge from './Badge';
import { ChevronDownIcon, CheckIcon, BuildingIcon } from './Icons';

export const SAMPLE_PROPOSALS = [
  {
    id: 'quote-zurich',
    hospitalName: 'Zurich St. Anna Medical Center',
    location: 'Zurich, Switzerland',
    accreditation: 'ACHS / Swiss Med',
    procedureName: 'Total Joint Arthroplasty',
    currency: 'USD',
    isSample: true,
    disclaimer: 'Sample figures for demonstration only',
    items: [
      {
        id: 'surg',
        name: 'Surgeon and anesthesia team fees',
        amount: 5400,
        detail: 'Board-certified operating surgeon, assistant surgical fellow, and anesthesiologist throughout surgery.',
      },
      {
        id: 'theat',
        name: 'Operating theater & sterilization',
        amount: 4200,
        detail: '3.5 hours sterile surgical suite access, complete sterile instrumentation trays, and intraoperative fluoroscopy.',
      },
      {
        id: 'impl',
        name: 'Joint prosthesis & surgical supplies',
        amount: 3800,
        detail: 'Standard FDA/CE-cleared joint prosthesis (modular titanium femoral stem and ceramic articulation head).',
      },
      {
        id: 'inpat',
        name: 'Inpatient hospital stay (4 nights)',
        amount: 3600,
        detail: 'Private telemetry recovery room, 24/7 registered nurse care, routine post-op laboratory panels, and medications.',
      },
      {
        id: 'rehab',
        name: 'In-hospital physical rehabilitation',
        amount: 1400,
        detail: 'Daily mobility and gait re-education sessions with licensed musculoskeletal physical therapist prior to discharge.',
      },
    ],
  },
  {
    id: 'quote-london',
    hospitalName: 'London Wellington Surgical Institute',
    location: 'London, United Kingdom',
    accreditation: 'CQC / JCI Accredited',
    procedureName: 'Total Joint Arthroplasty',
    currency: 'USD',
    isSample: true,
    disclaimer: 'Sample figures for demonstration only',
    items: [
      {
        id: 'surg',
        name: 'Surgeon and anesthesia team fees',
        amount: 6100,
        detail: 'Consultant orthopedic lead, operating registrar, and consultant anesthesiologist with continuous regional block.',
      },
      {
        id: 'theat',
        name: 'Operating theater & sterilization',
        amount: 4600,
        detail: 'Laminar airflow orthopedic theater with robotic navigation guidance and single-use sterile procedure packs.',
      },
      {
        id: 'impl',
        name: 'Joint prosthesis & surgical supplies',
        amount: 4100,
        detail: 'CE-marked dual-mobility joint component with verified manufacturer implant passport and trace verification.',
      },
      {
        id: 'inpat',
        name: 'Inpatient hospital stay (3 nights)',
        amount: 3900,
        detail: 'Private en-suite recovery ward, round-the-clock clinical observation, diagnostics, and pharmaceutical support.',
      },
      {
        id: 'rehab',
        name: 'In-hospital physical rehabilitation',
        amount: 1650,
        detail: 'Bi-daily dedicated physiotherapy sessions, safe transfer training, and home mobility exercise plan handover.',
      },
    ],
  },
];

function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProposalCompare({ proposals = SAMPLE_PROPOSALS }) {
  const [viewMode, setViewMode] = useState('one'); // 'one' | 'compare'
  const [expandedItems, setExpandedItems] = useState({
    'quote-zurich-surg': true, // start with one expanded to demonstrate capability
  });

  const toggleItem = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const calculateTotal = (proposal) =>
    proposal.items.reduce((sum, item) => sum + item.amount, 0);

  const displayedProposals = viewMode === 'one' ? [proposals[0]] : proposals;

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        border: '1px solid var(--color-border-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
      }}
      aria-label="Interactive proposal comparison"
    >
      {/* Header and View Mode Toggle */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
          paddingBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--color-brand-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'block',
            }}
          >
            Sample standard proposal
          </span>
          <h3
            style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '2px 0 0 0',
            }}
          >
            Itemized coordination quotes
          </h3>
        </div>

        {/* View Switcher Toggle */}
        <div
          role="radiogroup"
          aria-label="Quote comparison view mode"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '3px',
            gap: '2px',
          }}
        >
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === 'one'}
            onClick={() => setViewMode('one')}
            style={{
              padding: '0.35rem 0.875rem',
              fontSize: 'var(--font-size-xs)',
              fontWeight: viewMode === 'one' ? 600 : 500,
              backgroundColor: viewMode === 'one' ? 'var(--color-brand-primary)' : 'transparent',
              color: viewMode === 'one' ? 'var(--color-brand-primary-text)' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            className="proposal-mode-btn"
          >
            One quote
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === 'compare'}
            onClick={() => setViewMode('compare')}
            style={{
              padding: '0.35rem 0.875rem',
              fontSize: 'var(--font-size-xs)',
              fontWeight: viewMode === 'compare' ? 600 : 500,
              backgroundColor: viewMode === 'compare' ? 'var(--color-brand-primary)' : 'transparent',
              color: viewMode === 'compare' ? 'var(--color-brand-primary-text)' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            className="proposal-mode-btn"
          >
            Compare (2 hospitals)
          </button>
        </div>
      </div>

      {/* Proposals Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'compare' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {displayedProposals.map((proposal) => {
          const total = calculateTotal(proposal);

          return (
            <div
              key={proposal.id}
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              {/* Proposal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-brand-accent)', marginBottom: '2px' }}>
                    <BuildingIcon size={14} />
                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
                      {proposal.location}
                    </span>
                  </div>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, margin: 0 }}>
                    {proposal.hospitalName}
                  </h4>
                </div>
                <Badge variant="teal" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                  {proposal.accreditation}
                </Badge>
              </div>

              {/* Procedure subtitle */}
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                Target procedure: <strong>{proposal.procedureName}</strong>
              </div>

              {/* Itemized Line Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {proposal.items.map((item) => {
                  const key = `${proposal.id}-${item.id}`;
                  const isExpanded = !!expandedItems[key];

                  return (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: 'var(--color-bg-subtle)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        transition: 'background-color var(--transition-fast)',
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`detail-${key}`}
                        onClick={() => toggleItem(key)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 'var(--space-2)',
                          padding: '0.625rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: 'var(--color-text-primary)',
                        }}
                        className="proposal-item-toggle"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                          <ChevronDownIcon
                            size={14}
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform var(--transition-fast)',
                              color: 'var(--color-brand-accent)',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              fontWeight: 600,
                              lineHeight: 1.3,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums',
                            color: 'var(--color-text-primary)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatUSD(item.amount)}
                        </span>
                      </button>

                      {isExpanded && (
                        <div
                          id={`detail-${key}`}
                          style={{
                            padding: '0 0.75rem 0.625rem 1.85rem',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.5,
                            borderTop: '1px dashed var(--color-border-subtle)',
                            paddingTop: '0.4rem',
                          }}
                        >
                          {item.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Total Summary Row */}
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--color-border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'block' }}>
                    Estimated package total
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Sample figures for demonstration
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-family-sans)',
                    color: 'var(--color-text-primary)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatUSD(total)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grounding Footer Notice */}
      <div
        style={{
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <CheckIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
          <span>Line items expand for clinical breakdown. All quotes include emergency contingency terms.</span>
        </div>
        <span style={{ fontStyle: 'italic' }}>Sample figures for demonstration — not clinical quotes</span>
      </div>
    </div>
  );
}

export default ProposalCompare;

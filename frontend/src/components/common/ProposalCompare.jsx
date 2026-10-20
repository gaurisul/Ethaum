import React, { useState } from 'react';
import Badge from './Badge';
import { ChevronDownIcon, CheckIcon, BuildingIcon, InfoIcon, ShieldCheckIcon } from './Icons';

export const SAMPLE_PROPOSALS = [
  {
    id: 'quote-zurich',
    hospitalName: 'Zurich St. Anna Medical Center',
    location: 'Zurich, Switzerland',
    accreditation: 'ACHS / Swiss Med',
    procedureName: 'Total Joint Arthroplasty (Hip / Knee)',
    currency: 'USD',
    isSample: true,
    surgeonLead: 'Prof. Dr. med. H. Keller, FMH',
    surgeonTitle: 'Chief of Musculoskeletal Surgery (18+ yrs tenure)',
    inpatientStay: '4 nights in private telemetry suite',
    rehabSummary: 'Daily dedicated physical rehabilitation prior to discharge',
    contingencyTerm: 'Emergency intra-op contingency covered up to $5,000',
    prosthesisModel: 'CE/FDA modular titanium stem & ceramic articulation head',
    items: [
      {
        id: 'surg',
        name: 'Surgeon and anesthesia team fees',
        amount: 5400,
        detail: 'Board-certified operating surgeon, assistant surgical fellow, and anesthesiologist throughout surgery.',
        tooltip: 'Includes pre-op clinical review, surgical execution, surgical fellowship assistance, and continuous anesthesiology telemetry.',
      },
      {
        id: 'theat',
        name: 'Operating theater & sterilization',
        amount: 4200,
        detail: '3.5 hours sterile surgical suite access, complete sterile instrumentation trays, and intraoperative fluoroscopy.',
        tooltip: 'Ultra-clean laminar airflow Class-1 theater, autoclave verification tracking, disposable drapes, and fluoroscopy imaging.',
      },
      {
        id: 'impl',
        name: 'Joint prosthesis & surgical supplies',
        amount: 3800,
        detail: 'Standard FDA/CE-cleared joint prosthesis (modular titanium femoral stem and ceramic articulation head).',
        tooltip: 'Traceable implant passport with manufacturer lot ID, biocompatible titanium fixation, and high-density ceramic articulation.',
      },
      {
        id: 'inpat',
        name: 'Inpatient hospital stay (4 nights)',
        amount: 3600,
        detail: 'Private telemetry recovery room, 24/7 registered nurse care, routine post-op laboratory panels, and medications.',
        tooltip: 'Private en-suite recovery room, continuous vitals monitoring, daily physician ward rounds, and complete pharmaceuticals.',
      },
      {
        id: 'rehab',
        name: 'In-hospital physical rehabilitation',
        amount: 1400,
        detail: 'Daily mobility and gait re-education sessions with licensed musculoskeletal physical therapist prior to discharge.',
        tooltip: 'Licensed orthopedic physiotherapist sessions twice daily, gait training, stair assessment, and home exercise dossier.',
      },
    ],
  },
  {
    id: 'quote-london',
    hospitalName: 'London Wellington Surgical Institute',
    location: 'London, United Kingdom',
    accreditation: 'CQC / JCI Accredited',
    procedureName: 'Total Joint Arthroplasty (Hip / Knee)',
    currency: 'USD',
    isSample: true,
    surgeonLead: 'Mr. J. Arbuthnot, FRCS (Tr & Orth)',
    surgeonTitle: 'Consultant Orthopedic Surgeon (Royal College Fellow)',
    inpatientStay: '3 nights in private en-suite recovery ward',
    rehabSummary: 'Twice daily physiotherapist sessions & stair mobility sign-off',
    contingencyTerm: 'Comprehensive complication coverage backed by NHS liaison protocol',
    prosthesisModel: 'CE dual-mobility ceramic articulation with trabecular metal backing',
    items: [
      {
        id: 'surg',
        name: 'Surgeon and anesthesia team fees',
        amount: 6100,
        detail: 'Consultant orthopedic lead, operating registrar, and consultant anesthesiologist with continuous regional block.',
        tooltip: 'Consultant-led surgical team, registered clinical assistant, and regional nerve block analgesia.',
      },
      {
        id: 'theat',
        name: 'Operating theater & sterilization',
        amount: 4600,
        detail: 'Laminar airflow orthopedic theater with robotic navigation guidance and single-use sterile procedure packs.',
        tooltip: 'Robotic navigation alignment tracking, laminar sterile airflow, and certified single-use procedure packs.',
      },
      {
        id: 'impl',
        name: 'Joint prosthesis & surgical supplies',
        amount: 4100,
        detail: 'CE-marked dual-mobility joint component with verified manufacturer implant passport and trace verification.',
        tooltip: 'Dual-mobility hip articulation system designed for active stability with titanium porous osteointegration.',
      },
      {
        id: 'inpat',
        name: 'Inpatient hospital stay (3 nights)',
        amount: 3900,
        detail: 'Private en-suite recovery ward, round-the-clock clinical observation, diagnostics, and pharmaceutical support.',
        tooltip: 'Private room with dedicated nursing care, bedside telemetry, routine labs, and post-operative pain management.',
      },
      {
        id: 'rehab',
        name: 'In-hospital physical rehabilitation',
        amount: 1650,
        detail: 'Bi-daily dedicated physiotherapy sessions, safe transfer training, and home mobility exercise plan handover.',
        tooltip: 'Dedicated musculoskeletal physiotherapist twice daily, safe transfer training, and tailored travel clearance review.',
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
    'quote-zurich-surg': true,
  });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const toggleItem = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const calculateTotal = (proposal) =>
    proposal.items.reduce((sum, item) => sum + item.amount, 0);

  const zurichTotal = calculateTotal(proposals[0]);
  const londonTotal = calculateTotal(proposals[1]);
  const priceVariance = londonTotal - zurichTotal;

  return (
    <div className="proposal-module-container" aria-label="Interactive proposal comparison">
      {/* Header and Sliding Pill Segmented Control */}
      <div className="proposal-header-row">
        <div>
          <span className="proposal-badge-sub">
            Sample standard proposal
          </span>
          <h3 className="proposal-title">
            Itemized coordination quotes
          </h3>
        </div>

        {/* Sliding Pill Control */}
        <div
          role="radiogroup"
          aria-label="Quote comparison view mode"
          className="sliding-pill-container"
        >
          {/* Animated sliding background pill */}
          <div
            className={`sliding-pill-indicator ${viewMode === 'compare' ? 'slide-right' : 'slide-left'}`}
            aria-hidden="true"
          />
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === 'one'}
            onClick={() => setViewMode('one')}
            className={`sliding-pill-btn ${viewMode === 'one' ? 'active' : ''}`}
          >
            One quote
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={viewMode === 'compare'}
            onClick={() => setViewMode('compare')}
            className={`sliding-pill-btn ${viewMode === 'compare' ? 'active' : ''}`}
          >
            Compare (2 hospitals)
          </button>
        </div>
      </div>

      {/* SINGLE QUOTE VIEW: Rich Itemized Table & Inclusions */}
      {viewMode === 'one' && (
        <div className="single-quote-view animate-fade-in">
          {/* Facility Overview Banner */}
          <div className="quote-facility-banner">
            <div className="facility-meta-left">
              <div className="facility-location-tag">
                <BuildingIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
                <span>{proposals[0].location}</span>
              </div>
              <h4 className="facility-headline">{proposals[0].hospitalName}</h4>
              <p className="facility-procedure">
                Target procedure: <strong>{proposals[0].procedureName}</strong>
              </p>
            </div>

            <div className="facility-meta-right">
              <Badge variant="teal" style={{ fontSize: '0.8125rem' }}>
                {proposals[0].accreditation}
              </Badge>
              <div className="quote-total-lockup">
                <span className="quote-total-label">Fixed Standard Proposal</span>
                <span className="quote-total-amount">{formatUSD(zurichTotal)} (All-inclusive)</span>
              </div>
            </div>
          </div>

          {/* Inclusion Status Tags Strip */}
          <div className="quote-inclusion-tags-strip">
            <span className="inclusion-tag">
              <CheckIcon size={13} style={{ color: 'var(--color-brand-accent)' }} />
              Includes 4 nights inpatient + post-op rehab
            </span>
            <span className="inclusion-tag">
              <CheckIcon size={13} style={{ color: 'var(--color-brand-accent)' }} />
              Contingency terms: $5,000 unforeseen intra-op reserve
            </span>
            <span className="inclusion-tag">
              <CheckIcon size={13} style={{ color: 'var(--color-brand-accent)' }} />
              Implant passport & manufacturer serial tracking
            </span>
          </div>

          {/* Itemized Breakdown Table with Tooltips and Zebra Rows */}
          <div className="quote-table-wrapper">
            <table className="quote-breakdown-table" role="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '42%' }}>Clinical Component</th>
                  <th scope="col" style={{ width: '38%' }}>Scope Specification</th>
                  <th scope="col" style={{ width: '20%', textAlign: 'right' }}>Standard Fee</th>
                </tr>
              </thead>
              <tbody>
                {proposals[0].items.map((item, idx) => {
                  const key = `quote-zurich-${item.id}`;
                  const isExpanded = !!expandedItems[key];
                  const hasTooltip = activeTooltip === item.id;

                  return (
                    <tr key={item.id} className={idx % 2 === 1 ? 'zebra-row' : ''}>
                      <td>
                        <div className="table-item-title-box">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`detail-${key}`}
                            onClick={() => toggleItem(key)}
                            className="proposal-item-toggle table-expand-btn"
                          >
                            <ChevronDownIcon
                              size={14}
                              style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform var(--transition-fast)',
                                color: 'var(--color-brand-accent)',
                              }}
                            />
                            <span className="table-item-name">{item.name}</span>
                          </button>

                          {/* Interactive Tooltip Button (ℹ️) */}
                          <div className="tooltip-anchor">
                            <button
                              type="button"
                              className="info-tooltip-btn"
                              aria-label={`Clinical detail for ${item.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTooltip(hasTooltip ? null : item.id);
                              }}
                              title={item.tooltip}
                            >
                              <InfoIcon size={14} />
                            </button>
                            {hasTooltip && (
                              <div className="tooltip-popover animate-fade-in" role="tooltip">
                                <div className="tooltip-title">Clinical Breakdown</div>
                                <div className="tooltip-text">{item.tooltip}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        {isExpanded && (
                          <div id={`detail-${key}`} className="table-sub-detail">
                            {item.detail}
                          </div>
                        )}
                      </td>
                      <td className="table-item-scope">
                        {item.detail}
                      </td>
                      <td className="table-item-price">
                        {formatUSD(item.amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="table-total-row">
                  <td colSpan={2}>
                    <strong>Comprehensive Package Total</strong>
                    <span className="total-disclaimer">Fixed quotation guaranteed against surprise billing</span>
                  </td>
                  <td className="total-cell-amount">
                    {formatUSD(zurichTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* COMPARE VIEW: Side-by-Side Facility Matrix & Variance Breakdown */}
      {viewMode === 'compare' && (
        <div className="compare-view-grid animate-fade-in">
          {/* Price Variance Callout */}
          <div className="compare-variance-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <ShieldCheckIcon size={18} style={{ color: 'var(--color-brand-accent)' }} />
              <div>
                <strong>Facility Proposal Variance:</strong> Zurich St. Anna is{' '}
                <span className="variance-highlight">{formatUSD(priceVariance)} (10.6%) lower</span> than London
                Wellington, primarily due to theater tariffs and inpatient tariff structures.
              </div>
            </div>
          </div>

          <div className="compare-cards-two-col">
            {proposals.map((proposal) => {
              const total = calculateTotal(proposal);
              const isZurich = proposal.id === 'quote-zurich';

              return (
                <div key={proposal.id} className="compare-card">
                  <div className="compare-card-header">
                    <div>
                      <span className="compare-card-location">
                        <BuildingIcon size={13} style={{ color: 'var(--color-brand-accent)' }} />
                        {proposal.location}
                      </span>
                      <h4 className="compare-card-hospital">{proposal.hospitalName}</h4>
                    </div>
                    <Badge variant="teal">{proposal.accreditation}</Badge>
                  </div>

                  {/* Pricing Total */}
                  <div className="compare-price-strip">
                    <span className="compare-price-label">All-Inclusive Fixed Proposal</span>
                    <span className="compare-price-val">{formatUSD(total)}</span>
                  </div>

                  {/* Clinical Credentials Matrix */}
                  <div className="compare-specs-list">
                    <div className="compare-spec-row">
                      <span className="spec-label">Surgeon Lead</span>
                      <span className="spec-val">
                        <strong>{proposal.surgeonLead}</strong>
                        <small>{proposal.surgeonTitle}</small>
                      </span>
                    </div>

                    <div className="compare-spec-row">
                      <span className="spec-label">Inpatient Stay</span>
                      <span className="spec-val">{proposal.inpatientStay}</span>
                    </div>

                    <div className="compare-spec-row">
                      <span className="spec-label">Rehabilitation</span>
                      <span className="spec-val">{proposal.rehabSummary}</span>
                    </div>

                    <div className="compare-spec-row">
                      <span className="spec-label">Implant Tech</span>
                      <span className="spec-val">{proposal.prosthesisModel}</span>
                    </div>

                    <div className="compare-spec-row">
                      <span className="spec-label">Contingency</span>
                      <span className="spec-val">{proposal.contingencyTerm}</span>
                    </div>
                  </div>

                  {/* Itemized Mini List for Quick Scan */}
                  <div className="compare-items-accordion">
                    <div className="compare-items-title">Itemized Line Items</div>
                    {proposal.items.map((item) => (
                      <div key={item.id} className="compare-item-line">
                        <span>{item.name}</span>
                        <strong>{formatUSD(item.amount)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grounding Footer Notice */}
      <div className="proposal-footer-notice">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
          <span>Line items expand for clinical breakdown. All quotes include emergency contingency terms.</span>
        </div>
        <span style={{ fontStyle: 'italic' }}>Sample figures for demonstration — not clinical quotes</span>
      </div>
    </div>
  );
}

export default ProposalCompare;
import React from 'react';

export const JOURNEY_STAGES = [
  {
    step: '1',
    num: '01',
    title: 'Dossier assembly',
    desc: 'Submit your procedural inquiry and upload diagnostic scans and specialist notes to your encrypted account safe.',
  },
  {
    step: '2',
    num: '02',
    title: 'Accredited center review',
    desc: 'With your explicit consent, your anonymized dossier is evaluated directly by credentialed surgical department heads.',
  },
  {
    step: '3',
    num: '03',
    title: 'Itemized quote comparison',
    desc: 'Review standardized offers detailing surgical team fees, sterile theater charges, prosthesis brands, and recovery days.',
  },
  {
    step: '4',
    num: '04',
    title: 'Travel coordination & aftercare',
    desc: 'Schedule a pre-travel video conference with your surgeon, coordinate travel dates, and receive local physician handover notes.',
  },
];

export function JourneyTimeline({ stages = JOURNEY_STAGES }) {
  return (
    <div className="journey-timeline-wrapper" aria-label="Coordination journey steps">
      <ol className="journey-timeline">
        {stages.map((stage, idx) => (
          <li key={stage.num} className="journey-timeline-item">
            <div className="journey-timeline-marker">
              <div className="journey-timeline-dot" aria-hidden="true">
                <span>{stage.num}</span>
              </div>
              {idx < stages.length - 1 && <div className="journey-timeline-connector" aria-hidden="true" />}
            </div>
            <div className="journey-timeline-content">
              <h3 className="journey-timeline-title">
                {stage.title}
              </h3>
              <p className="journey-timeline-desc">
                {stage.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default JourneyTimeline;

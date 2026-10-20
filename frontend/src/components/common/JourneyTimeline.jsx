import React from 'react';
import { FileTextIcon, StethoscopeIcon, BuildingIcon, GlobeIcon, ArrowRightIcon } from './Icons';

export const JOURNEY_STAGES = [
  {
    step: '1',
    num: '01',
    title: 'Dossier assembly',
    subtitle: 'Diagnostic Records Safe',
    desc: 'Submit your procedural inquiry and upload diagnostic scans and specialist notes to your encrypted account safe.',
    icon: FileTextIcon,
    timeframe: 'Day 1',
  },
  {
    step: '2',
    num: '02',
    title: 'Accredited center review',
    subtitle: 'Surgical Head Evaluation',
    desc: 'With your explicit consent, your anonymized dossier is evaluated directly by credentialed surgical department heads.',
    icon: StethoscopeIcon,
    timeframe: 'Days 2–4',
  },
  {
    step: '3',
    num: '03',
    title: 'Itemized quote comparison',
    subtitle: 'Surgeon & Theater Tariffs',
    desc: 'Review standardized offers detailing surgical team fees, sterile theater charges, prosthesis brands, and recovery days.',
    icon: BuildingIcon,
    timeframe: 'Day 5',
  },
  {
    step: '4',
    num: '04',
    title: 'Travel coordination & aftercare',
    subtitle: 'Direct Physician Handover',
    desc: 'Schedule a pre-travel video conference with your surgeon, coordinate travel dates, and receive local physician handover notes.',
    icon: GlobeIcon,
    timeframe: 'Departure to Post-Op',
  },
];

export function JourneyTimeline({ stages = JOURNEY_STAGES }) {
  return (
    <div className="roadmap-wrapper" aria-label="Coordination journey steps">
      {/* Desktop Connected Connecting Track Line */}
      <div className="roadmap-connecting-track" aria-hidden="true" />

      <ol className="roadmap-steps-list">
        {stages.map((stage, idx) => {
          const IconComp = stage.icon;
          return (
            <li key={stage.num} className="roadmap-step-card animate-fade-in">
              {/* Badge & Number Marker */}
              <div className="roadmap-step-top">
                <div className="roadmap-step-badge">
                  <span className="roadmap-step-num">{stage.num}</span>
                </div>
                <span className="roadmap-step-timeframe">{stage.timeframe}</span>
              </div>

              {/* Step Card Container */}
              <div className="roadmap-card-body">
                <div className="roadmap-icon-wrapper" aria-hidden="true">
                  <IconComp size={18} />
                </div>
                <h3 className="roadmap-step-title">{stage.title}</h3>
                <span className="roadmap-step-sub">{stage.subtitle}</span>
                <p className="roadmap-step-desc">{stage.desc}</p>
              </div>

              {idx < stages.length - 1 && (
                <div className="roadmap-mobile-connector" aria-hidden="true">
                  <ArrowRightIcon size={16} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default JourneyTimeline;
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, LockIcon, ArrowRightIcon, ShieldCheckIcon } from '../components/common/Icons';
import Button from '../components/common/Button';
import HealthcareGlobe from '../components/common/HealthcareGlobe';
import ProposalCompare from '../components/common/ProposalCompare';
import JourneyTimeline from '../components/common/JourneyTimeline';
import FAQSection from '../components/common/FAQSection';
import HeroIntakeTeaser from '../components/common/HeroIntakeTeaser';

export function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* =========================================================================
          1. Hero Section (Balanced 60/40 Split Desktop Layout)
          ========================================================================= */}
      <section className="hero-section" aria-labelledby="hero-main-title">
        <div className="container">
          <div className="hero-grid hero-split-60-40">
            {/* Left Column (60%): Editorial Headline, Subtext, Trust Bar */}
            <div className="hero-left-column">
              <div className="hero-editorial-lead-group">
                <span className="hero-kicker-tag">
                  Institutional Cross-Border Healthcare
                </span>
                <h1 id="hero-main-title" className="hero-headline">
                  Cross-border medical care, coordinated with clinical rigor and price clarity.
                </h1>
                <p className="hero-subtext">
                  EthAum coordinates international medical care with itemized hospital quotes, physician dossier reviews, and complete record privacy.
                </p>
              </div>

              {/* Immediate Trust-Signal Badge Bar */}
              <div className="hero-trust-badge-bar">
                <div className="trust-badges-monochrome-cluster">
                  <span className="trust-mono-badge" title="Joint Commission International Accredited Network">
                    JCI ACCREDITED
                  </span>
                  <span className="trust-mono-badge" title="Australian Council on Healthcare Standards">
                    ACHS STANDARDS
                  </span>
                  <span className="trust-mono-badge" title="International Organization for Standardization">
                    ISO 9001 / 15189
                  </span>
                </div>

                <div className="trust-security-lock-pill">
                  <LockIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
                  <span className="lock-pill-text">256-bit HIPAA-compliant encryption</span>
                </div>
              </div>

              {/* Quick Clinical Guarantees Checklist */}
              <div className="hero-checklist-grid">
                <div className="hero-check-item">
                  <span className="hero-check-icon" aria-hidden="true">
                    <CheckIcon size={15} />
                  </span>
                  <div>
                    <strong className="check-item-title">Surgeon-evaluated candidacy</strong>
                    <span className="check-item-sub">Evaluated by hospital department heads</span>
                  </div>
                </div>

                <div className="hero-check-item">
                  <span className="hero-check-icon" aria-hidden="true">
                    <CheckIcon size={15} />
                  </span>
                  <div>
                    <strong className="check-item-title">Fixed itemized proposals</strong>
                    <span className="check-item-sub">Guaranteed against surprise hospital tariffs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (40%): Floating Elevated Intake Card */}
            <div className="hero-right-column">
              <HeroIntakeTeaser />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Active Clinical Corridors & 3D Interactive Visualization
          ========================================================================= */}
      <section
        id="corridors"
        className="corridors-section"
        aria-labelledby="corridors-heading"
      >
        <div className="container">
          <div className="section-header-centered">
            <span className="section-pre-tag">Global Clinical Network</span>
            <h2 id="corridors-heading">
              Verified international medical corridors.
            </h2>
            <p className="section-lead-desc">
              Direct coordination channels connecting patients with accredited specialty centers in Zurich, Boston, Seoul, Singapore, London, and Dubai.
            </p>
          </div>

          <HealthcareGlobe />
        </div>
      </section>

      {/* =========================================================================
          3. Itemized Quote & Hospital Comparison Module
          ========================================================================= */}
      <section
        id="proof"
        className="quotes-section"
        aria-labelledby="quotes-heading"
      >
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="section-header-centered">
            <span className="section-pre-tag">Transparent Hospital Tariffs</span>
            <h2 id="quotes-heading">
              Itemized hospital quotes, with no surprise bills.
            </h2>
            <p className="section-lead-desc">
              Every proposal received through EthAum is itemized by surgeon, facility, and supplies before patient presentation.
            </p>
          </div>

          <ProposalCompare />
        </div>
      </section>

      {/* =========================================================================
          4. Process: Interconnected 4-Step Medical Travel Pathway
          ========================================================================= */}
      <section
        id="how-it-works"
        className="journey-section"
        aria-labelledby="journey-heading"
      >
        <div className="container">
          <div className="section-header-centered">
            <span className="section-pre-tag">Patient Travel Roadmap</span>
            <h2 id="journey-heading">
              How international medical travel is coordinated.
            </h2>
            <p className="section-lead-desc">
              A disciplined, step-by-step pathway from your initial inquiry through post-discharge recovery.
            </p>
          </div>

          {/* Connected Horizontal Roadmap Component */}
          <div className="journey-timeline">
            <JourneyTimeline />
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. Standards & Governance (Sticky Two-Column Architecture)
          ========================================================================= */}
      <section
        id="standards"
        className="standards-section"
        aria-labelledby="standards-heading"
      >
        <div className="container">
          <div className="quality-two-column-layout">
            <div className="quality-sticky-column">
              <span className="section-pre-tag">Patient Protection Framework</span>
              <h2 id="standards-heading">
                Operating standards & patient governance.
              </h2>
              <p className="standards-sticky-subtext">
                Medical decisions require licensed doctors. EthAum maintains strict separation between administrative coordination and clinical evaluation.
              </p>
              <div className="standards-trust-seal">
                <ShieldCheckIcon size={20} style={{ color: 'var(--color-brand-accent)' }} />
                <span>Zero Commission Conflict Policy</span>
              </div>
            </div>

            <div className="standards-cards-stack">
              <div className="standards-pillar-card">
                <div className="pillar-header">
                  <span className="pillar-num">01</span>
                  <h3 className="pillar-title">Surgeon-led evaluation</h3>
                </div>
                <p className="pillar-body">
                  Your diagnostic records and surgical candidacy are evaluated directly by credentialed surgical department heads at the destination hospital. We never use automated algorithms to determine candidacy, diagnose conditions, or prescribe therapies.
                </p>
              </div>

              <div className="standards-pillar-card">
                <div className="pillar-header">
                  <span className="pillar-num">02</span>
                  <h3 className="pillar-title">Accredited hospitals only</h3>
                </div>
                <p className="pillar-body">
                  Participating medical centers must hold active accreditation from recognized statutory bodies such as the Joint Commission International (JCI), Australian Council on Healthcare Standards (ACHS), or ISO clinical standards.
                </p>
              </div>

              <div className="standards-pillar-card" id="privacy">
                <div className="pillar-header">
                  <span className="pillar-num">03</span>
                  <h3 className="pillar-title">You control your records</h3>
                </div>
                <p className="pillar-body">
                  Your diagnostic scans and notes reside in encrypted, isolated storage. Records are shared only with your explicit written consent for that specific hospital inquiry, and can be exported or permanently purged at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FAQ Section (Accessible Accordion)
          ========================================================================= */}
      <div className="faq-list">
        <FAQSection />
      </div>

      {/* =========================================================================
          7. Closing Band: Conversion Dossier Initiation
          ========================================================================= */}
      <section className="cta-band-section" aria-labelledby="cta-heading">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="cta-band-card">
            <span className="cta-kicker">Confidential Care Inquiry</span>
            <h2 id="cta-heading" className="cta-title">
              Ready to assemble your coordination dossier?
            </h2>
            <p className="cta-sub">
              Upload your diagnostic summaries to receive accredited surgical review and itemized transparent proposals.
            </p>
            <div className="cta-action-wrap">
              <Button as={Link} to="/signup" variant="primary" size="lg" className="cta-action-btn">
                <span>Start a case</span>
                <ArrowRightIcon size={16} />
              </Button>
            </div>
            <div className="cta-guarantee-note">
              Encrypted record storage • No data shared without consent • Zero spam guarantee
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
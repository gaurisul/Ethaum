import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CheckIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  BuildingIcon,
  LockIcon,
} from '../components/common/Icons';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card, { CardBody } from '../components/common/Card';
import HealthcareGlobe from '../components/common/HealthcareGlobe';
import ProposalCompare from '../components/common/ProposalCompare';
import JourneyTimeline from '../components/common/JourneyTimeline';
import FAQSection from '../components/common/FAQSection';
import AccreditationStrip from '../components/common/AccreditationStrip';
import HeroIntakeTeaser from '../components/common/HeroIntakeTeaser';

export function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Editorial Hero Section with 3D Globe Visual */}
      <section
        style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-16)',
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-bg-canvas)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--space-8)',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            <div>
              {/* Editorial Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
                <Badge variant="teal">
                  <ShieldCheckIcon size={14} />
                  Independent healthcare coordination
                </Badge>
              </div>

              {/* Headline with DM Serif Display */}
              <h1
                style={{
                  fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)',
                  lineHeight: 1.15,
                  fontWeight: 400,
                  fontFamily: 'var(--font-family-serif)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-5)',
                  letterSpacing: '-0.01em',
                }}
              >
                Cross-border medical care, coordinated with clinical rigor and price clarity.
              </h1>

              {/* Subhead with Source Sans 3 */}
              <p
                style={{
                  fontSize: 'var(--font-size-lg)',
                  lineHeight: 1.62,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-8)',
                  maxWidth: '560px',
                }}
              >
                EthAum provides administrative support for international patients seeking major medical procedures. We organize your clinical records, solicit itemized proposals from accredited hospitals, and coordinate logistics with complete transparency.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <Button as={Link} to="/signup" variant="primary" size="lg">
                  Start coordination case
                  <ArrowRightIcon size={16} />
                </Button>
                <Button as="a" href="#how-it-works" variant="outline" size="lg">
                  How coordination works
                </Button>
              </div>

              {/* 3-Field Intake Teaser */}
              <HeroIntakeTeaser />

              {/* Grounded Quality Commitments */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-brand-accent)', marginTop: '2px' }}>
                    <CheckIcon size={15} />
                  </span>
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', display: 'block', fontWeight: 600 }}>
                      Accreditation verified
                    </strong>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      JCI, ISO, or national statutory boards
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-brand-accent)', marginTop: '2px' }}>
                    <CheckIcon size={15} />
                  </span>
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', display: 'block', fontWeight: 600 }}>
                      Itemized proposals
                    </strong>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      Surgeon, anesthesia, and room breakdown
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-brand-accent)', marginTop: '2px' }}>
                    <CheckIcon size={15} />
                  </span>
                  <div>
                    <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', display: 'block', fontWeight: 600 }}>
                      Consent-first vault
                    </strong>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      Granular patient control over records
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Restrained 3D Globe Visual Column */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HealthcareGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation Standards Strip */}
      <AccreditationStrip />

      {/* Quality Standards & Operating Philosophy (Two-Column Layout with Sticky Heading) */}
      <section id="quality" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="container">
          <div className="quality-two-column-layout">
            {/* Sticky Editorial Heading Column */}
            <div className="quality-sticky-column">
              <Badge variant="teal" style={{ marginBottom: 'var(--space-3)' }}>
                Operating standards
              </Badge>
              <h2>Built on clinical ethics, not algorithmic shortcuts.</h2>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Medical decisions require licensed medical doctors. EthAum maintains strict separation between administrative coordination and clinical evaluation.
              </p>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <Button as="a" href="#how-it-works" variant="outline" size="sm">
                  How coordination works
                </Button>
              </div>
            </div>

            {/* Vertically Stacked Clinical Principle Cards Column */}
            <div className="quality-cards-column">
              <Card>
                <CardBody>
                  <div style={{ color: 'var(--color-brand-accent)', marginBottom: 'var(--space-3)' }}>
                    <StethoscopeIcon size={22} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                    Surgeon-led case evaluation
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Your diagnostic materials are reviewed directly by the destination hospital’s surgical department heads. We do not use automated algorithms to determine candidacy, diagnose conditions, or prescribe therapies.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div style={{ color: 'var(--color-brand-accent)', marginBottom: 'var(--space-3)' }}>
                    <BuildingIcon size={22} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                    Accreditation verification
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Hospitals must hold valid accreditation from recognized bodies such as the Joint Commission International (JCI), Australian Council on Healthcare Standards (ACHS), or equivalent national statutory boards.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div style={{ color: 'var(--color-brand-accent)', marginBottom: 'var(--space-3)' }}>
                    <LockIcon size={22} />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-2)' }}>
                    Granular record consent
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Your scans and records reside in encrypted, isolated storage. We never share your identifiable health data with any provider without your explicit written authorization for that specific hospital inquiry.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Linear Process Timeline) */}
      <section id="how-it-works" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg-canvas)', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: 'var(--space-12)' }}>
            <Badge variant="navy" style={{ marginBottom: 'var(--space-3)' }}>
              Coordination journey
            </Badge>
            <h2>How international medical travel is coordinated.</h2>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
              A disciplined, step-by-step pathway from your initial inquiry through post-discharge recovery.
            </p>
          </div>

          <JourneyTimeline />
        </div>
      </section>

      {/* Transparent Itemized Quote Illustration */}
      <section style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg-subtle)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--space-10)',
              alignItems: 'center',
            }}
            className="quote-preview-grid"
          >
            <div>
              <Badge variant="teal" style={{ marginBottom: 'var(--space-3)' }}>
                Financial transparency
              </Badge>
              <h2>Itemized hospital quotes, with no surprise medical bills.</h2>
              <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Unexpected facility charges and hidden physician surcharges are the primary source of distress in cross-border treatment. Every quote received through EthAum must conform to an itemized standard before patient presentation.
              </p>

              <div className="editorial-quote-box">
                <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-family-editorial)', color: 'var(--color-text-primary)', margin: 0, fontSize: 'var(--font-size-lg)' }}>
                  &ldquo;A patient traveling thousands of miles for surgery deserves absolute certainty regarding who is treating them, where their money goes, and what follow-up care is guaranteed.&rdquo;
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-6)' }}>
                <Button as={Link} to="/signup" variant="primary" size="md">
                  Start coordination case
                  <ArrowRightIcon size={16} />
                </Button>
              </div>
            </div>

            {/* Interactive Proposal Comparison */}
            <div>
              <ProposalCompare />
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Editorial Hospital Photography Section */}
      <section style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg-canvas)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: 'var(--space-10)' }}>
            <Badge variant="navy" style={{ marginBottom: 'var(--space-3)' }}>
              Accredited hospital network
            </Badge>
            <h2>Verified clinical infrastructure.</h2>
            <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
              Participating medical centers must demonstrate comprehensive surgical facilities, licensed operating suites, and dedicated international patient desks.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {/* Hospital Card 1 */}
            <div className="hospital-photo-card">
              <div className="hospital-photo-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
                  alt="Zurich Inpatient Hospital Pavilion"
                  className="hospital-photo-img"
                  loading="lazy"
                />
                <div className="hospital-photo-overlay" aria-hidden="true" />
              </div>
              <div className="hospital-photo-caption-bar">
                <BuildingIcon size={14} style={{ color: 'var(--color-brand-accent)', flexShrink: 0 }} />
                <span>Zurich Inpatient Wing: Dedicated post-operative surgical telemetry & private rooms.</span>
              </div>
              <div style={{ padding: 'var(--space-5)' }}>
                <h4 style={{ marginBottom: 'var(--space-1)', fontSize: 'var(--font-size-base)' }}>
                  Inpatient and surgical pavilions
                </h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  Hospitals are evaluated for dedicated post-operative wards, private recovery rooms, and on-site clinical laboratories.
                </p>
              </div>
            </div>

            {/* Hospital Card 2 */}
            <div className="hospital-photo-card">
              <div className="hospital-photo-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                  alt="London Clinical Diagnostic Center"
                  className="hospital-photo-img"
                  loading="lazy"
                />
                <div className="hospital-photo-overlay" aria-hidden="true" />
              </div>
              <div className="hospital-photo-caption-bar">
                <BuildingIcon size={14} style={{ color: 'var(--color-brand-accent)', flexShrink: 0 }} />
                <span>London Diagnostic Hub: Multi-slice CT, 3T MRI, and accredited pathology suites.</span>
              </div>
              <div style={{ padding: 'var(--space-5)' }}>
                <h4 style={{ marginBottom: 'var(--space-1)', fontSize: 'var(--font-size-base)' }}>
                  Clinician-to-clinician review
                </h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
                  Diagnostic imaging and pathology reports are evaluated directly by credentialed specialists before travel recommendations are made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Patient Bill of Rights Section */}
      <section id="governance" style={{ padding: 'var(--space-16) 0', backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <Badge variant="navy" style={{ marginBottom: 'var(--space-3)' }}>
              Patient governance
            </Badge>
            <h2>The EthAum cross-border patient charter.</h2>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
              We adhere strictly to patient safety regulations, voluntary consent models, and administrative clarity.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size={16} />
                Data sovereignty
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                You retain complete ownership of all medical records. You may export or permanently delete your files at any moment.
              </p>
            </div>

            <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size={16} />
                Zero clinical intermediation
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                EthAum does not prescribe or alter physician orders. Surgical protocols are established solely between patient and surgeon.
              </p>
            </div>

            <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckIcon size={16} />
                Transparent hospital pricing
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                All proposals present itemized hospital and surgical fees with no hidden markups or referral commissions.
              </p>
            </div>
          </div>

          {/* Bottom Action Box */}
          <div
            style={{
              maxWidth: '720px',
              margin: 'var(--space-12) auto 0 auto',
              padding: 'var(--space-8)',
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-medium)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3 style={{ marginBottom: 'var(--space-2)' }}>
              Ready to assemble your coordination dossier?
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto var(--space-6) auto', fontSize: 'var(--font-size-sm)' }}>
              Register as a patient to organize records and request quotes, or register as an accredited hospital partner.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Button as={Link} to="/signup" variant="primary" size="md">
                Start coordination case
              </Button>
              <Button as="a" href="#how-it-works" variant="secondary" size="md">
                How coordination works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible FAQ Section (Built on native details/summary) */}
      <FAQSection />
    </div>
  );
}

export default HomePage;

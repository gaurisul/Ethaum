import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, ShieldCheckIcon, GlobeIcon, LockIcon } from './Icons';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer-overhaul" role="contentinfo">
      <div className="container">
        {/* Prominent Statutory Scope & Healthcare Boundaries Notice */}
        <div className="statutory-disclaimer-card">
          <div className="statutory-disclaimer-header">
            <span className="statutory-shield-icon" aria-hidden="true">
              <ShieldCheckIcon size={20} />
            </span>
            <div>
              <h4 className="statutory-disclaimer-title">
                Healthcare boundaries & administrative scope notice
              </h4>
              <span className="statutory-compliance-badge">
                Statutory Governance Directive
              </span>
            </div>
          </div>
          <p className="statutory-disclaimer-body">
            EthAum is an independent administrative healthcare coordination platform engineered to assist patients with clinical document organization, verified provider discovery, and medical travel coordination. <strong>EthAum does not diagnose, prescribe, determine medical eligibility, or make clinical treatment decisions.</strong> All medical candidacy evaluations, surgical consultations, and clinical procedures are conducted exclusively by licensed, independent healthcare institutions and board-certified medical practitioners.
          </p>
          <div className="statutory-tags-row">
            <span className="statutory-pill">
              <LockIcon size={12} />
              256-bit Encrypted Health Records
            </span>
            <span className="statutory-pill">
              <ShieldCheckIcon size={12} />
              Zero Referral Commission Bias
            </span>
            <span className="statutory-pill">
              <GlobeIcon size={12} />
              Patient Consent-First Protocol
            </span>
          </div>
        </div>

        {/* Structured 4-Column Grid: Brand + 3 Targeted Pillars */}
        <div className="footer-columns-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-lockup">
              <div className="brand-icon" style={{ width: 32, height: 32 }}>
                <HeartPulseIcon size={18} />
              </div>
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>
                Eth<span>Aum</span>
              </span>
            </div>
            <p className="footer-brand-summary">
              Institutional cross-border healthcare coordination connecting patients with accredited surgical centers, itemized transparent quotes, and private dossier handling.
            </p>
            <div className="footer-network-status">
              <GlobeIcon size={15} style={{ color: 'var(--color-brand-accent)' }} />
              <span>International Coordination Network</span>
            </div>
          </div>

          {/* Column 1: Care Seekers */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Care seekers</h4>
            <ul className="footer-nav-list">
              <li><Link to="/signup">Case inquiry</Link></li>
              <li><a href="#how-it-works">How it works</a></li>
              <li><a href="#standards">Accreditation standards</a></li>
              <li><a href="mailto:support@ethaum.example.com">Contact & support desk</a></li>
              <li><Link to="/signin">Sign in to dossier</Link></li>
            </ul>
          </div>

          {/* Column 2: Hospitals & Clinicians */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Hospitals & clinicians</h4>
            <ul className="footer-nav-list">
              <li><a href="#standards">Hospital accreditation criteria</a></li>
              <li><Link to="/signup">Provider onboarding portal</Link></li>
              <li><Link to="/signin">Provider sign in</Link></li>
              <li><a href="#proof">Transparent quote framework</a></li>
              <li><a href="#standards">Clinical handover protocols</a></li>
            </ul>
          </div>

          {/* Column 3: Governance & Privacy */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Governance & privacy</h4>
            <ul className="footer-nav-list">
              <li><a href="#faq">Frequently asked questions</a></li>
              <li><a href="#privacy">Privacy & record vault policy</a></li>
              <li><a href="#standards">Patient consent protocol</a></li>
              <li><a href="#standards">How we protect your records</a></li>
              <li><a href="#privacy">Terms of coordination</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {CURRENT_YEAR} EthAum Healthcare Coordination System. All rights reserved.
          </div>
          <div className="footer-legal-tags">
            <span className="footer-demo-pill">Synthetic demo environment</span>
            <span className="footer-legal-link">ISO 27001 Security Baseline</span>
            <span className="footer-legal-link">HIPAA Security Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
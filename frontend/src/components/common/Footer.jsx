import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, ShieldCheckIcon, GlobeIcon } from './Icons';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Healthcare boundaries & administrative notice */}
        <div className="footer-disclaimer-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--color-brand-accent)', display: 'flex' }}>
              <ShieldCheckIcon size={18} />
            </span>
            <strong style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>
              Healthcare boundaries & administrative scope notice
            </strong>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: 'var(--font-size-xs)', lineHeight: 1.65 }}>
            EthAum is an independent healthcare coordination platform designed to assist patients with clinical document organization, verified provider discovery, and travel planning. <strong>EthAum does not diagnose, prescribe, determine medical eligibility, or make clinical treatment decisions.</strong> All medical evaluations and surgical procedures are conducted exclusively by licensed, independent healthcare institutions.
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div className="brand-icon" style={{ width: 30, height: 30 }}>
                <HeartPulseIcon size={16} />
              </div>
              <span className="brand-title" style={{ fontSize: '1.125rem' }}>
                Eth<span>Aum</span>
              </span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1.25rem' }}>
              Cross-border medical coordination built on clinical accreditation standards, itemized quote transparency, and private document handling.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
              <GlobeIcon size={15} />
              <span>International coordination network</span>
            </div>
          </div>

          <div>
            <h4>Care seekers</h4>
            <ul className="footer-links-list">
              <li><Link to="/signup">Start a coordination case</Link></li>
              <li><a href="#how-it-works">Coordination journey</a></li>
              <li><a href="#quality">Hospital quality standards</a></li>
              <li><a href="mailto:support@ethaum.example.com">Contact & support desk</a></li>
              <li><Link to="/signin">Patient portal sign in</Link></li>
            </ul>
          </div>

          <div>
            <h4>Hospitals & clinicians</h4>
            <ul className="footer-links-list">
              <li><a href="#quality">Accreditation criteria</a></li>
              <li><Link to="/signup">Provider onboarding</Link></li>
              <li><Link to="/signin">Provider portal sign in</Link></li>
              <li><a href="#how-it-works">How quotes work</a></li>
            </ul>
          </div>

          <div>
            <h4>Governance & privacy</h4>
            <ul className="footer-links-list">
              <li><a href="#faq">Frequently asked questions</a></li>
              <li><a href="#governance">Platform guidelines</a></li>
              <li><a href="#governance">Patient consent protocol</a></li>
              <li><a href="#governance">How we protect your records</a></li>
              <li><a href="#governance">Terms of coordination</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {CURRENT_YEAR} EthAum Healthcare Coordination. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>Synthetic demo environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

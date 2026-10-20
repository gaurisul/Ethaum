import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, MenuIcon, XIcon, ShieldCheckIcon, GlobeIcon, ArrowRightIcon } from './Icons';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const pickerRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Monitor scroll threshold to reveal compact CTA
  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 340;
      setScrolledPastHero(isPast);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close currency/language picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    if (pickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pickerOpen]);

  return (
    <header className="navbar" role="banner">
      <div className="container navbar-container">
        {/* Left: Brand Logo & Trust Verification Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Link to="/" className="brand-logo" onClick={closeMobileMenu} aria-label="EthAum Home">
            <div className="brand-icon" aria-hidden="true">
              <HeartPulseIcon size={18} />
            </div>
            <span className="brand-title">
              Eth<span>Aum</span>
            </span>
          </Link>

          {/* Clinical Trust Verification Status */}
          <div className="nav-trust-badge" title="Clinical network verified under JCI and ISO standards">
            <span className="nav-trust-pulse" aria-hidden="true" />
            <span className="nav-trust-text">Verified Network Active</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works" className="nav-link">
            How it works
          </a>
          <a href="#proof" className="nav-link">
            Quotes
          </a>
          <a href="#standards" className="nav-link">
            Standards
          </a>
          <a href="#privacy" className="nav-link">
            Privacy
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
        </nav>

        {/* Right: Actions, Currency/Language Picker, Theme & Scroll CTA */}
        <div className="nav-actions">
          {/* Currency / Language Picker */}
          <div className="currency-lang-picker-wrapper" ref={pickerRef}>
            <button
              type="button"
              className="currency-lang-btn"
              onClick={() => setPickerOpen((prev) => !prev)}
              aria-expanded={pickerOpen}
              aria-haspopup="true"
              aria-label={`Region settings: ${selectedCurrency.code}, ${selectedLanguage.label}`}
            >
              <GlobeIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />
              <span>{selectedCurrency.code} • {selectedLanguage.code.toUpperCase()}</span>
            </button>

            {pickerOpen && (
              <div className="currency-lang-dropdown animate-fade-in" role="menu">
                <div className="currency-lang-section">
                  <div className="currency-lang-title">Display Currency</div>
                  <div className="currency-lang-options">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        className={`currency-lang-option ${selectedCurrency.code === c.code ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCurrency(c);
                          setPickerOpen(false);
                        }}
                      >
                        <strong>{c.symbol} {c.code}</strong>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="currency-lang-section" style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-2)' }}>
                  <div className="currency-lang-title">Language</div>
                  <div className="currency-lang-options">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        className={`currency-lang-option ${selectedLanguage.code === l.code ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedLanguage(l);
                          setPickerOpen(false);
                        }}
                      >
                        <strong>{l.code.toUpperCase()}</strong>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          <Button
            as={Link}
            to="/signin"
            variant="ghost"
            size="sm"
            style={{
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
            }}
          >
            Sign in
          </Button>

          {/* Primary CTA (Static / Scroll-smooth revealed) */}
          <div className={`nav-scroll-cta-container ${scrolledPastHero ? 'visible' : ''}`}>
            <Button
              as={Link}
              to="/signup"
              variant="primary"
              size="sm"
              style={{
                fontWeight: 600,
                padding: '0.45rem 1rem',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              <span>Start a case</span>
              <ArrowRightIcon size={13} />
            </Button>
          </div>
        </div>

        {/* Mobile Action & Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-menu-wrapper">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav animate-fade-in" role="navigation" aria-label="Mobile navigation">
          {/* Trust status pill in mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: 'var(--space-2)' }}>
            <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)' }} />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              JCI & ISO Clinical Coordination Network
            </span>
          </div>

          <a href="#how-it-works" className="nav-link" onClick={closeMobileMenu}>
            How it works
          </a>
          <a href="#proof" className="nav-link" onClick={closeMobileMenu}>
            Itemized quotes
          </a>
          <a href="#standards" className="nav-link" onClick={closeMobileMenu}>
            Standards & governance
          </a>
          <a href="#privacy" className="nav-link" onClick={closeMobileMenu}>
            Privacy & record control
          </a>
          <a href="#faq" className="nav-link" onClick={closeMobileMenu}>
            Frequently asked questions
          </a>

          <div style={{ padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              Theme preference
            </span>
            <ThemeToggle />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button
              as={Link}
              to="/signin"
              variant="ghost"
              size="md"
              fullWidth
              onClick={closeMobileMenu}
            >
              Sign in
            </Button>
            <Button
              as={Link}
              to="/signup"
              variant="primary"
              size="md"
              fullWidth
              onClick={closeMobileMenu}
            >
              Start a case
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
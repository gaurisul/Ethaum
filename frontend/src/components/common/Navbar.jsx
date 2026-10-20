import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartPulseIcon, MenuIcon, XIcon } from './Icons';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <HeartPulseIcon size={18} />
          </div>
          <span className="brand-title">
            Eth<span>Aum</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Overview
          </NavLink>
          <a href="#how-it-works" className="nav-link">
            How it works
          </a>
          <a href="#quality" className="nav-link">
            Quality standards
          </a>
          <a href="#governance" className="nav-link">
            Governance & privacy
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
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
          <Button
            as={Link}
            to="/signup"
            variant="primary"
            size="sm"
            style={{
              boxShadow: 'var(--shadow-sm)',
              fontWeight: 600,
              padding: '0.45rem 1.1rem',
            }}
          >
            Get started
          </Button>
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
        <div className="mobile-nav" role="navigation" aria-label="Mobile navigation">
          <Link to="/" className="nav-link" onClick={closeMobileMenu}>
            Overview
          </Link>
          <a href="#how-it-works" className="nav-link" onClick={closeMobileMenu}>
            How it works
          </a>
          <a href="#quality" className="nav-link" onClick={closeMobileMenu}>
            Quality standards
          </a>
          <a href="#governance" className="nav-link" onClick={closeMobileMenu}>
            Governance & privacy
          </a>

          <div style={{ padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              Theme preference
            </span>
            <ThemeToggle />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button
              as={Link}
              to="/signin"
              variant="outline"
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
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

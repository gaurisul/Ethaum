import React, { useState } from 'react';
import { ShieldCheckIcon, XIcon } from './Icons';

const SESSION_STORAGE_KEY = 'ethaum_demo_banner_dismissed';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // storage unavailable / private mode fallback
    }
  };

  if (dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Synthetic demo disclaimer"
      style={{
        backgroundColor: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border-medium)',
        color: 'var(--color-text-primary)',
        fontSize: 'var(--font-size-xs)',
        padding: '0.4rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 60,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textAlign: 'center',
          paddingRight: '2rem',
        }}
      >
        <ShieldCheckIcon size={14} style={{ color: 'var(--color-brand-accent)', flexShrink: 0 }} />
        <span>
          <strong>Synthetic demo:</strong> do not enter real health data.
        </span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss synthetic demo notice"
        style={{
          position: 'absolute',
          right: '0.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          padding: '0.25rem',
          borderRadius: 'var(--radius-xs)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="banner-dismiss-btn"
      >
        <XIcon size={15} />
      </button>
    </div>
  );
}

export default DemoBanner;

import React from 'react';
import { useTheme } from '../../context/useTheme';
import { SunIcon, MoonIcon, MonitorIcon } from './Icons';

export function ThemeToggle({ className = '' }) {
  const { preference, setPreference, theme } = useTheme();

  const handleCycle = () => {
    if (preference === 'light') {
      setPreference('dark');
    } else if (preference === 'dark') {
      setPreference('system');
    } else {
      setPreference('light');
    }
  };

  const nextPreference =
    preference === 'light' ? 'dark' : preference === 'dark' ? 'system' : 'light';

  const currentIcon =
    preference === 'light' ? (
      <SunIcon size={18} />
    ) : preference === 'dark' ? (
      <MoonIcon size={18} />
    ) : (
      <MonitorIcon size={18} />
    );

  const ariaLabel = `Current theme: ${preference} (active: ${theme}). Click to switch to ${nextPreference} mode.`;

  return (
    <button
      type="button"
      className={`theme-cycle-btn ${className}`}
      onClick={handleCycle}
      aria-label={ariaLabel}
      title={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        padding: 0,
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-full)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
    >
      {currentIcon}
    </button>
  );
}

export default ThemeToggle;

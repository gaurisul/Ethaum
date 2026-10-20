import React from 'react';
import { useTheme } from '../../context/useTheme';
import { SunIcon, MoonIcon, MonitorIcon } from './Icons';

export function ThemeToggle({ compact = false, className = '' }) {
  const { preference, setPreference, theme } = useTheme();

  const options = [
    {
      id: 'light',
      label: 'Light',
      ariaLabel: 'Switch to light mode',
      icon: <SunIcon size={15} />,
    },
    {
      id: 'dark',
      label: 'Dark',
      ariaLabel: 'Switch to dark mode',
      icon: <MoonIcon size={15} />,
    },
    {
      id: 'system',
      label: 'System',
      ariaLabel: 'Use system theme preference',
      icon: <MonitorIcon size={15} />,
    },
  ];

  if (compact) {
    // Quick single-button toggle for tight mobile spaces
    const nextPreference = preference === 'light' ? 'dark' : preference === 'dark' ? 'system' : 'light';
    const currentIcon = preference === 'light' ? <SunIcon size={16} /> : preference === 'dark' ? <MoonIcon size={16} /> : <MonitorIcon size={16} />;
    const label = `Theme: ${preference} (Resolved: ${theme}). Click to switch to ${nextPreference}`;

    return (
      <button
        type="button"
        className={`theme-toggle-compact ${className}`}
        onClick={() => setPreference(nextPreference)}
        aria-label={label}
        title={label}
      >
        {currentIcon}
        <span style={{ fontSize: 'var(--font-size-xs)', textTransform: 'capitalize' }}>
          {preference}
        </span>
      </button>
    );
  }

  return (
    <div
      className={`theme-toggle-group ${className}`}
      role="radiogroup"
      aria-label="Theme preference"
    >
      {options.map((opt) => {
        const isSelected = preference === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={opt.ariaLabel}
            className={`theme-toggle-btn ${isSelected ? 'active' : ''}`}
            onClick={() => setPreference(opt.id)}
            title={opt.ariaLabel}
          >
            {opt.icon}
            <span className="theme-toggle-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;

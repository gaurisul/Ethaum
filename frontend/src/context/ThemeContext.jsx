import React, { useEffect, useState, useMemo } from 'react';
import { ThemeContext } from './ThemeContextDefinition';

const STORAGE_KEY = 'ethaum_theme_preference';

function getInitialPreference() {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // LocalStorage unavailable
  }
  return 'system';
}

function resolveSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(getInitialPreference);
  const [systemTheme, setSystemTheme] = useState(resolveSystemTheme);

  // Synchronize OS dark/light media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Fallback for older engines
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const resolvedTheme = preference === 'system' ? systemTheme : preference;

  // Apply to document element and persist preference
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.setAttribute('data-theme-preference', preference);

    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Ignore storage errors in restricted iframe/private mode
    }
  }, [resolvedTheme, preference]);

  const setPreference = (newPreference) => {
    if (newPreference === 'light' || newPreference === 'dark' || newPreference === 'system') {
      setPreferenceState(newPreference);
    }
  };

  const toggleTheme = () => {
    // Fast toggle: if currently dark -> light; if currently light -> dark
    setPreferenceState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const value = useMemo(
    () => ({
      theme: resolvedTheme,
      preference,
      setPreference,
      toggleTheme,
    }),
    [resolvedTheme, preference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;

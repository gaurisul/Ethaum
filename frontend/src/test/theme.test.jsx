import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/useTheme';
import ThemeToggle from '../components/common/ThemeToggle';

function TestConsumer() {
  const { theme, preference, setPreference, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <span data-testid="pref-val">{preference}</span>
      <button onClick={() => setPreference('dark')}>Set Dark</button>
      <button onClick={() => setPreference('light')}>Set Light</button>
      <button onClick={() => setPreference('system')}>Set System</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeContext and ThemeToggle', () => {
  let matchMediaListeners = [];

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-preference');
    matchMediaListeners = [];

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false, // default light in OS
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') {
          matchMediaListeners.push(callback);
        }
      }),
      removeEventListener: vi.fn((event, callback) => {
        matchMediaListeners = matchMediaListeners.filter((cb) => cb !== callback);
      }),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with system preference by default and sets document data-theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('pref-val')).toHaveTextContent('system');
    expect(screen.getByTestId('theme-val')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme-preference')).toBe('system');
  });

  it('switches to dark mode and persists preference to localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));

    expect(screen.getByTestId('pref-val')).toHaveTextContent('dark');
    expect(screen.getByTestId('theme-val')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme-preference')).toBe('dark');
    expect(localStorage.getItem('ethaum_theme_preference')).toBe('dark');
  });

  it('switches to light mode and persists preference to localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Light'));

    expect(screen.getByTestId('pref-val')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-val')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme-preference')).toBe('light');
    expect(localStorage.getItem('ethaum_theme_preference')).toBe('light');
  });

  it('initializes with previously stored localStorage preference', () => {
    localStorage.setItem('ethaum_theme_preference', 'dark');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('pref-val')).toHaveTextContent('dark');
    expect(screen.getByTestId('theme-val')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('responds to OS matchMedia change events when in system mode', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('pref-val')).toHaveTextContent('system');
    expect(screen.getByTestId('theme-val')).toHaveTextContent('light');

    // Simulate OS switching to dark mode
    act(() => {
      matchMediaListeners.forEach((listener) => listener({ matches: true }));
    });

    expect(screen.getByTestId('theme-val')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('ThemeToggle renders accessible single cycle button stating current mode', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Initial is system
    const toggleBtn = screen.getByRole('button', { name: /current theme: system/i });
    expect(toggleBtn).toBeInTheDocument();

    // Click cycles to light
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /current theme: light/i })).toBeInTheDocument();

    // Click cycles to dark
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /current theme: dark/i })).toBeInTheDocument();

    // Click cycles back to system
    fireEvent.click(toggleBtn);
    expect(screen.getByRole('button', { name: /current theme: system/i })).toBeInTheDocument();
  });
});

import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/useTheme';
import HealthcareGlobe from '../components/common/HealthcareGlobe';
import HomePage from '../pages/HomePage';
import { MemoryRouter } from 'react-router-dom';

function ThemeSwitcherWrapper() {
  const { theme, setPreference } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="set-dark-btn" onClick={() => setPreference('dark')}>Set Dark</button>
      <button data-testid="set-light-btn" onClick={() => setPreference('light')}>Set Light</button>
      <HealthcareGlobe />
    </div>
  );
}

describe('3D Hero Animation Verification (Desktop and Mobile, Light and Dark)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders correctly at desktop size (1280px) in light mode', () => {
    window.innerWidth = 1280;
    window.innerHeight = 800;
    localStorage.setItem('ethaum_theme_preference', 'light');

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText(/cross-border medical care/i)).toBeInTheDocument();
    expect(screen.getByText(/verified hub/i)).toBeInTheDocument();
    expect(screen.getByText(/interactive 3d visualization/i)).toBeInTheDocument();
  });

  it('renders correctly at mobile size (375px) in light mode', () => {
    window.innerWidth = 375;
    window.innerHeight = 667;
    localStorage.setItem('ethaum_theme_preference', 'light');

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText(/verified hub/i)).toBeInTheDocument();
  });

  it('renders correctly at desktop size (1280px) in dark mode', () => {
    window.innerWidth = 1280;
    window.innerHeight = 800;
    localStorage.setItem('ethaum_theme_preference', 'dark');

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText(/verified hub/i)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('renders correctly at mobile size (375px) in dark mode', () => {
    window.innerWidth = 375;
    window.innerHeight = 667;
    localStorage.setItem('ethaum_theme_preference', 'dark');

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText(/verified hub/i)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('safely switches themes without unmounting or crashing the canvas animation', () => {
    const { getByTestId, container } = render(
      <ThemeProvider>
        <ThemeSwitcherWrapper />
      </ThemeProvider>
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(getByTestId('current-theme')).toHaveTextContent('light');

    // Switch to Dark Mode
    act(() => {
      fireEvent.click(getByTestId('set-dark-btn'));
    });
    expect(getByTestId('current-theme')).toHaveTextContent('dark');
    expect(container.querySelector('canvas')).toBe(canvas); // Same canvas instance, not remounted

    // Switch back to Light Mode
    act(() => {
      fireEvent.click(getByTestId('set-light-btn'));
    });
    expect(getByTestId('current-theme')).toHaveTextContent('light');
    expect(container.querySelector('canvas')).toBe(canvas); // Same canvas instance
  });
});

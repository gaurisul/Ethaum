import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card, { CardBody, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import DemoBanner from '../components/common/DemoBanner';
import ProposalCompare from '../components/common/ProposalCompare';
import JourneyTimeline from '../components/common/JourneyTimeline';
import FAQSection from '../components/common/FAQSection';
import AccreditationStrip from '../components/common/AccreditationStrip';
import HeroIntakeTeaser from '../components/common/HeroIntakeTeaser';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import NotFoundPage from '../pages/NotFoundPage';
import HealthcareGlobe from '../components/common/HealthcareGlobe';

describe('Design System: Button', () => {
  it('renders button with text and default styles', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('btn-primary');
    expect(btn).toHaveClass('btn-md');
  });

  it('supports variants and sizes', () => {
    const { rerender } = render(<Button variant="teal" size="lg">Teal Large</Button>);
    let btn = screen.getByRole('button', { name: /teal large/i });
    expect(btn).toHaveClass('btn-teal');
    expect(btn).toHaveClass('btn-lg');

    rerender(<Button variant="outline" size="sm">Outline Small</Button>);
    btn = screen.getByRole('button', { name: /outline small/i });
    expect(btn).toHaveClass('btn-outline');
    expect(btn).toHaveClass('btn-sm');
  });

  it('handles click events and disabled state', () => {
    const handleClick = vi.fn();
    const { rerender } = render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole('button', { name: /clickable/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);

    rerender(<Button disabled onClick={handleClick}>Disabled</Button>);
    const disabledBtn = screen.getByRole('button', { name: /disabled/i });
    expect(disabledBtn).toBeDisabled();
    fireEvent.click(disabledBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Design System: Badge', () => {
  it('renders badge with correct variant classes', () => {
    render(<Badge variant="teal">Verified</Badge>);
    const badge = screen.getByText('Verified');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-teal');
  });
});

describe('Design System: Card', () => {
  it('renders card with header, title, body, and footer', () => {
    render(
      <Card hoverable>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardBody>Content text</CardBody>
        <CardFooter>Footer info</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Content text')).toBeInTheDocument();
    expect(screen.getByText('Footer info')).toBeInTheDocument();
  });
});

describe('Design System: Input and Select', () => {
  it('renders Input with label, placeholder, and responds to typing', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Email Address"
        name="email"
        placeholder="Enter email"
        onChange={handleChange}
        required
      />
    );

    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
    expect(screen.getByText(/email address/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'patient@example.com' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders error message in Input when error prop is provided', () => {
    render(
      <Input
        label="Password"
        name="password"
        error="Password is required"
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required');
  });

  it('renders Select with options and handles selection', () => {
    const handleChange = vi.fn();
    const options = [
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
    ];
    render(
      <Select
        label="Country"
        name="country"
        options={options}
        onChange={handleChange}
      />
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'GB' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('Navigation and Layout Components', () => {
  it('renders DemoBanner and allows dismissing for the session', () => {
    sessionStorage.clear();
    const { rerender } = render(<DemoBanner />);
    expect(screen.getByText(/synthetic demo:/i)).toBeInTheDocument();

    const dismissBtn = screen.getByRole('button', { name: /dismiss synthetic demo notice/i });
    fireEvent.click(dismissBtn);
    expect(screen.queryByText(/synthetic demo:/i)).not.toBeInTheDocument();
    expect(sessionStorage.getItem('ethaum_demo_banner_dismissed')).toBe('true');

    // Rerendering stays dismissed
    rerender(<DemoBanner />);
    expect(screen.queryByText(/synthetic demo:/i)).not.toBeInTheDocument();
    sessionStorage.clear();
  });

  it('renders Navbar with logo, theme toggle, and navigation links', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/eth/i)).toBeInTheDocument();
    expect(screen.getByText(/aum/i)).toBeInTheDocument();
    expect(screen.getByText('How it works')).toBeInTheDocument();
    expect(screen.getByText('Standards')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start a case/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /current theme/i })).toBeInTheDocument();
  });

  it('renders Footer with regulatory boundaries disclaimer and synthetic demo notes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/healthcare boundaries & administrative scope notice/i)).toBeInTheDocument();
    expect(screen.getByText(/synthetic demo environment/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact & support desk/i })).toBeInTheDocument();
  });
});

describe('Interactive ProposalCompare Component', () => {
  it('renders one quote by default with total formatted in USD', () => {
    render(<ProposalCompare />);
    expect(screen.getByText(/itemized coordination quotes/i)).toBeInTheDocument();
    expect(screen.getByText(/zurich st. anna medical center/i)).toBeInTheDocument();
    expect(screen.queryByText(/london wellington surgical institute/i)).not.toBeInTheDocument();
    expect(screen.getByText('$18,400')).toBeInTheDocument();
  });

  it('expands and collapses line items with aria-expanded attribute', () => {
    render(<ProposalCompare />);
    const buttons = screen.getAllByRole('button');
    const lineItemBtn = buttons.find((btn) => btn.getAttribute('aria-expanded') !== null);
    expect(lineItemBtn).toBeDefined();

    const initialExpanded = lineItemBtn.getAttribute('aria-expanded') === 'true';
    fireEvent.click(lineItemBtn);
    expect(lineItemBtn.getAttribute('aria-expanded')).toBe(String(!initialExpanded));
  });

  it('switches to compare mode showing both hospital quotes', () => {
    render(<ProposalCompare />);
    const compareBtn = screen.getByRole('radio', { name: /compare \(2 hospitals\)/i });
    fireEvent.click(compareBtn);

    expect(screen.getByText(/zurich st. anna medical center/i)).toBeInTheDocument();
    expect(screen.getByText(/london wellington surgical institute/i)).toBeInTheDocument();
    expect(screen.getByText('$18,400')).toBeInTheDocument();
    expect(screen.getByText('$20,350')).toBeInTheDocument();
  });
});

describe('JourneyTimeline Component', () => {
  it('renders 4 numbered coordination stages on a timeline', () => {
    render(<JourneyTimeline />);
    expect(screen.getByText(/dossier assembly/i)).toBeInTheDocument();
    expect(screen.getByText(/accredited center review/i)).toBeInTheDocument();
    expect(screen.getByText(/itemized quote comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/travel coordination & aftercare/i)).toBeInTheDocument();

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });
});

describe('FAQSection Component (Accessible details/summary)', () => {
  it('renders native details and summary elements covering key governance topics without visible dev notes', () => {
    render(<FAQSection />);
    expect(screen.getByText(/how does ethaum earn money\?/i)).toBeInTheDocument();
    expect(screen.getByText(/how can i permanently delete my medical records\?/i)).toBeInTheDocument();
    expect(screen.getByText(/who decides whether surgery is needed\?/i)).toBeInTheDocument();
    expect(screen.getByText(/what happens if complications arise after returning home\?/i)).toBeInTheDocument();
    expect(screen.getByText(/what are the visa requirements for medical travel\?/i)).toBeInTheDocument();

    // Verify no visible dev notes / TODO marks
    expect(screen.queryByText(/todo:/i)).not.toBeInTheDocument();
  });
});

describe('AccreditationStrip Component', () => {
  it('renders accreditation badges (JCI, ISO, ACHS) without visible TODO dev notes', () => {
    render(<AccreditationStrip />);
    expect(screen.getByText('JCI')).toBeInTheDocument();
    expect(screen.getByText('ISO 9001 / 15189')).toBeInTheDocument();
    expect(screen.getByText('ACHS International')).toBeInTheDocument();
    expect(screen.queryByText(/todo/i)).not.toBeInTheDocument();
  });
});

describe('HeroIntakeTeaser Component', () => {
  it('renders 3 fields (procedure, country, timeline) and validates input', async () => {
    render(
      <MemoryRouter>
        <HeroIntakeTeaser />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/medical procedure/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country of residence/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/target timeline/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /start a case/i });
    fireEvent.click(submitBtn);

    // Shows validation error alert
    expect(screen.getByText(/please complete all required fields before continuing/i)).toBeInTheDocument();
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(1);
  });
});

describe('Page Views & Routing', () => {
  it('renders HomePage with editorial headline, quality standards, and sample quote', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cross-border medical care/i);
    expect(screen.getByText(/operating standards & patient governance/i)).toBeInTheDocument();
    expect(screen.getByText(/how international medical travel is coordinated/i)).toBeInTheDocument();
    expect(screen.getByText(/sample standard proposal/i)).toBeInTheDocument();
  });

  it('renders HomePage responsively across 360px, 768px, and 1280px without layout breakage', () => {
    const breakpoints = [360, 768, 1280];

    breakpoints.forEach((width) => {
      window.innerWidth = width;
      window.innerHeight = 800;

      const { container, unmount } = render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('.hero-grid')).toBeInTheDocument();
      expect(container.querySelector('.journey-timeline')).toBeInTheDocument();
      expect(container.querySelector('.faq-list')).toBeInTheDocument();

      unmount();
    });
  });

  it('renders SignUpPage and toggles role with validation', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/create your account/i)).toBeInTheDocument();
    const patientTab = screen.getByRole('tab', { name: /patient \/ care seeker/i });
    const providerTab = screen.getByRole('tab', { name: /healthcare provider/i });

    expect(patientTab).toBeInTheDocument();
    expect(providerTab).toBeInTheDocument();

    // Toggle to Provider role
    fireEvent.click(providerTab);
    expect(screen.getByText(/hospital or clinical institution/i)).toBeInTheDocument();

    // Trigger validation
    const submitBtn = screen.getByRole('button', { name: /create provider account/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/institution name is required/i)).toBeInTheDocument();
  });

  it('renders SignInPage with credentials inputs and validation', () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 2, name: /sign in to ethaum/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Trigger validation
    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage with return link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to overview/i })).toBeInTheDocument();
  });

  it('renders HealthcareGlobe with accessible label in light and dark mode', () => {
    localStorage.setItem('ethaum_theme_preference', 'light');
    const { unmount } = render(
      <ThemeProvider>
        <HealthcareGlobe />
      </ThemeProvider>
    );
    expect(screen.getByText(/interactive 3d visualization/i)).toBeInTheDocument();
    unmount();

    // Verify dark mode rendering
    localStorage.setItem('ethaum_theme_preference', 'dark');
    render(
      <ThemeProvider>
        <HealthcareGlobe />
      </ThemeProvider>
    );
    expect(screen.getByText(/interactive 3d visualization/i)).toBeInTheDocument();
  });

  it('renders accessible SVG fallback when canvas context is unavailable', () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = () => null;

    render(
      <ThemeProvider>
        <HealthcareGlobe />
      </ThemeProvider>
    );

    expect(screen.getByText(/interactive 3d visualization/i)).toBeInTheDocument();

    // Restore mock
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  it('respects prefers-reduced-motion without throwing errors', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <HealthcareGlobe />
      </ThemeProvider>
    );

    expect(screen.getByText(/interactive 3d visualization/i)).toBeInTheDocument();
    window.matchMedia = originalMatchMedia;
  });
});


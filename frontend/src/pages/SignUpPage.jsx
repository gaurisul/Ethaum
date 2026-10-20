import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  UserIcon,
  MailIcon,
  LockIcon,
  BuildingIcon,
  ShieldCheckIcon,
} from '../components/common/Icons';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import Card, { CardBody, CardHeader, CardFooter } from '../components/common/Card';

export function SignUpPage() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState('patient');

  const incomingProcedure = searchParams.get('procedure') || '';
  const incomingCountry = searchParams.get('country') || '';
  const incomingTimeline = searchParams.get('timeline') || '';
  const incomingPreviewId = searchParams.get('previewId') || '';

  const mapCountryCode = (countryName) => {
    if (!countryName) return '';
    const norm = countryName.toLowerCase();
    if (norm.includes('united states') || norm === 'us') return 'US';
    if (norm.includes('united kingdom') || norm === 'gb' || norm === 'uk') return 'GB';
    if (norm.includes('canada') || norm === 'ca') return 'CA';
    if (norm.includes('australia') || norm === 'au') return 'AU';
    if (norm.includes('germany') || norm === 'de') return 'DE';
    if (norm.includes('singapore') || norm === 'sg') return 'SG';
    if (norm.includes('emirates') || norm === 'ae') return 'AE';
    return 'OTHER';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: mapCountryCode(incomingCountry),
    password: '',
    confirmPassword: '',
    organizationName: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'SG', label: 'Singapore' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'OTHER', label: 'Other Jurisdiction' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (role === 'provider' && !formData.organizationName.trim()) {
      newErrors.organizationName = 'Institution name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.country) {
      newErrors.country = 'Please select a country.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must accept the terms to proceed.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        padding: 'var(--space-12) 0',
        minHeight: 'calc(100vh - var(--header-height) - 180px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '580px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Badge variant="teal" style={{ marginBottom: 'var(--space-2)' }}>
            EthAum coordination portal
          </Badge>
          <h2>Create your account</h2>
          <p style={{ marginTop: 'var(--space-1)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Register as an individual seeking medical care or an accredited hospital team.
          </p>
        </div>

        <Card>
          <CardHeader>
            {/* Intake Teaser Prefill Banner */}
            {incomingProcedure && (
              <div
                style={{
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-brand-accent-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  marginBottom: 'var(--space-4)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)', flexShrink: 0 }} />
                <div>
                  <strong>Pre-registered inquiry{incomingPreviewId ? ` (#${incomingPreviewId.slice(0, 15)}...)` : ''}:</strong>{' '}
                  {incomingProcedure} {incomingTimeline ? `• ${incomingTimeline}` : ''}
                </div>
              </div>
            )}

            {/* Role Selector Tabs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: 'var(--color-bg-subtle)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                border: '1px solid var(--color-border-subtle)',
              }}
              role="tablist"
              aria-label="Account type selection"
            >
              <button
                type="button"
                role="tab"
                aria-selected={role === 'patient'}
                onClick={() => {
                  setRole('patient');
                  setErrors({});
                }}
                style={{
                  padding: '0.625rem 1rem',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: role === 'patient' ? 'var(--color-bg-surface)' : 'transparent',
                  color: role === 'patient' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  boxShadow: role === 'patient' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all var(--transition-fast)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Patient / care seeker
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={role === 'provider'}
                onClick={() => {
                  setRole('provider');
                  setErrors({});
                }}
                style={{
                  padding: '0.625rem 1rem',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: role === 'provider' ? 'var(--color-bg-surface)' : 'transparent',
                  color: role === 'provider' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  boxShadow: role === 'provider' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all var(--transition-fast)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Healthcare provider
              </button>
            </div>
          </CardHeader>

          <CardBody>
            {formSubmitted ? (
              <div
                style={{
                  padding: 'var(--space-6)',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-status-success-bg)',
                  border: '1px solid var(--color-status-success-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ color: 'var(--color-status-success)', marginBottom: 'var(--space-2)' }}>
                  <ShieldCheckIcon size={36} />
                </div>
                <h4 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>
                  Interface validated
                </h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                  Theme tokens, accessible controls, and form validation are active. Backend session authentication and database records will be connected in Phase 2.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      country: '',
                      password: '',
                      confirmPassword: '',
                      organizationName: '',
                      agreedToTerms: false,
                    });
                  }}
                >
                  Reset form preview
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {role === 'provider' && (
                  <Input
                    label="Hospital or clinical institution"
                    id="organizationName"
                    name="organizationName"
                    placeholder="e.g. Asan Medical Center"
                    value={formData.organizationName}
                    onChange={handleChange}
                    error={errors.organizationName}
                    required
                    leftIcon={<BuildingIcon size={16} />}
                  />
                )}

                <Input
                  label={role === 'patient' ? 'Full legal name' : 'Authorized representative name'}
                  id="name"
                  name="name"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  leftIcon={<UserIcon size={16} />}
                />

                <Input
                  label="Email address"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  leftIcon={<MailIcon size={16} />}
                />

                <Select
                  label={role === 'patient' ? 'Country of residence' : 'Hospital country / jurisdiction'}
                  id="country"
                  name="country"
                  options={countries}
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                  required
                />

                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  leftIcon={<LockIcon size={16} />}
                  helperText="Use at least 8 characters with a mix of letters and numbers."
                />

                <Input
                  label="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  leftIcon={<LockIcon size={16} />}
                />

                <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                    />
                    <span>
                      I agree to the platform Terms of Service, acknowledge that EthAum does not provide medical diagnosis, and recognize this evaluation environment uses <strong>demonstration records</strong>.
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <span className="form-error" role="alert" style={{ marginTop: 'var(--space-1)' }}>
                      {errors.agreedToTerms}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Create {role === 'patient' ? 'patient' : 'provider'} account
                </Button>
              </form>
            )}
          </CardBody>

          <CardFooter>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                textAlign: 'center',
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: 'var(--space-4)',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                Already registered?{' '}
                <Link to="/signin" style={{ fontWeight: 600, color: 'var(--color-brand-accent)' }}>
                  Sign in
                </Link>
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <ShieldCheckIcon size={15} style={{ color: 'var(--color-brand-accent)' }} />
                <span>Protected by encrypted transit and HIPAA/GDPR-aligned principles</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUpPage;

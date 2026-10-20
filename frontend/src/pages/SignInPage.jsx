import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MailIcon,
  LockIcon,
  ShieldCheckIcon,
  InfoIcon,
} from '../components/common/Icons';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Card, { CardBody, CardFooter } from '../components/common/Card';

export function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
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
      <div className="container" style={{ maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <Badge variant="teal" style={{ marginBottom: 'var(--space-2)' }}>
            Patient & provider portal
          </Badge>
          <h2>Sign in to EthAum</h2>
          <p style={{ marginTop: 'var(--space-1)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Access your coordination cases, quotes, and hospital profile.
          </p>
        </div>

        <Card>
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
                  Form validation and theme system are functioning. Backend session tokens and protected route guards will be integrated in Phase 2.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ email: '', password: '', rememberMe: false });
                  }}
                >
                  Reset form view
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
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

                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  leftIcon={<LockIcon size={16} />}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password recovery will be available in Phase 2 (Authentication implementation).');
                    }}
                    style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-brand-accent)' }}
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  style={{ marginTop: 'var(--space-2)' }}
                >
                  Sign in
                </Button>
              </form>
            )}

            {/* Evaluation Account Notice */}
            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                gap: '0.625rem',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ color: 'var(--color-brand-accent)', flexShrink: 0, marginTop: '2px' }}>
                <InfoIcon size={15} />
              </div>
              <div>
                <strong>Evaluation environment:</strong> Backend authentication and session management will be added in Phase 2.
              </div>
            </div>
          </CardBody>

          <CardFooter>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                textAlign: 'center',
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: 'var(--space-4)',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>
                Don&apos;t have an account yet?{' '}
                <Link to="/signup" style={{ fontWeight: 600, color: 'var(--color-brand-accent)' }}>
                  Create account
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignInPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon } from './Icons';
import Button from './Button';

const PROCEDURE_OPTIONS = [
  'Total Hip Replacement',
  'Total Knee Replacement',
  'Cardiac Valve Repair',
  'Coronary Artery Bypass',
  'Spinal Fusion & Discectomy',
  'Oncology Second Opinion & Surgery',
  'Reconstructive Plastic Surgery',
];

const COUNTRY_OPTIONS = [
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'Other', label: 'Other Country' },
];

const TIMELINE_OPTIONS = [
  'Within 2 weeks (Urgent)',
  'Within 1-2 months',
  'Within 3-6 months',
  'Flexible / Researching options',
];

export function HeroIntakeTeaser() {
  const navigate = useNavigate();
  const [procedure, setProcedure] = useState('');
  const [country, setCountry] = useState('');
  const [timeline, setTimeline] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});

    // Client-side quick check
    const localErrors = {};
    if (!procedure.trim()) {
      localErrors.procedure = 'Procedure is required. Please enter or select your procedure.';
    }
    if (!country.trim()) {
      localErrors.country = 'Country of residence is required. Please select your country.';
    }
    if (!timeline.trim()) {
      localErrors.timeline = 'Timeline is required. Please select your estimated timeframe.';
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setErrorMsg('Please complete all required fields before continuing.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/intake-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedure: procedure.trim(),
          country: country.trim(),
          timeline: timeline.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          setFieldErrors(data.details);
          const firstDetail = Object.values(data.details)[0];
          setErrorMsg(firstDetail || data.message || 'Submission failed. Please fix the highlighted fields.');
        } else {
          setErrorMsg(data.message || 'Unable to submit your inquiry. Please check your connection and try again.');
        }
        return;
      }

      setSuccessData(data);

      // Route to full signup/intake flow with prefilled query parameters
      const params = new URLSearchParams({
        procedure: procedure.trim(),
        country: country.trim(),
        timeline: timeline.trim(),
        previewId: data.id || '',
      });

      // Brief pause to allow user to see success confirmation before transitioning
      setTimeout(() => {
        navigate(`/signup?${params.toString()}`);
      }, 750);
    } catch {
      // Offline / network failure fallback: still allow patient to proceed with prefilled values
      setErrorMsg('Backend connection unavailable. You can still proceed to complete your intake dossier.');
      setTimeout(() => {
        const params = new URLSearchParams({
          procedure: procedure.trim(),
          country: country.trim(),
          timeline: timeline.trim(),
        });
        navigate(`/signup?${params.toString()}`);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: 'var(--space-8)',
        marginBottom: 'var(--space-8)',
      }}
      aria-label="Coordination case inquiry teaser"
    >
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
          <ShieldCheckIcon size={16} style={{ color: 'var(--color-brand-accent)' }} />
          <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
            Start your case review in 60 seconds
          </strong>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Enter procedural requirements to initiate an anonymized dossier preview and compare hospital proposals.
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          style={{
            padding: '0.625rem 0.875rem',
            backgroundColor: 'var(--color-status-danger-bg)',
            border: '1px solid var(--color-status-danger-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-status-danger)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 500,
            marginBottom: 'var(--space-4)',
          }}
        >
          <strong>Action required:</strong> {errorMsg}
        </div>
      )}

      {successData && (
        <div
          role="status"
          style={{
            padding: '0.625rem 0.875rem',
            backgroundColor: 'var(--color-status-success-bg)',
            border: '1px solid var(--color-status-success-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-status-success)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 500,
            marginBottom: 'var(--space-4)',
          }}
        >
          ✓ Case #{successData.id} initiated. Redirecting to your encrypted dossier setup...
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {/* Procedure Field */}
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="teaser-procedure" className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>
              Medical procedure
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <input
              id="teaser-procedure"
              list="teaser-procedures-list"
              type="text"
              className={`form-input ${fieldErrors.procedure ? 'has-error' : ''}`}
              placeholder="e.g., Joint replacement"
              value={procedure}
              onChange={(e) => {
                setProcedure(e.target.value);
                if (fieldErrors.procedure) setFieldErrors((prev) => ({ ...prev, procedure: '' }));
              }}
              required
              aria-invalid={!!fieldErrors.procedure}
              aria-describedby={fieldErrors.procedure ? 'teaser-procedure-error' : undefined}
            />
            <datalist id="teaser-procedures-list">
              {PROCEDURE_OPTIONS.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
            {fieldErrors.procedure && (
              <span id="teaser-procedure-error" className="form-error" role="alert">
                {fieldErrors.procedure}
              </span>
            )}
          </div>

          {/* Country Field */}
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="teaser-country" className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>
              Country of residence
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <select
              id="teaser-country"
              className={`form-select ${fieldErrors.country ? 'has-error' : ''}`}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                if (fieldErrors.country) setFieldErrors((prev) => ({ ...prev, country: '' }));
              }}
              required
              aria-invalid={!!fieldErrors.country}
              aria-describedby={fieldErrors.country ? 'teaser-country-error' : undefined}
            >
              <option value="">Select country...</option>
              {COUNTRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {fieldErrors.country && (
              <span id="teaser-country-error" className="form-error" role="alert">
                {fieldErrors.country}
              </span>
            )}
          </div>

          {/* Timeline Field */}
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="teaser-timeline" className="form-label" style={{ fontSize: 'var(--font-size-xs)' }}>
              Target timeline
              <span className="form-label-required" aria-hidden="true">*</span>
            </label>
            <select
              id="teaser-timeline"
              className={`form-select ${fieldErrors.timeline ? 'has-error' : ''}`}
              value={timeline}
              onChange={(e) => {
                setTimeline(e.target.value);
                if (fieldErrors.timeline) setFieldErrors((prev) => ({ ...prev, timeline: '' }));
              }}
              required
              aria-invalid={!!fieldErrors.timeline}
              aria-describedby={fieldErrors.timeline ? 'teaser-timeline-error' : undefined}
            >
              <option value="">Select timeline...</option>
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldErrors.timeline && (
              <span id="teaser-timeline-error" className="form-error" role="alert">
                {fieldErrors.timeline}
              </span>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
          >
            {loading ? 'Submitting inquiry...' : 'Start coordination case'}
            <ArrowRightIcon size={16} />
          </Button>

          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Free administrative preliminary review • No credit card required
          </span>
        </div>
      </form>
    </div>
  );
}

export default HeroIntakeTeaser;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ShieldCheckIcon, ChevronDownIcon, CheckIcon, SearchIcon, LockIcon } from './Icons';
import Button from './Button';

export const SPECIALTY_GROUPS = [
  {
    specialty: 'Orthopedics & Joint Reconstruction',
    procedures: [
      'Total Hip Replacement (Arthroplasty)',
      'Total Knee Replacement (Arthroplasty)',
      'Anterior Cruciate Ligament (ACL) Reconstruction',
      'Spinal Fusion & Microdiscectomy',
    ],
  },
  {
    specialty: 'Cardiology & Thoracic Surgery',
    procedures: [
      'Coronary Artery Bypass Graft (CABG)',
      'Cardiac Valve Repair & Replacement',
      'Transcatheter Aortic Valve Implantation (TAVI)',
    ],
  },
  {
    specialty: 'Oncology & Precision Surgery',
    procedures: [
      'Surgical Oncology Resection',
      'Robotic Radical Prostatectomy',
      'Multidisciplinary Tumor Board Second Opinion',
    ],
  },
  {
    specialty: 'Reconstructive & Specialized Care',
    procedures: [
      'Reconstructive Plastic & Microsurgery',
      'Complex Craniofacial Surgery',
      'Deep Brain Stimulation (DBS)',
    ],
  },
];

const ALL_PROCEDURES = SPECIALTY_GROUPS.flatMap((g) => g.procedures);

const COUNTRY_OPTIONS = [
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'Other', label: 'Other Jurisdiction' },
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

  // Combobox interactive dropdown state
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const comboboxRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successData, setSuccessData] = useState(null);

  // Close combobox when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target)) {
        setComboboxOpen(false);
      }
    };
    if (comboboxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [comboboxOpen]);

  const filteredGroups = SPECIALTY_GROUPS.map((group) => ({
    specialty: group.specialty,
    procedures: group.procedures.filter((p) =>
      p.toLowerCase().includes(searchFilter.toLowerCase())
    ),
  })).filter((group) => group.procedures.length > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});

    // Client-side validation
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

      const params = new URLSearchParams({
        procedure: procedure.trim(),
        country: country.trim(),
        timeline: timeline.trim(),
        previewId: data.id || '',
      });

      setTimeout(() => {
        navigate(`/signup?${params.toString()}`);
      }, 750);
    } catch {
      // Offline fallback: still proceed with params
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
      className="case-review-card"
      aria-label="Coordination case inquiry teaser"
    >
      {/* Multi-step Header */}
      <div className="case-review-header">
        <div className="case-review-step-bar">
          <div className="case-step-pill">
            <span className="case-step-dot" aria-hidden="true" />
            <span>Step 1 of 2: Clinical Parameters</span>
          </div>
          <div className="case-security-pill">
            <LockIcon size={12} style={{ color: 'var(--color-brand-accent)' }} />
            <span>256-bit HIPAA Encrypted</span>
          </div>
        </div>

        {/* Progress bar visual indicator */}
        <div className="case-step-progress-track" aria-hidden="true">
          <div className="case-step-progress-fill" style={{ width: '50%' }} />
        </div>

        <div style={{ marginTop: 'var(--space-3)' }}>
          <h2 className="case-review-title">
            Initiate confidential case review
          </h2>
          <p className="case-review-subtitle">
            Specify procedure requirements to receive verified hospital quotes and physician dossier evaluations.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="case-review-alert-danger animate-fade-in"
        >
          <strong>Action required:</strong> {errorMsg}
        </div>
      )}

      {successData && (
        <div
          role="status"
          className="case-review-alert-success animate-fade-in"
        >
          ✓ Case #{successData.id} initiated. Redirecting to your encrypted dossier setup...
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="case-review-form">
        <div className="case-form-fields-stack">
          {/* 1. Grouped Procedure Combobox */}
          <div className="form-group-elevated" ref={comboboxRef}>
            <label htmlFor="teaser-procedure" className="elevated-label">
              <span>Medical procedure</span>
              <span className="elevated-required" aria-hidden="true">*</span>
            </label>
            <div className="combobox-wrapper">
              <input
                id="teaser-procedure"
                type="text"
                role="combobox"
                aria-expanded={comboboxOpen}
                aria-autocomplete="list"
                aria-controls="procedure-dropdown-list"
                className={`form-input-elevated ${fieldErrors.procedure ? 'has-error' : ''}`}
                placeholder="Select or search specialty procedure..."
                value={procedure}
                onFocus={() => {
                  setComboboxOpen(true);
                  setSearchFilter(procedure);
                }}
                onChange={(e) => {
                  setProcedure(e.target.value);
                  setSearchFilter(e.target.value);
                  setComboboxOpen(true);
                  if (fieldErrors.procedure) {
                    setFieldErrors((prev) => ({ ...prev, procedure: '' }));
                  }
                }}
                required
                aria-invalid={!!fieldErrors.procedure}
                aria-describedby={fieldErrors.procedure ? 'teaser-procedure-error' : undefined}
                autoComplete="off"
              />
              <button
                type="button"
                className="combobox-toggle-btn"
                onClick={() => setComboboxOpen((prev) => !prev)}
                aria-label="Toggle procedures dropdown list"
                tabIndex={-1}
              >
                <ChevronDownIcon
                  size={16}
                  style={{
                    transform: comboboxOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--transition-fast)',
                  }}
                />
              </button>

              {/* Native datalist fallback for accessibility */}
              <datalist id="teaser-procedures-list">
                {ALL_PROCEDURES.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>

              {/* Custom Grouped Specialty Dropdown */}
              {comboboxOpen && (
                <div
                  id="procedure-dropdown-list"
                  className="combobox-dropdown-menu animate-fade-in"
                  role="listbox"
                >
                  {filteredGroups.length === 0 ? (
                    <div className="combobox-empty-message">
                      No matching procedures found. You may continue with your custom term: "<strong>{searchFilter}</strong>"
                    </div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.specialty} className="combobox-group" role="group" aria-label={group.specialty}>
                        <div className="combobox-group-header">
                          <span className="combobox-group-dot" />
                          <span>{group.specialty}</span>
                        </div>
                        {group.procedures.map((proc) => {
                          const isSelected = procedure === proc;
                          return (
                            <button
                              key={proc}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              className={`combobox-option ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setProcedure(proc);
                                setComboboxOpen(false);
                                if (fieldErrors.procedure) {
                                  setFieldErrors((prev) => ({ ...prev, procedure: '' }));
                                }
                              }}
                            >
                              <span>{proc}</span>
                              {isSelected && <CheckIcon size={14} style={{ color: 'var(--color-brand-accent)' }} />}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {fieldErrors.procedure && (
              <span id="teaser-procedure-error" className="form-error" role="alert">
                {fieldErrors.procedure}
              </span>
            )}
          </div>

          {/* 2-Column Row for Country and Timeline */}
          <div className="case-form-grid-two">
            {/* Country of Residence */}
            <div className="form-group-elevated">
              <label htmlFor="teaser-country" className="elevated-label">
                <span>Country of residence</span>
                <span className="elevated-required" aria-hidden="true">*</span>
              </label>
              <div className="select-wrapper-elevated">
                <select
                  id="teaser-country"
                  className={`form-select-elevated ${fieldErrors.country ? 'has-error' : ''}`}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (fieldErrors.country) {
                      setFieldErrors((prev) => ({ ...prev, country: '' }));
                    }
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
                <div className="select-chevron-indicator" aria-hidden="true">
                  <ChevronDownIcon size={15} />
                </div>
              </div>
              {fieldErrors.country && (
                <span id="teaser-country-error" className="form-error" role="alert">
                  {fieldErrors.country}
                </span>
              )}
            </div>

            {/* Target Timeline */}
            <div className="form-group-elevated">
              <label htmlFor="teaser-timeline" className="elevated-label">
                <span>Target timeline</span>
                <span className="elevated-required" aria-hidden="true">*</span>
              </label>
              <div className="select-wrapper-elevated">
                <select
                  id="teaser-timeline"
                  className={`form-select-elevated ${fieldErrors.timeline ? 'has-error' : ''}`}
                  value={timeline}
                  onChange={(e) => {
                    setTimeline(e.target.value);
                    if (fieldErrors.timeline) {
                      setFieldErrors((prev) => ({ ...prev, timeline: '' }));
                    }
                  }}
                  required
                  aria-invalid={!!fieldErrors.timeline}
                  aria-describedby={fieldErrors.timeline ? 'teaser-timeline-error' : undefined}
                >
                  <option value="">Select timeframe...</option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="select-chevron-indicator" aria-hidden="true">
                  <ChevronDownIcon size={15} />
                </div>
              </div>
              {fieldErrors.timeline && (
                <span id="teaser-timeline-error" className="form-error" role="alert">
                  {fieldErrors.timeline}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button & Explicit Microcopy */}
        <div className="case-review-action-block">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={loading}
            className="case-submit-btn"
          >
            <span>{loading ? 'Transmitting inquiry...' : 'Start a case'}</span>
            <span className="case-submit-arrow" aria-hidden="true">→</span>
          </Button>

          <div className="case-security-microcopy">
            <div className="microcopy-row">
              <span className="microcopy-badge">Encrypted record storage</span>
              <span className="microcopy-divider">•</span>
              <span className="microcopy-badge">No data shared without explicit consent</span>
              <span className="microcopy-divider">•</span>
              <span className="microcopy-badge">Zero spam guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HeroIntakeTeaser;
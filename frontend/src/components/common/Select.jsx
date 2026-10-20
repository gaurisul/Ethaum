import React from 'react';

export function Select({
  label,
  id,
  name,
  options = [],
  value,
  onChange,
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  className = '',
  placeholder = 'Select an option',
  ...props
}) {
  const selectId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          <span>
            {label}
            {required && <span className="form-label-required" aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className="input-wrapper">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={`form-select ${error ? 'has-error' : ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <span id={`${selectId}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${selectId}-helper`} className="form-helper">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Select;


import React from 'react';
import { ShieldCheckIcon } from './Icons';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('EthAum Interface Error Boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 'var(--space-16) var(--space-4)',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
          role="alert"
        >
          <div
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                color: 'var(--color-brand-accent)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <ShieldCheckIcon size={36} />
            </div>
            <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }}>
              Clinical interface refresh required
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-6)' }}>
              We encountered a client-side interface interruption. Your encrypted data and session parameters remain secure.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-primary btn-md"
                onClick={this.handleReload}
              >
                Reload application
              </button>
              <a href="/" className="btn btn-secondary btn-md">
                Return to home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
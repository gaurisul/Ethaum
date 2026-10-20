import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { ArrowRightIcon } from '../components/common/Icons';

export function NotFoundPage() {
  return (
    <div
      className="animate-fade-in"
      style={{
        padding: 'var(--space-20) 0',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '520px' }}>
        <Badge variant="warning" style={{ marginBottom: 'var(--space-3)' }}>
          404 Not Found
        </Badge>
        <h2 style={{ marginBottom: 'var(--space-3)' }}>Page Not Found</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          The page or coordination route you requested does not exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary" size="md">
          Return to Overview
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;


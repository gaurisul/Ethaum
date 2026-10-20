export function notFoundHandler(req, res, _next) {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: `Route not found: ${req.method} ${req.path}`
  });
}

export function errorHandler(err, _req, res, _next) {
  // Do not expose stack traces or sensitive details to clients in production.
  console.error('Request failed:', err?.message || 'Unknown error');
  const status = err.status || 500;
  const response = {
    error: err.code || 'INTERNAL_SERVER_ERROR',
    message: status < 500 ? err.message : 'An unexpected error occurred.',
  };
  if (status < 500 && err.details) {
    response.details = err.details;
  }
  res.status(status).json(response);
}

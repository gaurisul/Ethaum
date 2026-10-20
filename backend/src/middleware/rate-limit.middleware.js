// In-memory rate limiting middleware
export function createRateLimiter({ windowMs = 60000, max = 30, message = 'Too many requests. Please wait a moment before trying again.' } = {}) {
  const ipHits = new Map();

  return function rateLimiter(req, res, next) {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();

    const record = ipHits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    ipHits.set(ip, record);

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        error: 'RATE_LIMIT_EXCEEDED',
        message,
        retryAfterSeconds,
      });
    }

    next();
  };
}

export default createRateLimiter;

import { Router } from 'express';
import { checkDatabaseReadiness } from '../lib/prisma.js';

const router = Router();

// Liveness check - verifies that Express API process is running
router.get('/', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'ethaum-api',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Readiness check - verifies that external dependencies (PostgreSQL) are reachable
router.get('/ready', async (_req, res) => {
  const dbCheck = await checkDatabaseReadiness();

  if (!dbCheck.ok) {
    return res.status(503).json({
      ok: false,
      service: 'ethaum-api',
      status: 'not_ready',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(200).json({
    ok: true,
    service: 'ethaum-api',
    status: 'ready',
    database: 'connected',
    timestamp: new Date().toISOString(),
  });
});

export default router;

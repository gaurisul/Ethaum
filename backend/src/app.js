import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import healthRoutes from './routes/health.routes.js';
import intakeRoutes from './routes/intake.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import { createRateLimiter } from './middleware/rate-limit.middleware.js';

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? [process.env.CLIENT_ORIGIN]
  : ['http://localhost:5174', 'http://localhost:5173'];

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy.'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({ name: 'EthAum API', status: 'running' });
});

app.use('/api/health', healthRoutes);

// Rate limiter for intake preview (30 requests per minute per IP)
const intakeRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Intake inquiry limit reached. Please wait one minute before submitting another inquiry.',
});

app.use('/api/intake-preview', intakeRateLimiter, intakeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

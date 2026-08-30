import express, { Request, Response } from 'express';
import cors from 'cors';
import { issuesRouter } from './routes/issues';
import { authRouter } from './routes/auth';
import { analyticsRouter } from './routes/analytics';
import { rewardsRouter } from './routes/rewards';
import { voiceRouter } from './routes/voice';

export const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'CiviFix Rural Civic Infrastructure API',
    location: 'Kovilpatti Block, Thoothukudi District, Tamil Nadu',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/issues', issuesRouter);
app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/rewards', rewardsRouter);
app.use('/api/voice', voiceRouter);

// Fallback 404 handler for unknown API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API route ${req.originalUrl} not found`
  });
});

// Start listening if run directly in Node
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌾 CiviFix Backend Server running at http://localhost:${PORT}`);
    console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health`);
  });
}

export default app;

import { Router, Request, Response } from 'express';
import { db } from '../db/store';

export const analyticsRouter = Router();

// GET /api/analytics/overview - Overall district performance
analyticsRouter.get('/overview', (req: Request, res: Response) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    data: analytics
  });
});

// GET /api/analytics/leaderboard - Panchayat rankings
analyticsRouter.get('/leaderboard', (req: Request, res: Response) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    data: analytics.leaderboard
  });
});

// GET /api/analytics/departments - Line department metrics
analyticsRouter.get('/departments', (req: Request, res: Response) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    data: analytics.departmentMetrics
  });
});

// GET /api/analytics/anomalies - AI infrastructure anomaly alerts
analyticsRouter.get('/anomalies', (req: Request, res: Response) => {
  const analytics = db.getAnalytics();
  res.json({
    success: true,
    data: analytics.anomalies
  });
});

import { Router, Request, Response } from 'express';
import { db } from '../db/store';

export const rewardsRouter = Router();

// GET /api/rewards - Available rewards catalog
rewardsRouter.get('/', (req: Request, res: Response) => {
  const rewards = db.getRewards();
  res.json({
    success: true,
    count: rewards.length,
    data: rewards
  });
});

// POST /api/rewards/redeem - Redeem reward item
rewardsRouter.post('/redeem', (req: Request, res: Response) => {
  const { rewardId, role } = req.body;

  if (!rewardId) {
    return res.status(400).json({ success: false, error: 'Reward ID is required' });
  }

  const result = db.redeemReward(rewardId, role || 'citizen');

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.error
    });
  }

  const voucherCode = `TN-RURAL-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  res.json({
    success: true,
    message: `Successfully redeemed ${result.reward?.title}!`,
    voucherCode,
    reward: result.reward,
    updatedPoints: result.user?.civicPoints
  });
});

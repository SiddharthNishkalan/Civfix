import { Router, Request, Response } from 'express';
import { db } from '../db/store';

export const authRouter = Router();

// GET /api/auth/users - Get all persona profiles
authRouter.get('/users', (req: Request, res: Response) => {
  const users = db.getUsers();
  res.json({
    success: true,
    data: users
  });
});

// GET /api/auth/user/:role - Get specific user persona
authRouter.get('/user/:role', (req: Request, res: Response) => {
  const user = db.getUser(req.params.role);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User profile not found' });
  }

  res.json({
    success: true,
    data: user
  });
});

// POST /api/auth/login - Login via OTP or Password
authRouter.post('/login', (req: Request, res: Response) => {
  const { phone, otp, password, role } = req.body;

  // If role is explicitly provided (quick demo login)
  if (role) {
    const user = db.getUser(role);
    if (user) {
      return res.json({
        success: true,
        message: `Authenticated as ${user.name}`,
        token: `demo-jwt-token-${role}-${Date.now()}`,
        user
      });
    }
  }

  // Validate OTP (Demo OTP: 5842)
  if (otp) {
    if (otp === '5842' || otp.length === 4) {
      const user = db.getUser('citizen');
      return res.json({
        success: true,
        message: 'OTP verification successful',
        token: `demo-jwt-token-citizen-${Date.now()}`,
        user
      });
    } else {
      return res.status(401).json({ success: false, error: 'Invalid OTP. Please use demo code 5842.' });
    }
  }

  // Default fallback citizen login
  const defaultUser = db.getUser('citizen');
  res.json({
    success: true,
    message: 'Login successful',
    token: `demo-jwt-token-citizen-${Date.now()}`,
    user: defaultUser
  });
});

// POST /api/auth/register - Citizen onboarding
authRouter.post('/register', (req: Request, res: Response) => {
  const { name, phone, panchayat, ward, block, district, state } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone number are required' });
  }

  const newUser = db.registerUser({
    name,
    phone,
    panchayat,
    ward,
    block,
    district,
    state
  });

  res.status(201).json({
    success: true,
    message: 'Citizen registration completed successfully',
    token: `demo-jwt-token-${newUser.id}`,
    user: newUser
  });
});

import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    const user = await User.findById(req.userId);
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by referral code
router.get('/referral/:code', async (req, res) => {
  try {
    const user = await User.findOne({ referralCode: req.params.code })
      .select('name referralCode');
    
    if (!user) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user by referral code error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
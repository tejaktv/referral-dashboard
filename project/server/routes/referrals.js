import express from 'express';
import User from '../models/User.js';
import Referral from '../models/Referral.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's referral stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const referrals = await Referral.find({ referrer: req.userId });
    
    const stats = {
      totalCoins: user.coins,
      successfulReferrals: referrals.filter(r => r.status === 'successful').length,
      pendingReferrals: referrals.filter(r => r.status === 'pending').length,
      totalReferrals: referrals.length,
      referralCode: user.referralCode
    };

    res.json(stats);
  } catch (error) {
    console.error('Get referral stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get referral history
router.get('/history', auth, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.userId })
      .populate('referred', 'name email avatar')
      .sort({ createdAt: -1 });

    const history = referrals.map(referral => ({
      id: referral._id,
      name: referral.referred.name,
      avatar: referral.referred.avatar || referral.referred.name.substring(0, 2).toUpperCase(),
      date: referral.createdAt,
      status: referral.status,
      amount: referral.coinsEarned
    }));

    res.json(history);
  } catch (error) {
    console.error('Get referral history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name avatar coins successfulReferrals')
      .sort({ coins: -1 })
      .limit(10);

    const leaderboard = users.map((user, index) => ({
      id: user._id,
      name: user.name,
      avatar: user.avatar || user.name.substring(0, 2).toUpperCase(),
      coins: user.coins,
      referrals: user.successfulReferrals,
      rank: index + 1
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Process referral (when someone makes a purchase)
router.post('/process', auth, async (req, res) => {
  try {
    const { referredUserId, purchaseAmount } = req.body;
    
    // Find the referral record
    const referral = await Referral.findOne({
      referrer: req.userId,
      referred: referredUserId,
      status: 'pending'
    });

    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    // Update referral status
    referral.status = 'successful';
    referral.coinsEarned = 250; // Fixed amount per referral
    referral.purchaseAmount = purchaseAmount;
    referral.purchaseDate = new Date();
    await referral.save();

    // Update referrer's coins and stats
    const referrer = await User.findById(req.userId);
    referrer.coins += 250;
    referrer.successfulReferrals += 1;
    await referrer.save();

    res.json({ message: 'Referral processed successfully', coinsEarned: 250 });
  } catch (error) {
    console.error('Process referral error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
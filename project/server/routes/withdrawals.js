import express from 'express';
import Withdrawal from '../models/Withdrawal.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Request withdrawal
router.post('/request', auth, async (req, res) => {
  try {
    const { amount, upiId } = req.body;
    
    // Validate input
    if (!amount || !upiId) {
      return res.status(400).json({ message: 'Amount and UPI ID are required' });
    }
    
    if (amount < 1) {
      return res.status(400).json({ message: 'Minimum withdrawal amount is ₹1' });
    }
    
    // Check user's balance
    const user = await User.findById(req.userId);
    if (user.coins < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Check if user has at least 1 successful referral
    if (user.successfulReferrals < 1) {
      return res.status(400).json({ message: 'At least 1 successful referral required' });
    }
    
    // Create withdrawal request
    const withdrawal = new Withdrawal({
      user: req.userId,
      amount,
      upiId: upiId.trim()
    });
    
    await withdrawal.save();
    
    res.status(201).json({
      message: 'Withdrawal request submitted successfully',
      withdrawal: {
        id: withdrawal._id,
        amount: withdrawal.amount,
        status: withdrawal.status,
        createdAt: withdrawal.createdAt
      }
    });
  } catch (error) {
    console.error('Request withdrawal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's withdrawal history
router.get('/history', auth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(withdrawals);
  } catch (error) {
    console.error('Get withdrawal history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get withdrawal status
router.get('/:id', auth, async (req, res) => {
  try {
    const withdrawal = await Withdrawal.findOne({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }
    
    res.json(withdrawal);
  } catch (error) {
    console.error('Get withdrawal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
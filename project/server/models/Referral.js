import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referred: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  },
  coinsEarned: {
    type: Number,
    default: 0
  },
  purchaseAmount: {
    type: Number,
    default: 0
  },
  purchaseDate: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
referralSchema.index({ referrer: 1, status: 1 });
referralSchema.index({ referred: 1 });

export default mongoose.model('Referral', referralSchema);
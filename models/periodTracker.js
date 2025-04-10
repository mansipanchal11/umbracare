const mongoose = require('mongoose');

const periodTrackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  symptoms: [{
    type: String,
    enum: ['cramps', 'headache', 'bloating', 'fatigue', 'mood swings', 'other']
  }],
  flow: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    default: 'medium'
  },
  notes: {
    type: String
  },
  cycleLength: {
    type: Number,
    // required: true
  },
  cycleStart: {
    type: Date,
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PeriodTracker', periodTrackerSchema);

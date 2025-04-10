const mongoose = require('mongoose');

const FeedbackFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'pregnancy', 'postpartum', 'menopause', 'period']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('feedbackform', FeedbackFormSchema);

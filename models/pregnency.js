const mongoose = require('mongoose');

const PregnancySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  week: {
    type: Number,
    required: true,
    min: 1,
    max: 40
  },
  age: {
    type: Number,
    required: true
  },
  systolicBP: {
    type: Number,
    required: true
  },
  diastolicBP: {
    type: Number,
    required: true
  },
  bloodSugar: {
    type: Number,
    required: true
  },
  bodyTemp: {
    type: Number,
    required: true
  },
  heartRate: {
    type: Number,
    required: true
  },
  insights: {
    type: String,
    default: ''
  },
  riskFactor: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
module.exports = mongoose.model('Pregnancy', PregnancySchema);

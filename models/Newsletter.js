// models/Newsletter.js
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
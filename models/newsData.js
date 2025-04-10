// models/newsData.js
const mongoose = require('mongoose');

const newsDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  
  },
  name: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model('NewsData', newsDataSchema);
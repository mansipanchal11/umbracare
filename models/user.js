// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  medicalHistory: {
    type: String,
    default: "",
  },
  menstrualHistory: {
    type: String,
    default: "",
  },
  useFor: {
    type: String,
    enum: ["pregnancy", "period"],
    default: "period",
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);

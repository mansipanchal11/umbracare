// routes/newsData.js
const express = require('express');
const router = express.Router();
const NewsData = require('../models/newsData');
const auth = require('../middleware/auth');
const user = require('../models/user');
const nodemailer = require('nodemailer');


router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Email  required' });
  }

  try {
     
    let subscriber = await NewsData.findOne({ email });
    
    if (subscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    subscriber = new NewsData({
      email
    });

    await subscriber.save();

    // Update user's isSubscribed status to true
    await user.findOneAndUpdate(
      { email },
      { isSubscribed: true },
      { new: true }
    );
    
    const nodemailer = require('nodemailer');
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'riyanshigupta2004@gmail.com',
        pass: 'scru hzfa qgmd eqbz'
      }
    });

    // Email options
    const mailOptions = {
      from: 'riyanshigupta2004@gmail.com',
      to: email,
      subject: 'Newsletter Subscription Confirmation',
      html: `
        <h2>Thank you for subscribing to our newsletter!</h2>
        <p>You will now receive our latest updates and news.</p>
        <p>If you did not request this subscription, please ignore this email.</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Successfully subscribed to newsletter', subscriber });
  } catch (err) {
    console.error('Error subscribing to newsletter:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subscribers
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await NewsData.find();
    res.json(subscribers);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsubscribe from newsletter
router.delete('/unsubscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscriber = await NewsData.findOneAndDelete({ email });
    
    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in subscribers list' });
    }

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (err) {
    console.error('Error unsubscribing from newsletter:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

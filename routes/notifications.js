// routes/notifications.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Add a new notification
router.post('/', auth, async (req, res) => {
  const { type, message } = req.body;
  try {
    const notification = new Notification({
      userId: req.user.id,
      type,
      message,
    });
    await notification.save();
    
    // Get user email from the user object
    // const User = require('../models/User');
    const user = await User.findById(req.user.id);
    
    // Send email notification
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'riyanshigupta2004@gmail.com',
        pass: 'scru hzfa qgmd eqbz'
      }
    });
    
    const mailOptions = {
      from: "riyanshigupta2004@gmail.com",
      to: user.email,
      subject: `New Notification: ${type}`,
      text: message
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json(notification);
  } catch (err) {
    console.error('Error saving notification or sending email:', err);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      userId: req.user.id,
      isRead: false 
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).send('Server error');
  }
});

// Mark a notification as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).send('Server error');
  }
});




module.exports = router;
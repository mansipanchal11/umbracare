const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user');

// Register user

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log('User registered:', user);

    const payload = { user: { id: user.id } };
jwt.sign(payload, 'your_jwt_secret', { expiresIn: '100d' }, (err, token) => {
  if (err) throw err;
  res.json({ token });
});
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '100d' }, (err, token) => {
      if (err) throw err;
      // Send full user details along with the token
      const userResponse = {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          medicalHistory: user.medicalHistory,
          menstrualHistory: user.menstrualHistory,
          createdAt: user.createdAt,
          isSubscribed: user.isSubscribed,
        }
      };
      res.json(userResponse);
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

// Get user profile
router.get('/me', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      console.log('Profile fetched:', user);
      res.json(user);
    } catch (err) {
      console.error('Error fetching profile:', err);
      res.status(500).send('Server error');
    }
  });

// Update user profile
router.put('/me', auth, async (req, res) => {
  const { name, email, medicalHistory, menstrualHistory } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (medicalHistory !== undefined) user.medicalHistory = medicalHistory;
    if (menstrualHistory !== undefined) user.menstrualHistory = menstrualHistory;

    await user.save();
    console.log('Profile updated:', user);
    res.json(user);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).send('Server error');
  }
});

router.put('/useFor', auth, async (req, res) => {
  const { useFor } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.useFor = useFor;
    await user.save();
    console.log('Use for updated:', user);
    res.json(user);
  } catch (err) {
    console.error('Error updating use for:', err);
    res.status(500).send('Server error');
  }
});

router.get('/useFor', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user.useFor);
});


module.exports = router;
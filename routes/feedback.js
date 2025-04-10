const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FeedbackForm = require('../models/feebackform');

router.post('/', auth, async (req, res) => {
  try {
    const { rating, comments, category } = req.body;

    const newFeedback = new FeedbackForm({
      user: req.user.id,
      rating,
      comments,
      category
    });

    const feedback = await newFeedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const feedbacks = await FeedbackForm.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const feedback = await FeedbackForm.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    // Check user
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const feedback = await FeedbackForm.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    // Check user
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await feedback.remove();
    res.json({ msg: 'Feedback removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comments, category } = req.body;

    let feedback = await FeedbackForm.findById(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback not found' });
    }

    // Check user
    if (feedback.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    feedback = await FeedbackForm.findByIdAndUpdate(
      req.params.id,
      { 
        rating,
        comments,
        category,
        date: Date.now()
      },
      { new: true }
    );

    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feedback not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PeriodTracker = require('../models/periodTracker');

router.post('/', auth, async (req, res) => {
  try {
    const { startDate, endDate  } = req.body;

    const newPeriodEntry = new PeriodTracker({
      user: req.user.id,
      startDate,
      endDate,
    //   symptoms,
    //   flow,
    //   notes
    });

    const periodEntry = await newPeriodEntry.save();
    res.json(periodEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 
router.get('/', auth, async (req, res) => {
  try {
    const periodEntries = await PeriodTracker.find({ user: req.user.id }).sort({ startDate: -1 });
    res.json(periodEntries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 
router.get('/:id', auth, async (req, res) => {
  try {
    const periodEntry = await PeriodTracker.findById(req.params.id);

    if (!periodEntry) {
      return res.status(404).json({ msg: 'Period entry not found' });
    }

    // Make sure user owns the period entry
    if (periodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(periodEntry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Period entry not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Build period entry object
    const periodEntryFields = {};
    if (startDate) periodEntryFields.startDate = startDate;
    if (endDate) periodEntryFields.endDate = endDate;
    // if (symptoms) periodEntryFields.symptoms = symptoms;
    // if (flow) periodEntryFields.flow = flow;
    // if (notes) periodEntryFields.notes = notes;
    periodEntryFields.updatedAt = Date.now();

    let periodEntry = await PeriodTracker.findById(req.params.id);

    if (!periodEntry) {
      return res.status(404).json({ msg: 'Period entry not found' });
    }

    // Make sure user owns the period entry
    if (periodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    periodEntry = await PeriodTracker.findByIdAndUpdate(
      req.params.id,
      { $set: periodEntryFields },
      { new: true }
    );

    res.json(periodEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const periodEntry = await PeriodTracker.findById(req.params.id);

    if (!periodEntry) {
      return res.status(404).json({ msg: 'Period entry not found' });
    }

    // Make sure user owns the period entry
    if (periodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await PeriodTracker.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Period entry removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Period entry not found' });
    }
    res.status(500).send('Server Error');
  }
});

// GET route for period prediction
router.get('/prediction/:id', auth, async (req, res) => {
  try {
    // Get all period entries for the user, sorted by startDate
    const periodEntries = await PeriodTracker.find({ user: req.user.id })
      .sort({ startDate: 1 });

    if (periodEntries.length < 2) {
      return res.status(400).json({ 
        msg: 'Not enough period data to make predictions. Need at least 2 entries.' 
      });
    }

    // Calculate cycle lengths (from end of one period to start of next)
    const cycleLengths = [];
    for (let i = 0; i < periodEntries.length - 1; i++) {
      if (periodEntries[i].endDate) {
        const currentEnd = new Date(periodEntries[i].endDate);
        const nextStart = new Date(periodEntries[i+1].startDate);
        const cycleDays = Math.round((nextStart - currentEnd) / (1000 * 60 * 60 * 24));
        cycleLengths.push(cycleDays);
      }
    }

    // If no complete cycles with end dates, fall back to start-to-start calculation
    if (cycleLengths.length === 0) {
      for (let i = 1; i < periodEntries.length; i++) {
        const currentStart = new Date(periodEntries[i].startDate);
        const previousStart = new Date(periodEntries[i-1].startDate);
        const cycleDays = Math.round((currentStart - previousStart) / (1000 * 60 * 60 * 24));
        cycleLengths.push(cycleDays);
      }
    }

    // Calculate statistics
    const shortestCycle = Math.min(...cycleLengths);
    const longestCycle = Math.max(...cycleLengths);
    const averageCycle = Math.round(cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length);

    // Get the most recent period
    const lastPeriod = periodEntries[periodEntries.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate);
    const lastEndDate = lastPeriod.endDate ? new Date(lastPeriod.endDate) : null;

    // Calculate average period duration
    const periodDurations = [];
    for (const entry of periodEntries) {
      if (entry.endDate) {
        const start = new Date(entry.startDate);
        const end = new Date(entry.endDate);
        const duration = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;  
        periodDurations.push(duration);
      }
    }

    let averageDuration = 5;  
    if (periodDurations.length > 0) {
      averageDuration = Math.round(periodDurations.reduce((sum, duration) => sum + duration, 0) / periodDurations.length);
    }

   
    const nextPeriodStart = new Date(lastEndDate || lastStartDate);
    if (lastEndDate) {
      nextPeriodStart.setDate(lastEndDate.getDate() + averageCycle);
    } else {
      nextPeriodStart.setDate(lastStartDate.getDate() + averageCycle);
    }

    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodStart.getDate() + averageDuration - 1);

    // Predict fertile window (typically 5 days before ovulation, day of ovulation, and 1 day after)
    const ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);

    const fertileWindowStart = new Date(ovulationDay);
    fertileWindowStart.setDate(ovulationDay.getDate() - 5);

    const fertileWindowEnd = new Date(ovulationDay);
    fertileWindowEnd.setDate(ovulationDay.getDate() + 1);

    const timeUntilNextPeriod = nextPeriodStart.getTime() - new Date().getTime();
    const daysUntilNextPeriod = Math.ceil(timeUntilNextPeriod / (1000 * 60 * 60 * 24));

    const currentDay = new Date();
    const currentDayOfCycle = Math.ceil((currentDay - lastStartDate) / (1000 * 60 * 60 * 24));

    res.json({
      cycleLengths,
      statistics: {
        shortestCycle,
        longestCycle,
        averageCycle,
        averageDuration
      },
      prediction: {
        nextPeriodStart: nextPeriodStart.toISOString().split('T')[0],
        nextPeriodEnd: nextPeriodEnd.toISOString().split('T')[0],
        fertileWindowStart: fertileWindowStart.toISOString().split('T')[0],
        fertileWindowEnd: fertileWindowEnd.toISOString().split('T')[0],
        ovulationDay: ovulationDay.toISOString().split('T')[0],
        daysUntilNextPeriod,
        currentDayOfCycle
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET route for period prediction - move this above the /:id routes


module.exports = router;

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());  
app.use(cors({origin: "*"}));

// Middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://riyanshigupta2004:Qf7ZzNW6OeXjyYGD@cluster0.sx8m8.mongodb.net/')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
// Routes
app.use('/api/users', require('./routes/users'));  
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/newsData', require('./routes/newsData'));
app.use('/api/period-tracker', require('./routes/PeriodTrackerRoutes'));
app.use('/api/pregnancy', require('./routes/pregnencyRoute'));
app.use('/api/feedback', require('./routes/feedback'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
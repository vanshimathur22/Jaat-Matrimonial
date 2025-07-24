require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const profileRoutes = require('./routes/profiles');
app.use('/api/profiles', profileRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log(`✅ MongoDB connected`);
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
// comment
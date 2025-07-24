const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  gender: String,
  education: String,
  hometown: String,
  address: String,
  income: Number,
  assets: String,
  preferences: String,
  height: String,
});

module.exports = mongoose.model('Profile', profileSchema);

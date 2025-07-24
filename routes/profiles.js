const express = require('express');
const router = express.Router();
const Profile = require('../models/profile'); // Ensure capital P in file name!

// GET all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profiles', error: err });
  }
});

// POST new profile
router.post('/', async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      education,
      hometown,
      address,
      income,
      assets,
      preferences,
      height
    } = req.body;

    // Validate required fields
    if (!name || !gender) {
      return res.status(400).json({ message: 'Name and gender are required.' });
    }

    const newProfile = new Profile({
      name,
      dob,
      gender,
      education,
      hometown,
      address,
      income,
      assets,
      preferences,
      height
    });

    const savedProfile = await newProfile.save();
    res.json({ message: 'Profile created successfully', profile: savedProfile });
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err });
  }
});

// DELETE a profile by ID
router.delete('/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    await Profile.findByIdAndDelete(profileId);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err });
  }
});

module.exports = router;

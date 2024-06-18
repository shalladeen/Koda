const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await authService.register(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get current user info
router.get('/me', protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', protect, upload.single('profilePicture'), async (req, res) => {
  const { username, bio } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    const updatedProfile = await authService.updateUserProfile(req.user._id, { username, bio, profilePicture });
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error('Error updating user profile:', err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

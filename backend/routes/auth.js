const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

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
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await authService.login(usernameOrEmail, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

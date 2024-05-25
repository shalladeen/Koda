// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})

// Login user
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [
        { email: usernameOrEmail },
        { username: usernameOrEmail }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { username: user.username, email: user.email } });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

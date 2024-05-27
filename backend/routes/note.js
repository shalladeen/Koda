const express = require('express');
const router = express.Router();
const noteService = require('../services/noteService');
const { protect } = require('../middlewares/authMiddleware');

// Create a new note
router.post('/', protect, async (req, res) => {
  const { title, content, tag } = req.body;
  const userId = req.user ? req.user._id : null;
  console.log('Create Note Request Body:', req.body); // Log the request body
  console.log('User ID:', userId); // Log the user ID

  if (!userId) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const note = await noteService.createNote(userId, title, content, tag);
    res.status(201).json(note);
  } catch (err) {
    console.error('Error creating note:', err); // Log the error
    res.status(400).json({ message: err.message });
  }
});

// Get all notes for the authenticated user
router.get('/', protect, async (req, res) => {
  const userId = req.user ? req.user._id : null;
  console.log('User ID:', userId); // Log the user ID

  if (!userId) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const notes = await noteService.getNotes(userId);
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err); // Log the error
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

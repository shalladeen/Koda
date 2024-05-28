const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');
const { protect } = require('../middlewares/authMiddleware');

// Create Event
router.post('/', protect, async (req, res) => {
  try {
    const event = await eventService.createEvent({ ...req.body, userId: req.user._id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Events
router.get('/', protect, async (req, res) => {
  try {
    const events = await eventService.getEvents(req.user._id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Event
router.put('/:id', protect, async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Event
router.delete('/:id', protect, async (req, res) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(204).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const listService = require('../services/listService');
const { protect } = require('../middlewares/authMiddleware');

// Create a new list
router.post('/', protect, async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const list = await listService.createList(userId, name);
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all lists for the authenticated user
router.get('/', protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const lists = await listService.getLists(userId);
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a list
router.put('/:id', protect, async (req, res) => {
  const { name } = req.body;
  const listId = req.params.id;

  try {
    const updatedList = await listService.updateList(listId, name);
    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a list
router.delete('/:id', protect, async (req, res) => {
  const listId = req.params.id;

  try {
    const deletedList = await listService.deleteList(listId);
    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

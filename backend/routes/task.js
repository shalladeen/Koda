const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const { protect } = require('../middlewares/authMiddleware');

// Create a new task
router.post('/', protect, async (req, res) => {
  const { name, desc, completed, list } = req.body;
  const userId = req.user._id;

  try {
    const task = await taskService.createTask(userId, name, desc, completed, list);
    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err.message); // Detailed error message
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks for the authenticated user
router.get('/', protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await taskService.getTasks(userId);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message); // Detailed error message
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', protect, async (req, res) => {
  const { name, desc, completed, list } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTask = await taskService.updateTask(taskId, name, desc, completed, list);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err.message); // Detailed error message
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', protect, async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await taskService.deleteTask(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err.message); // Detailed error message
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

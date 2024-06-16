const mongoose = require('mongoose');
const Task = require('../models/Task');

const createTask = async (userId, name, desc, completed, listId) => {
  console.log('Creating task with data:', { userId, name, desc, completed, listId });

  if (listId && !mongoose.Types.ObjectId.isValid(listId)) {
    throw new Error('Invalid list ID format');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  const taskData = { name, desc, completed, user: userId };
  if (listId) {
    taskData.list = listId;
  }

  try {
    const task = new Task(taskData);
    await task.save();
    return task.populate('list', 'name'); // Populate list name if it exists
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Task validation failed');
  }
};

const getTasks = async (userId) => {
  console.log('Fetching tasks for user:', userId);
  try {
    const tasks = await Task.find({ user: userId }).populate('list', 'name'); // Populate list name
    console.log('Fetched tasks:', tasks); // Log fetched tasks
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

const updateTask = async (taskId, name, desc, completed, listId) => {
  console.log('Updating task with ID:', taskId, { name, desc, completed, listId });

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error('Invalid task ID format');
  }

  if (listId && !mongoose.Types.ObjectId.isValid(listId)) {
    throw new Error('Invalid list ID format');
  }

  try {
    const task = await Task.findById(taskId);
    if (task) {
      task.name = name;
      task.desc = desc;
      task.completed = completed;
      task.list = listId || null; // Set list to null if no listId provided
      task.updatedAt = Date.now();
      await task.save();
      return task.populate('list', 'name'); // Populate list name
    }
    throw new Error('Task not found');
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Task validation failed');
  }
};

const deleteTask = async (taskId) => {
  console.log('Deleting task with ID:', taskId);
  try {
    const task = await Task.findByIdAndDelete(taskId);
    console.log('Task deleted:', task); // Log deleted task
    return task;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Error deleting task');
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

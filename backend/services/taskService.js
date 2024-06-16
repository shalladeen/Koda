const mongoose = require('mongoose');
const Task = require('../models/Task');

const createTask = async (userId, name, desc, completed, listId) => {
  console.log('Creating task with data:', { userId, name, desc, completed, listId });

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    throw new Error('Invalid list ID format');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  const task = new Task({ name, desc, completed, list: listId, user: userId });
  try {
    await task.save();
    console.log('Task created successfully:', task); // Log the created task
    return task.populate('list', 'name'); // Populate list name
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    throw error;
  }
};

const getTasks = async (userId) => {
  console.log('Fetching tasks for user:', userId);
  try {
    const tasks = await Task.find({ user: userId }).populate('list', 'name'); // Populate list name
    console.log('Fetched tasks:', tasks); // Log fetched tasks
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error); // Log the error
    throw error;
  }
};

const updateTask = async (taskId, name, desc, completed, listId) => {
  console.log('Updating task with ID:', taskId, { name, desc, completed, listId });

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error('Invalid task ID format');
  }

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    throw new Error('Invalid list ID format');
  }

  const task = await Task.findById(taskId);
  if (task) {
    task.name = name;
    task.desc = desc;
    task.completed = completed;
    task.list = listId;
    task.updatedAt = Date.now();
    try {
      await task.save();
      console.log('Task updated successfully:', task); // Log updated task
      return task.populate('list', 'name'); // Populate list name
    } catch (error) {
      console.error('Error updating task:', error); // Log the error
      throw error;
    }
  }
  return null;
};

const deleteTask = async (taskId) => {
  console.log('Deleting task with ID:', taskId);
  try {
    const task = await Task.findByIdAndDelete(taskId);
    console.log('Task deleted successfully:', task); // Log deleted task
    return task;
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error
    throw error;
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

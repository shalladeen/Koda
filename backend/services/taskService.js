const mongoose = require('mongoose');
const Task = require('../models/Task');
const List = require('../models/List');

const createTask = async (userId, name, desc, completed, listId) => {
  console.log('Creating task with data:', { userId, name, desc, completed, listId });

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    throw new Error('Invalid list ID format');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID format');
  }

  const task = new Task({ name, desc, completed, list: listId, user: userId });
  await task.save();
  return task.populate('list', 'name user'); // Populate list name and user
};

const getTasks = async (userId) => {
  console.log('Fetching tasks for user:', userId);
  return await Task.find({ user: userId }).populate('list', 'name user'); // Populate list name and user
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
    await task.save();
  }
  return task.populate('list', 'name user'); // Populate list name and user
};

const deleteTask = async (taskId) => {
  console.log('Deleting task with ID:', taskId);
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

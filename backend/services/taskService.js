const Task = require('../models/Task');

const createTask = async (userId, name, desc, completed, list) => {
  const task = new Task({
    name,
    desc,
    completed,
    list,
    user: userId
  });
  await task.save();
  return task;
};

const getTasks = async (userId) => {
  return await Task.find({ user: userId });
};

const updateTask = async (taskId, name, desc, completed, list) => {
  const task = await Task.findById(taskId);
  if (task) {
    task.name = name;
    task.desc = desc;
    task.completed = completed;
    task.list = list;
    task.updatedAt = Date.now();
    await task.save();
  }
  return task;
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};

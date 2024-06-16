const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  list: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

TaskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

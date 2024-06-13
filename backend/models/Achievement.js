const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  threshold: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Achievement = mongoose.model('Achievement', AchievementSchema);
module.exports = Achievement;

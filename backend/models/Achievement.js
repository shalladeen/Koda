const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // URL or icon name
    required: true,
  },
  threshold: {
    type: Number, // e.g., hours needed to complete this achievement
    required: true,
  },
  type: {
    type: String, // e.g., 'focus', 'streak'
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Achievement = mongoose.model('Achievement', AchievementSchema);
module.exports = Achievement;

const mongoose = require('mongoose');

const FocusSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true // Duration in seconds
  }
});

const FocusSession = mongoose.model('FocusSession', FocusSessionSchema);

module.exports = FocusSession;

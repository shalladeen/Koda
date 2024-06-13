const FocusSession = require('../models/Focus.js');

const createFocusSession = async (userId, startTime, endTime, duration) => {
  const session = new FocusSession({
    user: userId,
    startTime,
    endTime,
    duration
  });
  await session.save();
  return session;
};

const getFocusSessions = async (userId) => {
  return await FocusSession.find({ user: userId });
};

module.exports = {
  createFocusSession,
  getFocusSessions
};

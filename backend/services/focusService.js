const FocusSession = require('../models/Focus');
const { updateAchievements } = require('./achievementService');

const createFocusSession = async (userId, startTime, endTime, duration) => {
  const session = new FocusSession({
    user: userId,
    startTime,
    endTime,
    duration
  });
  await session.save();

  // Update achievements after saving the focus session
  await updateAchievements(userId, duration);

  return session;
};

const getFocusSessions = async (userId) => {
  return await FocusSession.find({ user: userId });
};

module.exports = {
  createFocusSession,
  getFocusSessions
};

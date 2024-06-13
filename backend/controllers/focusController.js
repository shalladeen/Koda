const focusService = require('../services/focusService');
const achievementService = require('../services/achievementService');

const createFocusSession = async (req, res) => {
  const { startTime, endTime, duration } = req.body;
  const userId = req.user._id;

  try {
    const session = await focusService.createFocusSession(userId, startTime, endTime, duration);
    
    // Update achievements and send notifications
    await achievementService.updateAchievements(userId);

    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFocusSessions = async (req, res) => {
  const userId = req.user._id;

  try {
    const sessions = await focusService.getFocusSessions(userId);
    res.status(200).json(sessions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createFocusSession,
  getFocusSessions
};

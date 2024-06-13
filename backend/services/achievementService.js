const Achievement = require('../models/Achievement');
const FocusSession = require('../models/Focus');
const { sendNotification } = require('./notificationService');

const updateAchievements = async (userId) => {
  // Calculate total focus time and session count
  const sessions = await FocusSession.find({ user: userId });
  const totalFocusTime = sessions.reduce((total, session) => total + session.duration, 0);
  const sessionCount = sessions.length;

  // Define session-based achievements
  const sessionAchievements = [
    { threshold: 1, title: 'First Session', description: 'Completed your first focus session', icon: 'FaPlay' },
    { threshold: 10, title: '10 Sessions', description: 'Completed 10 focus sessions', icon: 'FaPlay' },
    { threshold: 50, title: '50 Sessions', description: 'Completed 50 focus sessions', icon: 'FaPlay' }
  ];

  // Define focus-based achievements
  const focusAchievements = [
    { threshold: 600, title: '10 Hours Focused', description: 'Focused for 10 hours in total', icon: 'FaClock' }, // 10 hours = 600 minutes
    { threshold: 1500, title: '25 Hours Focused', description: 'Focused for 25 hours in total', icon: 'FaClock' }, // 25 hours = 1500 minutes
    { threshold: 3000, title: '50 Hours Focused', description: 'Focused for 50 hours in total', icon: 'FaClock' } // 50 hours = 3000 minutes
  ];

  // Check and update session-based achievements
  for (const achievement of sessionAchievements) {
    if (sessionCount >= achievement.threshold) {
      const existingAchievement = await Achievement.findOne({ user: userId, title: achievement.title });
      if (!existingAchievement || !existingAchievement.completed) {
        await Achievement.findOneAndUpdate(
          { user: userId, title: achievement.title },
          { $set: { completed: true, description: achievement.description, icon: achievement.icon } },
          { upsert: true }
        );
        // Send notification
        sendNotification(userId, `Congratulations! You have completed the achievement: ${achievement.title}`);
      }
    }
  }

  // Check and update focus-based achievements
  for (const achievement of focusAchievements) {
    if (totalFocusTime >= achievement.threshold) {
      const existingAchievement = await Achievement.findOne({ user: userId, title: achievement.title });
      if (!existingAchievement || !existingAchievement.completed) {
        await Achievement.findOneAndUpdate(
          { user: userId, title: achievement.title },
          { $set: { completed: true, description: achievement.description, icon: achievement.icon } },
          { upsert: true }
        );
        // Send notification
        sendNotification(userId, `Congratulations! You have completed the achievement: ${achievement.title}`);
      }
    }
  }
};

module.exports = {
  updateAchievements
};

const Achievement = require('../models/Achievement');

const defaultAchievements = [
  { title: 'First Focus', description: 'Complete your first focus session', icon: 'FaCheckCircle', type: 'session', threshold: 1, completed: false },
  { title: '10 Minutes Focus', description: 'Focus for 10 minutes', icon: 'FaClock', type: 'focus', threshold: 10, completed: false },
  { title: '30 Minutes Focus', description: 'Focus for 30 minutes', icon: 'FaClock', type: 'focus', threshold: 30, completed: false },
  { title: '1 Hour Focus', description: 'Focus for 1 hour', icon: 'FaClock', type: 'focus', threshold: 60, completed: false },
  { title: 'Daily Focus', description: 'Complete a focus session every day', icon: 'FaCalendarCheck', type: 'streak', threshold: 1, completed: false },
  { title: 'Weekly Focus', description: 'Complete a focus session for 7 days straight', icon: 'FaCalendarCheck', type: 'streak', threshold: 7, completed: false },
  { title: 'Monthly Focus', description: 'Complete a focus session for 30 days straight', icon: 'FaCalendarCheck', type: 'streak', threshold: 30, completed: false },
  { title: 'Consistency King', description: 'Focus for 100 hours', icon: 'FaClock', type: 'focus', threshold: 6000, completed: false }, // 100 hours = 6000 minutes
  { title: 'Marathon Focus', description: 'Focus for 500 hours', icon: 'FaClock', type: 'focus', threshold: 30000, completed: false }, // 500 hours = 30000 minutes
  { title: 'Annual Focus', description: 'Focus for 365 days straight', icon: 'FaCalendar', type: 'streak', threshold: 365, completed: false },
];

const initializeAchievements = async () => {
  try {
    for (const achievement of defaultAchievements) {
      const existingAchievement = await Achievement.findOne({ title: achievement.title });
      if (!existingAchievement) {
        await Achievement.create(achievement);
      }
    }
    console.log('Default achievements initialized');
  } catch (error) {
    console.error('Error initializing achievements:', error);
  }
};

module.exports = initializeAchievements;

const Achievement = require('../models/Achievement');
const User = require('../models/User');

const createAchievement = async (achievementData) => {
  const achievement = new Achievement(achievementData);
  await achievement.save();
  return achievement;
};

const getAchievements = async () => {
  return await Achievement.find();
};

const completeAchievement = async (userId, achievementId) => {
  const user = await User.findById(userId);
  if (!user.completedAchievements.includes(achievementId)) {
    user.completedAchievements.push(achievementId);
    await user.save();
  }
  return user.completedAchievements;
};

module.exports = {
  createAchievement,
  getAchievements,
  completeAchievement,
};

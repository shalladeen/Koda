const Achievement = require('../models/Achievement');
const User = require('../models/User');

// Get all achievements
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new achievement
const createAchievement = async (req, res) => {
  const { title, description, icon, threshold, type } = req.body;

  try {
    const achievement = new Achievement({ title, description, icon, threshold, type });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark achievement as completed for a user
const completeAchievement = async (req, res) => {
  const { achievementId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user.completedAchievements.includes(achievementId)) {
      user.completedAchievements.push(achievementId);
      await user.save();
    }
    res.status(200).json(user.completedAchievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get completed achievements for the logged-in user
const getCompletedAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('completedAchievements');
    res.status(200).json(user.completedAchievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAchievementStatus = async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAchievements,
  createAchievement,
  completeAchievement,
  getCompletedAchievements,
  updateAchievementStatus,
};

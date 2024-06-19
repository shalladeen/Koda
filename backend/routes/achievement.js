const express = require('express');
const router = express.Router();
const { getAchievements, createAchievement, completeAchievement, updateAchievementStatus, getCompletedAchievements } = require('../controllers/achievementController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAchievements);
router.post('/', protect, createAchievement);
router.post('/complete', protect, completeAchievement);
router.put('/:id', protect, updateAchievementStatus);
router.get('/completed', protect, getCompletedAchievements);

module.exports = router;

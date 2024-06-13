const express = require('express');
const router = express.Router();
const { getAchievements, createAchievement, completeAchievement, updateAchievementStatus } = require('../controllers/achievementController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAchievements);
router.post('/', protect, createAchievement);
router.post('/complete', protect, completeAchievement);
router.put('/:id', protect, updateAchievementStatus);

module.exports = router;

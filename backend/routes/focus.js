const express = require('express');
const router = express.Router();
const focusController = require('../controllers/focusController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, focusController.createFocusSession);
router.get('/', protect, focusController.getFocusSessions);

module.exports = router;

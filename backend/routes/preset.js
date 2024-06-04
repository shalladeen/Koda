const express = require('express');
const { createPreset, getPresets } = require('../controllers/presetController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createPreset)
    .get(protect, getPresets);

module.exports = router;

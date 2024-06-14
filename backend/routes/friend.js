const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/send-request', friendController.sendFriendRequest);
router.put('/accept-request/:requestId', friendController.acceptFriendRequest);
router.put('/reject-request/:requestId', friendController.rejectFriendRequest);
router.get('/list/:userId', friendController.getFriends);

module.exports = router;

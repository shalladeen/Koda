const Friend = require('../models/Friend');
const User = require('../models/User');

const sendFriendRequest = async (req, res) => {
  const { requesterId, recipientId } = req.body;

  try {
    // Check if requester and recipient exist
    const requester = await User.findById(requesterId);
    const recipient = await User.findById(recipientId);

    if (!requester) {
      return res.status(404).json({ message: 'Requester not found.' });
    }

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found.' });
    }

    const existingFriendRequest = await Friend.findOne({ requester: requesterId, recipient: recipientId });

    if (existingFriendRequest) {
      return res.status(400).json({ message: 'Friend request already sent.' });
    }

    const friendRequest = new Friend({
      requester: requesterId,
      recipient: recipientId
    });

    await friendRequest.save();
    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.status(200).json(friendRequest);
  } catch (error) {
    res.status  .json({ message: error.message });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.status(200).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const friends = await Friend.find({
      $or: [
        { requester: userId, status: 'accepted' },
        { recipient: userId, status: 'accepted' }
      ]
    }).populate('requester recipient');

    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends
};

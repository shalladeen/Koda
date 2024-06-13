const Notification = require('../models/Notification'); // Assuming you have a Notification model

const sendNotification = async (userId, message) => {
  // Logic to send notification to the user
  try {
    const notification = new Notification({
      user: userId,
      message,
      date: new Date(),
      read: false
    });
    await notification.save();
    console.log(`Notification sent to user ${userId}: ${message}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = {
  sendNotification
};

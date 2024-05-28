const Event = require('../models/Event');

const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

const getEvents = async (userId) => {
  return await Event.find({ userId });
};

const updateEvent = async (eventId, eventData) => {
  return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
};

const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};

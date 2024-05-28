import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/events';

axios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched events:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    console.log('Created event:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  if (!eventId) {
    throw new Error('Event ID is required for updating an event');
  }
  try {
    console.log('Updating event with ID:', eventId);
    const response = await axios.put(`${API_URL}/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  if (!eventId) {
    throw new Error('Event ID is required for deleting an event');
  }
  try {
    console.log('Deleting event with ID:', eventId);
    const response = await axios.delete(`${API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

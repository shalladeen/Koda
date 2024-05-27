import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/notes';

// Log request configuration
axios.interceptors.request.use(config => {
  console.log('Request config:', config);
  return config;
}, error => {
  return Promise.reject(error);
});

export const createNote = async (title, content, tag) => {
  const token = getToken();
  console.log('Retrieved Token for createNote:', token); // Log the token
  console.log('Request Payload:', { title, content, tag }); // Log the request payload
  if (!token) throw new Error("No token found");
  try {
    const response = await axios.post(API_URL, { title, content, tag }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Create Note Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error.response ? error.response.data : error.message); // Log the error
    throw error;
  }
};

export const getNotes = async () => {
  const token = getToken();
  console.log('Retrieved Token for getNotes:', token); // Log the token
  if (!token) throw new Error("No token found");
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Get Notes Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error getting notes:', error.response ? error.response.data : error.message); // Log the error
    throw error;
  }
};

export const updateNote = async (id, title, content, tag) => {
  const token = getToken();
  console.log('Retrieved Token for updateNote:', token); // Log the token
  if (!token) throw new Error("No token found");
  try {
    const response = await axios.put(`${API_URL}/${id}`, { title, content, tag }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Update Note Response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error.response ? error.response.data : error.message); // Log the error
    throw error;
  }
};

export const deleteNote = async (id) => {
  const token = getToken();
  console.log('Retrieved Token for deleteNote:', token); // Log the token
  if (!token) throw new Error("No token found");
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Delete Note Response: Success'); // Log the response
  } catch (error) {
    console.error('Error deleting note:', error.response ? error.response.data : error.message); // Log the error
    throw error;
  }
};

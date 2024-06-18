import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/users';

axios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const updateProfile = async (formData) => {
  const response = await axios.put(`${API_URL}/me`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

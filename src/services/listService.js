import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/lists';

axios.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const createList = async (name) => {
  const response = await axios.post(API_URL, { name });
  return response.data;
};

export const getLists = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateList = async (id, name) => {
  const response = await axios.put(`${API_URL}/${id}`, { name });
  return response.data;
};

export const deleteList = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

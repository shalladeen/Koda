import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/tasks';

axios.interceptors.request.use(config => {
  console.log('Request config:', config);
  return config;
}, error => {
  return Promise.reject(error);
});

export const createTask = async (name, desc, completed, list) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const response = await axios.post(API_URL, { name, desc, completed, list }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getTasks = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateTask = async (id, name, desc, completed, list) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const response = await axios.put(`${API_URL}/${id}`, { name, desc, completed, list }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

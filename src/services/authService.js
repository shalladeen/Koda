import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = async (username, email, password) => {
  const response = await API.post('/auth/register', { username, email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

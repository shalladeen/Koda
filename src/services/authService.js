import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const login = async (usernameOrEmail, password) => {
  const response = await axios.post(`${API_URL}/login`, { usernameOrEmail, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

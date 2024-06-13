import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/focus';

export const createFocusSession = async (startTime, endTime, duration) => {
  const response = await axios.post(API_URL, { startTime, endTime, duration }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const getFocusSessions = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

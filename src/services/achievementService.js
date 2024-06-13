import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/achievements';

export const getAchievements = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const completeAchievement = async (achievementId) => {
  const response = await axios.post(`${API_URL}/complete`, { achievementId }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const getCompletedAchievements = async () => {
  const response = await axios.get(`${API_URL}/completed`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const updateAchievementStatus = async (achievementId, completed) => {
  const response = await axios.put(`${API_URL}/${achievementId}`, { completed }, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/presets';

export const createPreset = async (name, focusTime, breakTime) => {
    const response = await axios.post(API_URL, { name, focusTime, breakTime }, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data;
};

export const getPresets = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return response.data;
};

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/friends';

export const sendFriendRequest = async (requesterId, recipientId) => {
  const response = await axios.post(`${API_URL}/send-request`, { requesterId, recipientId });
  return response.data;
};

export const acceptFriendRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/accept-request/${requestId}`);
  return response.data;
};

export const rejectFriendRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/reject-request/${requestId}`);
  return response.data;
};

export const getFriends = async (userId) => {
  const response = await axios.get(`${API_URL}/list/${userId}`);
  return response.data;
};

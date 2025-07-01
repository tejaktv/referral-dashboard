import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Referrals API
export const referralsAPI = {
  getStats: () => api.get('/referrals/stats'),
  getHistory: () => api.get('/referrals/history'),
  getLeaderboard: () => api.get('/referrals/leaderboard'),
  processReferral: (data) => api.post('/referrals/process', data),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getUserByReferralCode: (code) => api.get(`/users/referral/${code}`),
};

// Withdrawals API
export const withdrawalsAPI = {
  requestWithdrawal: (data) => api.post('/withdrawals/request', data),
  getHistory: () => api.get('/withdrawals/history'),
  getWithdrawal: (id) => api.get(`/withdrawals/${id}`),
};

export default api;
// API Service - Handles all backend communication
// Use relative path so it works on any domain (localhost, production, etc.)
const API_BASE_URL = '/api';

const api = {
  // Auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    return response.json();
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    return response.json();
  },

  // Member endpoints
  getMembers: async (token) => {
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getMemberById: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  createMember: async (memberData, token) => {
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(memberData),
    });
    return response.json();
  },

  updateMember: async (id, memberData, token) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(memberData),
    });
    return response.json();
  },

  deactivateMember: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}/deactivate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Contribution endpoints
  getContributions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/contributions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Loan endpoints
  getLoans: async (token) => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

export default api;



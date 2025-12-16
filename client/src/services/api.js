// API Service - Handles all backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
  // Auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Member endpoints
  getMembers: async (token) => {
    const response = await fetch(`${API_BASE_URL}/members`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  getMember: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
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

  // Contribution endpoints
  getContributions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/contributions`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  recordContribution: async (contributionData, token) => {
    const response = await fetch(`${API_BASE_URL}/contributions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(contributionData),
    });
    return response.json();
  },

  // Loan endpoints
  getLoans: async (token) => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  applyForLoan: async (loanData, token) => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(loanData),
    });
    return response.json();
  },

  // Reports endpoints
  getReports: async (token) => {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  // Vote Heads endpoints
  getVoteHeads: async (token) => {
    const response = await fetch(`${API_BASE_URL}/voteheads`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};

export default api;


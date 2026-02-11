// API Service - Handles all backend communication
// Determine API URL based on environment
const API_BASE_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'  // Local development
    : '/api';  // Production (relative path)

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

  recordContribution: async (data, token) => {
    const response = await fetch(`${API_BASE_URL}/contributions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // House Contributions endpoints
  getHouseContributions: async (token) => {
    const response = await fetch(`${API_BASE_URL}/house-contributions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getContributionsByHouse: async (houseNumber, token) => {
    const response = await fetch(`${API_BASE_URL}/house-contributions/house/${houseNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  saveHouseContribution: async (data, token) => {
    const response = await fetch(`${API_BASE_URL}/house-contributions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteHouseContribution: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/house-contributions/${id}`, {
      method: 'DELETE',
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

  // Vote Head endpoints
  getVoteHeads: async (token) => {
    const response = await fetch(`${API_BASE_URL}/vote-heads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Payment Campaign endpoints
  getPaymentCampaigns: async (token) => {
    const response = await fetch(`${API_BASE_URL}/payment-campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getPaymentCampaignDetails: async (campaignId, token) => {
    const response = await fetch(`${API_BASE_URL}/payment-campaigns/${campaignId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  createPaymentCampaign: async (campaignData, token) => {
    const response = await fetch(`${API_BASE_URL}/payment-campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(campaignData),
    });
    return response.json();
  },

  sendPaymentPrompts: async (campaignId, token) => {
    const response = await fetch(`${API_BASE_URL}/payment-campaigns/${campaignId}/send-prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // M-Pesa Payment endpoints
  getPendingPayments: async (token) => {
    const response = await fetch(`${API_BASE_URL}/mpesa-payments/pending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  confirmPayment: async (requestId, paymentData, token) => {
    const response = await fetch(`${API_BASE_URL}/mpesa-payments/${requestId}/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },
};

export default api;



// API Service - Handles all backend communication
// Use relative path for API calls (proxied through frontend server)
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

  register: async (userData) => {
    // Transform frontend data to backend format
    const backendData = {
      username: userData.email || userData.username, // Use email as username
      email: userData.email,
      password: userData.password,
      full_name: userData.full_name || `${userData.firstName} ${userData.lastName}`,
      role: userData.role || 'secretary',
    };
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendData),
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
    // Transform frontend data to backend format
    const backendData = {
      membership_card_number: memberData.idNumber,
      national_id: memberData.idNumber,
      full_name: `${memberData.firstName} ${memberData.lastName}`,
      phone_number: memberData.phone,
      sex: memberData.sex || 'Not specified',
      date_of_birth: memberData.dateOfBirth || null,
      residence: memberData.residence || '',
      role_in_group: memberData.roleInGroup || 'member',
    };
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(backendData),
    });
    return response.json();
  },

  updateMember: async (id, memberData, token) => {
    // Transform frontend data to backend format
    const backendData = {
      membership_card_number: memberData.idNumber,
      national_id: memberData.idNumber,
      full_name: `${memberData.firstName} ${memberData.lastName}`,
      phone_number: memberData.phone,
      sex: memberData.sex || 'Not specified',
      date_of_birth: memberData.dateOfBirth || null,
      residence: memberData.residence || '',
      role_in_group: memberData.roleInGroup || 'member',
    };
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(backendData),
    });
    return response.json();
  },

  deleteMember: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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


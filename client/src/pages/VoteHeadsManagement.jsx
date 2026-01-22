import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/VoteHeadsManagement.css';

const VoteHeadsManagement = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [voteHeads, setVoteHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchVoteHeads();
  }, [user, navigate]);

  const fetchVoteHeads = async () => {
    try {
      setLoading(true);
      // Placeholder - would need actual API endpoint
      setVoteHeads([
        { id: 1, name: 'Monthly Contribution', description: 'Regular monthly contribution', amount: 1000, is_active: true },
        { id: 2, name: 'Emergency Fund', description: 'Emergency assistance fund', amount: 500, is_active: true },
        { id: 3, name: 'Welfare Fund', description: 'Welfare and benevolent fund', amount: 2000, is_active: true },
      ]);
    } catch (error) {
      console.error('Error fetching vote heads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateVoteHead = async (e) => {
    e.preventDefault();
    try {
      console.log('Creating vote head:', formData);
      setFormData({ name: '', description: '', amount: '' });
      setShowForm(false);
      fetchVoteHeads();
    } catch (error) {
      console.error('Error creating vote head:', error);
    }
  };

  const handleDeleteVoteHead = async (voteHeadId) => {
    if (window.confirm('Are you sure you want to delete this vote head?')) {
      try {
        console.log('Deleting vote head:', voteHeadId);
        fetchVoteHeads();
      } catch (error) {
        console.error('Error deleting vote head:', error);
      }
    }
  };

  return (
    <div className="vote-heads-container">
      <div className="vote-heads-header">
        <h1>🏷️ Vote Heads Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="create-btn">
          {showForm ? '✕ Cancel' : '+ Create Vote Head'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateVoteHead} className="vote-head-form">
          <input type="text" name="name" placeholder="Vote Head Name" value={formData.name} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
          <input type="number" name="amount" placeholder="Default Amount" value={formData.amount} onChange={handleInputChange} required />
          <button type="submit" className="submit-btn">Create Vote Head</button>
        </form>
      )}

      <div className="vote-heads-table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Default Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voteHeads.map(vh => (
                <tr key={vh.id}>
                  <td>{vh.name}</td>
                  <td>{vh.description}</td>
                  <td>KES {vh.amount.toLocaleString()}</td>
                  <td><span className={`status-badge ${vh.is_active ? 'active' : 'inactive'}`}>{vh.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <button onClick={() => handleDeleteVoteHead(vh.id)} className="action-btn delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VoteHeadsManagement;


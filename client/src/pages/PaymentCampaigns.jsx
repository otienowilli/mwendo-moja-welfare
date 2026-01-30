import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/PaymentCampaigns.css';

const PaymentCampaigns = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [voteHeads, setVoteHeads] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    campaign_type: 'CONTRIBUTION',
    amount: '',
    vote_head_id: '',
    start_date: '',
    end_date: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchCampaigns();
    fetchVoteHeads();
  }, [user, navigate, token]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.getPaymentCampaigns(token);
      setCampaigns(response.data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteHeads = async () => {
    try {
      const response = await api.getVoteHeads(token);
      setVoteHeads(response.data || []);
    } catch (error) {
      console.error('Error fetching vote heads:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.createPaymentCampaign(formData, token);
      if (response.campaign) {
        setSuccess('Campaign created successfully!');
        setFormData({
          title: '',
          description: '',
          campaign_type: 'CONTRIBUTION',
          amount: '',
          vote_head_id: '',
          start_date: '',
          end_date: '',
        });
        setShowForm(false);
        fetchCampaigns();
      } else {
        setError(response.error || 'Failed to create campaign');
      }
    } catch (error) {
      setError('Error creating campaign: ' + error.message);
    }
  };

  const handleSendPrompts = async (campaignId) => {
    if (!window.confirm('Send M-Pesa prompts to all active members?')) return;

    try {
      setError('');
      const response = await api.sendPaymentPrompts(campaignId, token);
      if (response.prompts_sent !== undefined) {
        setSuccess(`Prompts sent to ${response.prompts_sent} members!`);
        fetchCampaigns();
      } else {
        setError(response.error || 'Failed to send prompts');
      }
    } catch (error) {
      setError('Error sending prompts: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      draft: '#FFA500',
      active: '#4CAF50',
      completed: '#2196F3',
      cancelled: '#f44336',
    };
    return <span style={{ backgroundColor: colors[status], color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{status.toUpperCase()}</span>;
  };

  return (
    <div className="payment-campaigns-container">
      <div className="campaigns-header">
        <h1>💳 Payment Campaigns</h1>
        <button onClick={() => setShowForm(!showForm)} className="create-btn">
          {showForm ? '✕ Cancel' : '+ Create Campaign'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <form onSubmit={handleCreateCampaign} className="campaign-form">
          <input type="text" name="title" placeholder="Campaign Title" value={formData.title} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
          <select name="campaign_type" value={formData.campaign_type} onChange={handleInputChange}>
            <option value="CONTRIBUTION">Contribution</option>
            <option value="LOAN_REPAYMENT">Loan Repayment</option>
            <option value="WELFARE">Welfare</option>
            <option value="CUSTOM">Custom</option>
          </select>
          <input type="number" name="amount" placeholder="Amount per member" value={formData.amount} onChange={handleInputChange} required />
          <select name="vote_head_id" value={formData.vote_head_id} onChange={handleInputChange}>
            <option value="">Select Vote Head (optional)</option>
            {voteHeads.map(vh => <option key={vh.id} value={vh.id}>{vh.name}</option>)}
          </select>
          <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
          <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
          <button type="submit" className="submit-btn">Create Campaign</button>
        </form>
      )}

      <div className="campaigns-table">
        {loading ? (
          <p>Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p>No campaigns yet. Create one to get started!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Target</th>
                <th>Responses</th>
                <th>Collected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>{campaign.title}</td>
                  <td>{campaign.campaign_type}</td>
                  <td>KES {campaign.amount}</td>
                  <td>{getStatusBadge(campaign.status)}</td>
                  <td>{campaign.target_members || 0}</td>
                  <td>{campaign.responses_received || 0}</td>
                  <td>KES {campaign.total_collected || 0}</td>
                  <td>
                    {campaign.status === 'draft' && (
                      <button onClick={() => handleSendPrompts(campaign.id)} className="action-btn send-btn">Send Prompts</button>
                    )}
                    <button onClick={() => navigate(`/admin/campaigns/${campaign.id}`)} className="action-btn view-btn">View</button>
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

export default PaymentCampaigns;


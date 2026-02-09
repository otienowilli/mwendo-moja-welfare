import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';
import '../styles/Loans.css';

const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  const [voteHeads, setVoteHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVoteHead, setFilterVoteHead] = useState('all');
  const [formData, setFormData] = useState({
    member_id: '',
    vote_head_id: '',
    amount: '',
    contribution_date: new Date().toISOString().split('T')[0],
  });
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchContributions();
      fetchVoteHeads();
    }
  }, [token]);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const response = await api.getContributions(token);
      setContributions(response.data || []);
    } catch (err) {
      setError('Failed to fetch contributions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteHeads = async () => {
    try {
      const response = await api.getVoteHeads(token);
      setVoteHeads(response.data || []);
    } catch (err) {
      console.error('Failed to fetch vote heads');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.recordContribution(formData, token);
      if (response.success) {
        setFormData({ member_id: '', vote_head_id: '', amount: '', contribution_date: new Date().toISOString().split('T')[0] });
        setShowForm(false);
        setError('');
        fetchContributions();
      } else {
        setError(response.message || 'Failed to create contribution');
      }
    } catch (err) {
      setError('Failed to create contribution');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getVoteHeadName = (voteHeadId) => {
    const voteHead = voteHeads.find(vh => vh.id === voteHeadId || vh._id === voteHeadId);
    return voteHead ? voteHead.name : 'N/A';
  };

  const filteredContributions = contributions.filter(contribution => {
    const matchesSearch =
      (contribution.member_id || '').toString().includes(searchTerm) ||
      getVoteHeadName(contribution.vote_head_id).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVoteHead = filterVoteHead === 'all' || contribution.vote_head_id === filterVoteHead;

    return matchesSearch && matchesVoteHead;
  });

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>Contribution Tracking</h1>
        <p>Record and track member contributions</p>
      </div>
        {error && <div className="error-message">{error}</div>}

        <div className="members-controls">
          <input
            type="text"
            placeholder="Search by member ID or vote head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterVoteHead}
            onChange={(e) => setFilterVoteHead(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Vote Heads</option>
            {voteHeads.map(vh => (
              <option key={vh._id || vh.id} value={vh._id || vh.id}>
                {vh.name || vh.title}
              </option>
            ))}
          </select>
          <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Add Contribution'}
          </button>
        </div>
        {showForm && (
          <form className="member-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="member_id"
              placeholder="Member ID"
              value={formData.member_id}
              onChange={handleChange}
              required
            />
            <select
              name="vote_head_id"
              value={formData.vote_head_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Vote Head</option>
              {voteHeads.map((vh) => (
                <option key={vh.id} value={vh.id}>{vh.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Amount (KES)"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
            />
            <input
              type="date"
              name="contribution_date"
              value={formData.contribution_date}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">Add Contribution</button>
          </form>
        )}
        <div className="members-table">
          {filteredContributions.length === 0 ? (
            <div className="empty-state">
              <p>{contributions.length === 0 ? 'No contributions found' : 'No contributions match your search'}</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Vote Head</th>
                  <th>Amount (KES)</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContributions.map((contrib) => (
                  <tr key={contrib.id || contrib._id}>
                    <td>{contrib.member_id || contrib.memberId || 'N/A'}</td>
                    <td>{getVoteHeadName(contrib.vote_head_id || contrib.voteHeadId)}</td>
                    <td>{(contrib.amount || 0).toLocaleString()}</td>
                    <td>{new Date(contrib.contribution_date || contrib.date).toLocaleDateString()}</td>
                    <td><span className={`status-${contrib.status}`}>{contrib.status || 'Pending'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    </div>
  );
};

export default Contributions;


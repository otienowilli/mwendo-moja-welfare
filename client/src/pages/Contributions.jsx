import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  const [voteHeads, setVoteHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    voteHeadId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContributions();
    fetchVoteHeads();
  }, []);

  const fetchContributions = async () => {
    try {
      const response = await api.get('/contributions');
      setContributions(response.data);
    } catch (err) {
      setError('Failed to fetch contributions');
    } finally {
      setLoading(false);
    }
  };

  const fetchVoteHeads = async () => {
    try {
      const response = await api.get('/voteheads');
      setVoteHeads(response.data);
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
      await api.post('/contributions', formData);
      setFormData({ memberId: '', voteHeadId: '', amount: '', date: new Date().toISOString().split('T')[0] });
      setShowForm(false);
      fetchContributions();
    } catch (err) {
      setError('Failed to create contribution');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="navbar-brand">MWENDO MOJA - Contributions</div>
        <div className="navbar-user">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="members-container">
        <h1>Contributions</h1>
        {error && <div className="error-message">{error}</div>}
        <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Contribution'}
        </button>
        {showForm && (
          <form className="member-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="memberId"
              placeholder="Member ID"
              value={formData.memberId}
              onChange={handleChange}
              required
            />
            <select
              name="voteHeadId"
              value={formData.voteHeadId}
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
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">Add Contribution</button>
          </form>
        )}
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Vote Head</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contrib) => (
                <tr key={contrib.id}>
                  <td>{contrib.memberId}</td>
                  <td>{contrib.voteHeadId}</td>
                  <td>KES {contrib.amount}</td>
                  <td>{new Date(contrib.date).toLocaleDateString()}</td>
                  <td>{contrib.status || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contributions;


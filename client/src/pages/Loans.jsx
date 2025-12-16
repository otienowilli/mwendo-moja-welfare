import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    interestRate: '',
    duration: '',
    purpose: '',
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get('/loans');
      setLoans(response.data);
    } catch (err) {
      setError('Failed to fetch loans');
    } finally {
      setLoading(false);
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
      await api.post('/loans', formData);
      setFormData({ memberId: '', amount: '', interestRate: '', duration: '', purpose: '' });
      setShowForm(false);
      fetchLoans();
    } catch (err) {
      setError('Failed to create loan');
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
        <div className="navbar-brand">MWENDO MOJA - Loans</div>
        <div className="navbar-user">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="members-container">
        <h1>Loan Management</h1>
        {error && <div className="error-message">{error}</div>}
        <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Apply for Loan'}
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
            <input
              type="number"
              name="amount"
              placeholder="Loan Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="interestRate"
              placeholder="Interest Rate (%)"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (months)"
              value={formData.duration}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="purpose"
              placeholder="Loan Purpose"
              value={formData.purpose}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">Apply for Loan</button>
          </form>
        )}
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.memberId}</td>
                  <td>KES {loan.amount}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.duration} months</td>
                  <td>{loan.status || 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loans;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';
import '../styles/Loans.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    memberId: '',
    principal_amount: '',
    interest_rate: '',
    loan_duration_months: '',
    purpose: '',
  });
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchLoans();
    }
  }, [token]);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await api.getLoans(token);
      setLoans(response.data || []);
    } catch (err) {
      setError('Failed to fetch loans');
      console.error(err);
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
      const response = await api.applyForLoan(formData, token);
      if (response.success) {
        setFormData({ memberId: '', principal_amount: '', interest_rate: '', loan_duration_months: '', purpose: '' });
        setShowForm(false);
        setError('');
        fetchLoans();
      } else {
        setError(response.message || 'Failed to create loan');
      }
    } catch (err) {
      setError('Failed to create loan');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch =
      (loan.member_id || loan.memberId || '').toString().includes(searchTerm) ||
      (loan.purpose || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || loan.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>Loan Management</h1>
        <p>Apply for loans and track repayments</p>
      </div>
        {error && <div className="error-message">{error}</div>}

        <div className="members-controls">
          <input
            type="text"
            placeholder="Search by member ID or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="repaid">Repaid</option>
          </select>
          <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Apply for Loan'}
          </button>
        </div>
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
              name="principal_amount"
              placeholder="Loan Amount (KES)"
              value={formData.principal_amount}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="interest_rate"
              placeholder="Interest Rate (%)"
              value={formData.interest_rate}
              onChange={handleChange}
              required
              step="0.01"
            />
            <input
              type="number"
              name="loan_duration_months"
              placeholder="Duration (months)"
              value={formData.loan_duration_months}
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
          {filteredLoans.length === 0 ? (
            <div className="empty-state">
              <p>{loans.length === 0 ? 'No loans found' : 'No loans match your search'}</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Amount (KES)</th>
                  <th>Interest Rate</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id || loan._id}>
                    <td>{loan.member_id || loan.memberId || 'N/A'}</td>
                    <td>{(loan.principal_amount || loan.amount || 0).toLocaleString()}</td>
                    <td>{loan.interest_rate || loan.interestRate || 0}%</td>
                    <td>{loan.loan_duration_months || loan.duration || 0} months</td>
                    <td><span className={`status-${loan.status}`}>{loan.status || 'Pending'}</span></td>
                    <td>{loan.purpose || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
    </div>
  );
};

export default Loans;


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
  const [reminderSent, setReminderSent] = useState('');
  const [formData, setFormData] = useState({
    memberId: '',
    principal_amount: '',
    interest_rate: '',
    loan_duration_months: '',
    purpose: '',
  });
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

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

  const handleSendReminder = async (loanId, memberId) => {
    if (!isAdmin) return;
    try {
      // Call API to send reminder
      const response = await api.sendLoanReminder(loanId, memberId, token);
      if (response.success) {
        setReminderSent(`Reminder sent to member ${memberId}`);
        setTimeout(() => setReminderSent(''), 3000);
      } else {
        setError(response.message || 'Failed to send reminder');
      }
    } catch (err) {
      setError('Failed to send reminder');
      console.error(err);
    }
  };

  // Filter loans based on user role
  const getVisibleLoans = () => {
    if (isAdmin) {
      // Admin sees all loans
      return loans;
    } else {
      // Non-admin users only see approved and repaid loans (loan reports)
      return loans.filter(loan => loan.status === 'approved' || loan.status === 'repaid');
    }
  };

  const filteredLoans = getVisibleLoans().filter(loan => {
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
        <p>{isAdmin ? 'Manage loan applications and track repayments' : 'Apply for loans and view your loan status'}</p>
      </div>
        {error && <div className="error-message">{error}</div>}
        {reminderSent && <div className="success-message">{reminderSent}</div>}

        <div className="members-controls">
          <input
            type="text"
            placeholder="Search by member ID or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {isAdmin && (
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
          )}
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
                  {isAdmin && <th>Actions</th>}
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
                    {isAdmin && (
                      <td>
                        <button
                          className="action-btn reminder-btn"
                          onClick={() => handleSendReminder(loan.id || loan._id, loan.member_id || loan.memberId)}
                          title="Send reminder to member about this loan"
                        >
                          📧 Remind
                        </button>
                      </td>
                    )}
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


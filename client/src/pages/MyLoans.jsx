import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalLoans: 0,
    totalBorrowed: 0,
    totalRepaid: 0,
    outstandingBalance: 0,
  });
  const { token } = useAuth();
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
      const loansData = response.data || [];
      setLoans(loansData);

      // Calculate statistics
      const totalBorrowed = loansData.reduce((sum, l) => sum + (l.principal_amount || l.amount || 0), 0);
      const approvedLoans = loansData.filter(l => l.status === 'approved' || l.status === 'disbursed').length;
      const outstandingBalance = loansData
        .filter(l => l.status === 'disbursed')
        .reduce((sum, l) => sum + (l.principal_amount || l.amount || 0), 0);

      setStats({
        totalLoans: loansData.length,
        totalBorrowed: totalBorrowed,
        totalRepaid: 0,
        outstandingBalance: outstandingBalance,
      });
    } catch (err) {
      setError('Failed to fetch loans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>My Loans</h1>
        <p>View your loan applications and repayment status</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Loans</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{stats.totalLoans}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Borrowed</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>KES {stats.totalBorrowed?.toLocaleString()}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Outstanding Balance</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>KES {stats.outstandingBalance?.toLocaleString()}</p>
        </div>
      </div>

      <div className="members-table" style={{ marginTop: '30px' }}>
        {loans.length === 0 ? (
          <div className="empty-state">
            <p>No loans found. Apply for a loan to get started.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Amount (KES)</th>
                <th>Interest Rate</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id || loan._id}>
                  <td>{loan.id || loan._id}</td>
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

export default MyLoans;


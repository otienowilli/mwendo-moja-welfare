import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Reports = () => {
  const [reports, setReports] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0,
    totalRepayments: 0,
    pendingLoans: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/reports/summary');
      setReports(response.data);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
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
        <div className="navbar-brand">MWENDO MOJA - Reports</div>
        <div className="navbar-user">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="members-container">
        <h1>Financial Reports</h1>
        {error && <div className="error-message">{error}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Members</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{reports.totalMembers}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Contributions</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>KES {reports.totalContributions?.toLocaleString()}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Loans Disbursed</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>KES {reports.totalLoans?.toLocaleString()}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Total Repayments</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>KES {reports.totalRepayments?.toLocaleString()}</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Pending Loans</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{reports.pendingLoans}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;


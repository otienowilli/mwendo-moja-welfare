import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0,
    pendingLoans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [token, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [members, contributions, loans] = await Promise.all([
        api.getMembers(token),
        api.getContributions(token),
        api.getLoans(token),
      ]);

      setStats({
        totalMembers: members.data?.length || 0,
        totalContributions: contributions.data?.length || 0,
        totalLoans: loans.data?.length || 0,
        pendingLoans: loans.data?.filter(l => l.status === 'pending').length || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">MWENDO MOJA</div>
        <div className="navbar-user">
          <span>{user?.name || 'User'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Dashboard</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Members</h3>
              <p className="stat-number">{stats.totalMembers}</p>
            </div>
            <div className="stat-card">
              <h3>Total Contributions</h3>
              <p className="stat-number">{stats.totalContributions}</p>
            </div>
            <div className="stat-card">
              <h3>Total Loans</h3>
              <p className="stat-number">{stats.totalLoans}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Loans</h3>
              <p className="stat-number">{stats.pendingLoans}</p>
            </div>
          </div>
        )}

        <div className="quick-actions">
          <button onClick={() => navigate('/members')} className="action-btn">
            Manage Members
          </button>
          <button onClick={() => navigate('/contributions')} className="action-btn">
            Record Contribution
          </button>
          <button onClick={() => navigate('/loans')} className="action-btn">
            Manage Loans
          </button>
          <button onClick={() => navigate('/reports')} className="action-btn">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


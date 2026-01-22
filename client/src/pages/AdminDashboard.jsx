import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0,
    activeLoans: 0,
    pendingLoans: 0,
    totalVoteHeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchAdminStats();
  }, [token, user, navigate]);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const [members, contributions, loans] = await Promise.all([
        api.getMembers(token),
        api.getContributions(token),
        api.getLoans(token),
      ]);

      const loansData = loans.data || [];
      setStats({
        totalUsers: 5, // Placeholder - would need API endpoint
        totalMembers: members.data?.length || 0,
        totalContributions: contributions.data?.length || 0,
        totalLoans: loansData.length,
        activeLoans: loansData.filter(l => l.status === 'active').length,
        pendingLoans: loansData.filter(l => l.status === 'pending').length,
        totalVoteHeads: 8, // Placeholder
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>🔐 Admin Dashboard</h1>
        <p>System Administration & Management</p>
      </div>

      <div className="admin-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <h3>👥 Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
              </div>
              <div className="admin-stat-card">
                <h3>👤 Total Members</h3>
                <p className="stat-number">{stats.totalMembers}</p>
              </div>
              <div className="admin-stat-card">
                <h3>💰 Total Contributions</h3>
                <p className="stat-number">{stats.totalContributions}</p>
              </div>
              <div className="admin-stat-card">
                <h3>📋 Total Loans</h3>
                <p className="stat-number">{stats.totalLoans}</p>
              </div>
              <div className="admin-stat-card">
                <h3>✅ Active Loans</h3>
                <p className="stat-number">{stats.activeLoans}</p>
              </div>
              <div className="admin-stat-card">
                <h3>⏳ Pending Loans</h3>
                <p className="stat-number">{stats.pendingLoans}</p>
              </div>
              <div className="admin-stat-card">
                <h3>🏷️ Vote Heads</h3>
                <p className="stat-number">{stats.totalVoteHeads}</p>
              </div>
            </div>

            <div className="admin-actions">
              <h2>Admin Controls</h2>
              <div className="admin-buttons-grid">
                <button onClick={() => navigate('/admin/users')} className="admin-btn">
                  👥 Manage Users
                </button>
                <button onClick={() => navigate('/admin/vote-heads')} className="admin-btn">
                  🏷️ Manage Vote Heads
                </button>
                <button onClick={() => navigate('/admin/settings')} className="admin-btn">
                  ⚙️ System Settings
                </button>
                <button onClick={() => navigate('/reports')} className="admin-btn">
                  📊 View Reports
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


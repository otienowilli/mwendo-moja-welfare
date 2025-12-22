import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { MembersChart, ContributionsChart, LoansChart } from '../components/Charts';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0,
    pendingLoans: 0,
  });
  const [chartData, setChartData] = useState({
    members: { active: 0, inactive: 0 },
    contributions: [],
    loans: [],
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

      const membersData = members.data || [];
      const contributionsData = contributions.data || [];
      const loansData = loans.data || [];

      setStats({
        totalMembers: membersData.length,
        totalContributions: contributionsData.length,
        totalLoans: loansData.length,
        pendingLoans: loansData.filter(l => l.status === 'pending').length,
      });

      setChartData({
        members: {
          active: membersData.filter(m => m.status === 'active').length,
          inactive: membersData.filter(m => m.status !== 'active').length,
        },
        contributions: contributionsData,
        loans: loansData,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.full_name || user?.name || 'User'}!</h1>
        <p>Here's your welfare group overview</p>
      </div>

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

        {!loading && (
          <div className="charts-section">
            <h2>Analytics</h2>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Member Status</h3>
                <MembersChart data={chartData.members} />
              </div>
              <div className="chart-card">
                <h3>Contributions Trend</h3>
                <ContributionsChart data={chartData.contributions} />
              </div>
              <div className="chart-card">
                <h3>Loan Status Distribution</h3>
                <LoansChart data={chartData.loans} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


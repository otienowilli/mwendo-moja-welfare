import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';
import '../styles/Reports.css';

const Reports = () => {
  const [reports, setReports] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalLoans: 0,
    totalRepayments: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0,
    activeMembers: 0,
  });
  const [reportType, setReportType] = useState('summary');
  const [detailedData, setDetailedData] = useState({
    members: [],
    loans: [],
    contributions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchReports();
    }
  }, [token]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Fetch data from multiple endpoints to build reports
      const [members, contributions, loans] = await Promise.all([
        api.getMembers(token),
        api.getContributions(token),
        api.getLoans(token),
      ]);

      const membersData = members.data || [];
      const contributionsData = contributions.data || [];
      const loansData = loans.data || [];

      const totalContributions = contributionsData.reduce((sum, c) => sum + (c.amount || 0), 0);
      const totalLoans = loansData.reduce((sum, l) => sum + (l.principal_amount || l.amount || 0), 0);
      const pendingLoans = loansData.filter(l => l.status === 'pending').length;
      const approvedLoans = loansData.filter(l => l.status === 'approved').length;
      const rejectedLoans = loansData.filter(l => l.status === 'rejected').length;
      const activeMembers = membersData.filter(m => m.status === 'active').length;

      setReports({
        totalMembers: membersData.length,
        totalContributions: totalContributions,
        totalLoans: totalLoans,
        totalRepayments: 0,
        pendingLoans: pendingLoans,
        approvedLoans: approvedLoans,
        rejectedLoans: rejectedLoans,
        activeMembers: activeMembers,
      });

      setDetailedData({
        members: membersData,
        loans: loansData,
        contributions: contributionsData,
      });
    } catch (err) {
      setError('Failed to fetch reports');
      console.error(err);
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
    <div className="members-container">
      <div className="page-header">
        <h1>Financial Reports</h1>
        <p>View comprehensive financial summaries and analytics</p>
      </div>
        {error && <div className="error-message">{error}</div>}

        <div className="members-controls">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="filter-select"
          >
            <option value="summary">Summary Report</option>
            <option value="members">Member Report</option>
            <option value="loans">Loan Report</option>
            <option value="contributions">Contribution Report</option>
          </select>
        </div>

        {reportType === 'summary' && (
          <div className="reports-grid">
            <div className="report-card">
              <h3>Total Members</h3>
              <p className="report-value">{reports.totalMembers}</p>
              <p className="report-subtitle">Total registered members</p>
            </div>
            <div className="report-card">
              <h3>Active Members</h3>
              <p className="report-value">{reports.activeMembers}</p>
              <p className="report-subtitle">Currently active</p>
            </div>
            <div className="report-card">
              <h3>Total Contributions</h3>
              <p className="report-value">KES {reports.totalContributions?.toLocaleString()}</p>
              <p className="report-subtitle">Cumulative contributions</p>
            </div>
            <div className="report-card">
              <h3>Total Loans Disbursed</h3>
              <p className="report-value">KES {reports.totalLoans?.toLocaleString()}</p>
              <p className="report-subtitle">Total loan amount issued</p>
            </div>
            <div className="report-card">
              <h3>Approved Loans</h3>
              <p className="report-value">{reports.approvedLoans}</p>
              <p className="report-subtitle">Successfully approved</p>
            </div>
            <div className="report-card">
              <h3>Pending Loans</h3>
              <p className="report-value">{reports.pendingLoans}</p>
              <p className="report-subtitle">Awaiting approval</p>
            </div>
            <div className="report-card">
              <h3>Rejected Loans</h3>
              <p className="report-value">{reports.rejectedLoans}</p>
              <p className="report-subtitle">Not approved</p>
            </div>
            <div className="report-card">
              <h3>Total Repayments</h3>
              <p className="report-value">KES {reports.totalRepayments?.toLocaleString()}</p>
              <p className="report-subtitle">Total amount repaid</p>
            </div>
          </div>
        )}

        {reportType === 'members' && (
          <div className="members-table">
            {detailedData.members.length === 0 ? (
              <p>No member data available</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Member ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedData.members.map((member) => (
                    <tr key={member.id || member._id}>
                      <td>{member.id || member._id}</td>
                      <td>{member.name || member.full_name || 'N/A'}</td>
                      <td>{member.email || 'N/A'}</td>
                      <td>{member.phone || 'N/A'}</td>
                      <td><span className={`status-${member.status}`}>{member.status || 'Active'}</span></td>
                      <td>{member.created_at ? new Date(member.created_at).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {reportType === 'loans' && (
          <div className="members-table">
            {detailedData.loans.length === 0 ? (
              <p>No loan data available</p>
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
                  {detailedData.loans.map((loan) => (
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
        )}

        {reportType === 'contributions' && (
          <div className="members-table">
            {detailedData.contributions.length === 0 ? (
              <p>No contribution data available</p>
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
                  {detailedData.contributions.map((contrib) => (
                    <tr key={contrib.id || contrib._id}>
                      <td>{contrib.member_id || contrib.memberId || 'N/A'}</td>
                      <td>{contrib.vote_head_id || contrib.voteHeadId || 'N/A'}</td>
                      <td>{(contrib.amount || 0).toLocaleString()}</td>
                      <td>{new Date(contrib.contribution_date || contrib.date).toLocaleDateString()}</td>
                      <td><span className={`status-${contrib.status}`}>{contrib.status || 'Pending'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
    </div>
  );
};

export default Reports;


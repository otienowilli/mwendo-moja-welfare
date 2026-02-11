import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';
import '../styles/Loans.css';
import '../styles/Contributions.css';

const Contributions = () => {
  const [contributions, setContributions] = useState([]);
  const [members, setMembers] = useState([]);
  const [voteHeads, setVoteHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState('01');
  const [houseHosts, setHouseHosts] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
  const [formData, setFormData] = useState({
    member_id: '',
    vote_head_id: '',
    amount: '',
    contribution_date: new Date().toISOString().split('T')[0],
  });
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchContributions();
      fetchMembers();
      fetchVoteHeads();
    }
  }, [token]);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const response = await api.getContributions(token);
      setContributions(response.data || []);
    } catch (err) {
      setError('Failed to fetch contributions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await api.getMembers(token);
      setMembers(response.data || []);
    } catch (err) {
      console.error('Failed to fetch members');
    }
  };

  const fetchVoteHeads = async () => {
    try {
      const response = await api.getVoteHeads(token);
      setVoteHeads(response.data || []);
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
      const response = await api.recordContribution(formData, token);
      if (response.success) {
        setFormData({ member_id: '', vote_head_id: '', amount: '', contribution_date: new Date().toISOString().split('T')[0] });
        setShowForm(false);
        setError('');
        fetchContributions();
      } else {
        setError(response.message || 'Failed to create contribution');
      }
    } catch (err) {
      setError('Failed to create contribution');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getVoteHeadName = (voteHeadId) => {
    const voteHead = voteHeads.find(vh => vh.id === voteHeadId || vh._id === voteHeadId);
    return voteHead ? voteHead.name : 'N/A';
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId || m._id === memberId);
    return member ? member.full_name : 'N/A';
  };

  // Build contribution matrix: rows = members, columns = vote heads
  const buildContributionMatrix = () => {
    const matrix = {};

    members.forEach(member => {
      matrix[member.id] = {
        member,
        contributions: {}
      };
      voteHeads.forEach(vh => {
        matrix[member.id].contributions[vh.id] = 0;
      });
    });

    contributions.forEach(contrib => {
      if (matrix[contrib.member_id]) {
        matrix[contrib.member_id].contributions[contrib.vote_head_id] =
          (matrix[contrib.member_id].contributions[contrib.vote_head_id] || 0) + parseFloat(contrib.amount || 0);
      }
    });

    return matrix;
  };

  const contributionMatrix = buildContributionMatrix();
  const matrixRows = Object.values(contributionMatrix);

  if (loading) return <div className="members-container"><p>Loading...</p></div>;

  return (
    <div className="contributions-container">
      {/* Report Header */}
      <div className="report-header">
        <h1 className="report-title">MWENDO MOJA WELFARE CONTRIBUTIONS</h1>
        <p className="report-subtitle">MEMBERS CONTRIBUTIONS FOR VARIOUS VOTE HEADS PER HOUSE - 2026 / 2027</p>

        {/* House Information Section */}
        <div className="house-info-section">
          <div className="house-info-row">
            <div className="house-number">
              <label>HOUSE NO.</label>
              <input
                type="text"
                value={selectedHouse}
                onChange={(e) => setSelectedHouse(e.target.value)}
                className="house-input"
              />
            </div>
            <div className="house-hosts">
              <label>HOST(S)</label>
              <textarea
                value={houseHosts}
                onChange={(e) => setHouseHosts(e.target.value)}
                placeholder="1. Name&#10;2. Name"
                className="hosts-input"
              />
            </div>
            <div className="report-date">
              <label>DATE</label>
              <input
                type="text"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="date-input"
              />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Controls */}
      <div className="contributions-controls">
        <button className="add-member-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Contribution'}
        </button>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Report
        </button>
      </div>

      {/* Add Contribution Form */}
      {showForm && (
        <form className="member-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="member_id"
            placeholder="Member ID"
            value={formData.member_id}
            onChange={handleChange}
            required
          />
          <select
            name="vote_head_id"
            value={formData.vote_head_id}
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
            placeholder="Amount (KES)"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
          />
          <input
            type="date"
            name="contribution_date"
            value={formData.contribution_date}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Add Contribution</button>
        </form>
      )}

      {/* Contributions Table */}
      <div className="contributions-table-wrapper">
        {matrixRows.length === 0 ? (
          <div className="empty-state">
            <p>No members found</p>
          </div>
        ) : (
          <table className="contributions-matrix-table">
            {/* First Header Row: S/NO, NAME, MEMBERSHIP FEES, WELFARE CONTRIBUTIONS, HOSTS' DUES */}
            <thead>
              <tr className="header-row-1">
                <th className="col-sno">S/NO</th>
                <th className="col-name">NAME</th>
                <th className="col-membership">MEMBERSHIP FEES</th>
                <th className="col-welfare">WELFARE CONTRIBUTIONS</th>
                <th className="col-hosts">HOSTS' DUES</th>
              </tr>

              {/* Second Header Row: Vote Heads */}
              <tr className="header-row-2">
                <th colSpan="2"></th>
                {voteHeads.map((vh) => (
                  <th key={vh.id} className="vote-head-col" title={vh.name}>
                    {vh.name.substring(0, 4).toUpperCase()}
                  </th>
                ))}
                <th className="col-total">TOTAL</th>
              </tr>
            </thead>

            {/* Data Rows */}
            <tbody>
              {matrixRows.map((row, index) => {
                const rowTotal = Object.values(row.contributions).reduce((sum, val) => sum + val, 0);
                return (
                  <tr key={row.member.id} className="data-row">
                    <td className="col-sno">{index + 1}</td>
                    <td className="col-name">{row.member.full_name}</td>
                    {voteHeads.map((vh) => (
                      <td key={vh.id} className="vote-head-col amount">
                        {row.contributions[vh.id] > 0 ? row.contributions[vh.id].toLocaleString() : '-'}
                      </td>
                    ))}
                    <td className="col-total amount">{rowTotal.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>

            {/* Totals Row */}
            <tfoot>
              <tr className="totals-row">
                <td colSpan="2" className="totals-label">TOTALS</td>
                {voteHeads.map((vh) => {
                  const vhTotal = matrixRows.reduce((sum, row) => sum + (row.contributions[vh.id] || 0), 0);
                  return (
                    <td key={vh.id} className="vote-head-col amount total">
                      {vhTotal.toLocaleString()}
                    </td>
                  );
                })}
                <td className="col-total amount total">
                  {matrixRows.reduce((sum, row) => sum + Object.values(row.contributions).reduce((s, v) => s + v, 0), 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default Contributions;


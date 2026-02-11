import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';
import '../styles/Loans.css';
import '../styles/Contributions.css';

const Contributions = () => {
  const [houseContributions, setHouseContributions] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('01');
  const [houseHosts, setHouseHosts] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  // Vote head columns in order
  const voteHeadColumns = ['reg', 'entry', 'card', 'shar', 'savi', 'admn', 's_fund', 'fine', 'unif', 'merr', 'anniv', 'sindi', 'meal', 'jikon'];
  const voteHeadLabels = {
    reg: 'REG',
    entry: 'ENTRY',
    card: 'CARD',
    shar: 'SHAR',
    savi: 'SAVI',
    admn: 'ADMN',
    s_fund: 'S/FUND',
    fine: 'FINE',
    unif: 'UNIF',
    merr: 'MERR',
    anniv: 'ANNIV',
    sindi: 'SINDI',
    meal: 'MEAL',
    jikon: 'JIKON',
  };

  useEffect(() => {
    if (token) {
      fetchHouseContributions();
      fetchMembers();
    }
  }, [token]);

  useEffect(() => {
    if (token && selectedHouse) {
      fetchContributionsByHouse();
    }
  }, [selectedHouse, token]);

  const fetchHouseContributions = async () => {
    try {
      setLoading(true);
      const response = await api.getHouseContributions(token);
      setHouseContributions(response.data || []);
    } catch (err) {
      setError('Failed to fetch contributions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContributionsByHouse = async () => {
    try {
      const response = await api.getContributionsByHouse(selectedHouse, token);
      setHouseContributions(response.data || []);
    } catch (err) {
      console.error('Failed to fetch house contributions');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        member_id: parseInt(formData.member_id),
        house_number: selectedHouse,
      };
      voteHeadColumns.forEach(col => {
        submitData[col] = formData[col] || 0;
      });
      const response = await api.saveHouseContribution(submitData, token);
      if (response.success) {
        setFormData({});
        setEditingId(null);
        setError('');
        fetchContributionsByHouse();
      } else {
        setError(response.message || 'Failed to save contribution');
      }
    } catch (err) {
      setError('Failed to save contribution');
      console.error(err);
    }
  };

  const handleEdit = (contribution) => {
    setEditingId(contribution.id);
    const editData = { member_id: contribution.member_id };
    voteHeadColumns.forEach(col => {
      editData[col] = contribution[col] || 0;
    });
    setFormData(editData);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contribution?')) {
      try {
        const response = await api.deleteHouseContribution(id, token);
        if (response.success) {
          fetchContributionsByHouse();
        }
      } catch (err) {
        setError('Failed to delete contribution');
        console.error(err);
      }
    }
  };

  const calculateRowTotal = (contribution) => {
    return voteHeadColumns.reduce((sum, col) => sum + (parseFloat(contribution[col]) || 0), 0);
  };

  const calculateColumnTotal = (column) => {
    return houseContributions.reduce((sum, contrib) => sum + (parseFloat(contrib[column]) || 0), 0);
  };

  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.full_name : 'N/A';
  };

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
        <button className="add-member-btn" onClick={() => {
          setEditingId(null);
          setFormData({});
        }}>
          {editingId ? '✕ Cancel Edit' : '+ Add Contribution'}
        </button>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Report
        </button>
      </div>

      {/* Add/Edit Contribution Form */}
      {(editingId || Object.keys(formData).length > 0) && (
        <form className="member-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <select
              name="member_id"
              value={formData.member_id || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>{member.full_name}</option>
              ))}
            </select>
          </div>
          <div className="form-grid">
            {voteHeadColumns.map((col) => (
              <div key={col} className="form-group">
                <label>{voteHeadLabels[col]}</label>
                <input
                  type="number"
                  name={col}
                  placeholder="0.00"
                  value={formData[col] || ''}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="submit-btn">
            {editingId ? 'Update Contribution' : 'Add Contribution'}
          </button>
        </form>
      )}

      {/* Contributions Table */}
      <div className="contributions-table-wrapper">
        {houseContributions.length === 0 ? (
          <div className="empty-state">
            <p>No contributions recorded for this house</p>
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
                {voteHeadColumns.map((col) => (
                  <th key={col} className="vote-head-col">
                    {voteHeadLabels[col]}
                  </th>
                ))}
                <th className="col-total">TOTAL</th>
              </tr>
            </thead>

            {/* Data Rows */}
            <tbody>
              {houseContributions.map((contribution, index) => {
                const rowTotal = calculateRowTotal(contribution);
                return (
                  <tr key={contribution.id} className="data-row">
                    <td className="col-sno">{index + 1}</td>
                    <td className="col-name">{getMemberName(contribution.member_id)}</td>
                    {voteHeadColumns.map((col) => (
                      <td key={col} className="vote-head-col amount">
                        {contribution[col] > 0 ? parseFloat(contribution[col]).toLocaleString() : '-'}
                      </td>
                    ))}
                    <td className="col-total amount">{rowTotal.toLocaleString()}</td>
                    <td className="col-actions">
                      <button className="edit-btn" onClick={() => handleEdit(contribution)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(contribution.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Totals Row */}
            <tfoot>
              <tr className="totals-row">
                <td colSpan="2" className="totals-label">TOTALS</td>
                {voteHeadColumns.map((col) => {
                  const colTotal = calculateColumnTotal(col);
                  return (
                    <td key={col} className="vote-head-col amount total">
                      {colTotal.toLocaleString()}
                    </td>
                  );
                })}
                <td className="col-total amount total">
                  {houseContributions.reduce((sum, contrib) => sum + calculateRowTotal(contrib), 0).toLocaleString()}
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


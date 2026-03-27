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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('house'); // 'house', 'daily', 'monthly', 'yearly', 'individual'
  const [allContributions, setAllContributions] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(''); // For individual member reports
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Vote head columns in order
  const voteHeadColumns = ['reg', 'entry', 'card', 'shar', 'savi', 'admn', 's_fund', 'fine', 'loans', 'interest', 'unif', 'merr', 'anniv', 'sindi', 'meal', 'jikon', 'beneev'];
  const voteHeadLabels = {
    reg: 'REGISTRATION FEES',
    entry: 'ENTRY FEE',
    card: 'MEMBERSHIP CARD',
    shar: 'SHARES',
    savi: 'SAVINGS',
    admn: 'ADMIN COST',
    s_fund: 'SEED FUND',
    fine: 'FINES/PENALTIES',
    loans: 'LOANS',
    interest: 'INTEREST',
    unif: 'UNIFORM',
    merr: 'MERRY-GO',
    anniv: 'ANNIVERSARY',
    sindi: 'SINDIKIZA',
    meal: 'MEALS',
    jikon: 'PAMBA JIKONI',
    beneev: 'BENEVOLENT',
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
      const data = response.data || [];
      setHouseContributions(data);
      setAllContributions(data); // Store all contributions for reports
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
      setMembers(response.members || response.data || []);
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
        setShowForm(false);
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
    setShowForm(true);
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

  // Generate Daily Report with sub-reports for each vote head
  const generateDailyReport = () => {
    const dailyData = {};

    allContributions.forEach(contrib => {
      const date = contrib.date || new Date().toLocaleDateString('en-GB');
      if (!dailyData[date]) {
        dailyData[date] = {};
        voteHeadColumns.forEach(col => {
          dailyData[date][col] = 0;
        });
      }
      voteHeadColumns.forEach(col => {
        dailyData[date][col] += parseFloat(contrib[col]) || 0;
      });
    });

    return Object.entries(dailyData).map(([date, totals]) => ({
      date,
      ...totals,
      total: voteHeadColumns.reduce((sum, col) => sum + totals[col], 0)
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Generate Daily Sub-Reports for each vote head
  const generateDailyVoteHeadReports = () => {
    const voteHeadReports = {};

    // Initialize reports for each vote head
    voteHeadColumns.forEach(col => {
      voteHeadReports[col] = {};
    });

    // Group contributions by date and vote head
    allContributions.forEach(contrib => {
      const date = contrib.date || new Date().toLocaleDateString('en-GB');

      voteHeadColumns.forEach(col => {
        if (!voteHeadReports[col][date]) {
          voteHeadReports[col][date] = {
            date,
            amount: 0,
            members: [],
            houses: new Set()
          };
        }
        const amount = parseFloat(contrib[col]) || 0;
        if (amount > 0) {
          voteHeadReports[col][date].amount += amount;
          voteHeadReports[col][date].members.push({
            name: getMemberName(contrib.member_id),
            amount: amount,
            house: contrib.house_number || 'N/A'
          });
          voteHeadReports[col][date].houses.add(contrib.house_number || 'N/A');
        }
      });
    });

    // Convert to array format and sort by date
    const result = {};
    voteHeadColumns.forEach(col => {
      result[col] = Object.values(voteHeadReports[col])
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return result;
  };

  // Generate Monthly Report - Group contributions by month
  const generateMonthlyReport = () => {
    const monthlyData = {};

    allContributions.forEach(contrib => {
      const date = new Date(contrib.date || new Date());
      const monthKey = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {};
        voteHeadColumns.forEach(col => {
          monthlyData[monthKey][col] = 0;
        });
      }
      voteHeadColumns.forEach(col => {
        monthlyData[monthKey][col] += parseFloat(contrib[col]) || 0;
      });
    });

    return Object.entries(monthlyData).map(([month, totals]) => ({
      month,
      ...totals,
      total: voteHeadColumns.reduce((sum, col) => sum + totals[col], 0)
    }));
  };

  // Generate Yearly Report - Group contributions by year
  const generateYearlyReport = () => {
    const yearlyData = {};

    allContributions.forEach(contrib => {
      const date = new Date(contrib.date || new Date());
      const year = date.getFullYear().toString();

      if (!yearlyData[year]) {
        yearlyData[year] = {};
        voteHeadColumns.forEach(col => {
          yearlyData[year][col] = 0;
        });
      }
      voteHeadColumns.forEach(col => {
        yearlyData[year][col] += parseFloat(contrib[col]) || 0;
      });
    });

    return Object.entries(yearlyData).map(([year, totals]) => ({
      year,
      ...totals,
      total: voteHeadColumns.reduce((sum, col) => sum + totals[col], 0)
    })).sort((a, b) => b.year - a.year);
  };

  // Generate Individual Member Report
  const generateIndividualMemberReport = (memberId) => {
    if (!memberId) return null;

    const memberContributions = allContributions.filter(contrib => contrib.member_id === parseInt(memberId));
    const memberData = members.find(m => m.id === parseInt(memberId));

    if (memberContributions.length === 0) {
      return {
        member: memberData,
        contributions: [],
        totals: {},
        grandTotal: 0
      };
    }

    // Calculate totals for each vote head
    const totals = {};
    voteHeadColumns.forEach(col => {
      totals[col] = memberContributions.reduce((sum, contrib) => sum + (parseFloat(contrib[col]) || 0), 0);
    });

    const grandTotal = voteHeadColumns.reduce((sum, col) => sum + totals[col], 0);

    return {
      member: memberData,
      contributions: memberContributions.sort((a, b) => new Date(b.date) - new Date(a.date)),
      totals,
      grandTotal
    };
  };

  // Short labels for table headers
  const voteHeadShortLabels = {
    reg: 'REG',
    entry: 'ENTRY',
    card: 'CARD',
    shar: 'SHAR',
    savi: 'SAVI',
    admn: 'ADMN',
    s_fund: 'S/FUND',
    fine: 'FINE',
    loans: 'LOANS',
    interest: 'INT',
    unif: 'UNIF',
    merr: 'MERR',
    anniv: 'ANNIV',
    sindi: 'SINDI',
    meal: 'MEAL',
    jikon: 'JIKON',
    beneev: 'BENEEV',
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
        {isAdmin && (
          <button className="add-member-btn" onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({});
          }}>
            {showForm ? '✕ Cancel' : '+ Add Contribution'}
          </button>
        )}
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Report
        </button>
      </div>

      {/* Report Tabs */}
      <div className="report-tabs">
        <button
          className={`tab-btn ${activeTab === 'house' ? 'active' : ''}`}
          onClick={() => setActiveTab('house')}
        >
          House Contributions
        </button>
        <button
          className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Report
        </button>
        <button
          className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Report
        </button>
        <button
          className={`tab-btn ${activeTab === 'yearly' ? 'active' : ''}`}
          onClick={() => setActiveTab('yearly')}
        >
          Yearly Report
        </button>
        {isAdmin && (
          <button
            className={`tab-btn ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual Member Report
          </button>
        )}
      </div>

      {/* Add/Edit Contribution Form */}
      {showForm && (
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
        {/* House Contributions View */}
        {activeTab === 'house' && (
          <>
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
                    {voteHeadShortLabels[col]}
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
                    {isAdmin && (
                      <td className="col-actions">
                        <button className="edit-btn" onClick={() => handleEdit(contribution)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(contribution.id)}>Delete</button>
                      </td>
                    )}
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
          </>
        )}

        {/* Daily Report View with Sub-Reports for Each Vote Head */}
        {activeTab === 'daily' && (
          <>
            {generateDailyReport().length === 0 ? (
              <div className="empty-state">
                <p>No contributions recorded</p>
              </div>
            ) : (
              <div className="daily-reports-container">
                {/* Summary Table */}
                <div className="daily-summary-section">
                  <h3 className="report-section-title">Daily Summary</h3>
                  <table className="contributions-matrix-table">
                    <thead>
                      <tr className="header-row-1">
                        <th className="col-sno">Date</th>
                        {voteHeadColumns.map((col) => (
                          <th key={col} className="vote-head-col">
                            {voteHeadShortLabels[col]}
                          </th>
                        ))}
                        <th className="col-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateDailyReport().map((dayReport, index) => (
                        <tr key={index} className="data-row">
                          <td className="col-sno">{dayReport.date}</td>
                          {voteHeadColumns.map((col) => (
                            <td key={col} className="vote-head-col amount">
                              {dayReport[col] > 0 ? dayReport[col].toLocaleString() : '-'}
                            </td>
                          ))}
                          <td className="col-total amount">{dayReport.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="totals-row">
                        <td className="totals-label">TOTAL</td>
                        {voteHeadColumns.map((col) => {
                          const colTotal = generateDailyReport().reduce((sum, day) => sum + day[col], 0);
                          return (
                            <td key={col} className="vote-head-col amount total">
                              {colTotal.toLocaleString()}
                            </td>
                          );
                        })}
                        <td className="col-total amount total">
                          {generateDailyReport().reduce((sum, day) => sum + day.total, 0).toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Sub-Reports for Each Vote Head */}
                {voteHeadColumns.map((voteHead) => {
                  const voteHeadData = generateDailyVoteHeadReports()[voteHead];
                  const hasData = voteHeadData && voteHeadData.length > 0;

                  return (
                    <div key={voteHead} className="vote-head-sub-report">
                      <h3 className="report-section-title">{voteHeadLabels[voteHead]} ({voteHeadShortLabels[voteHead]})</h3>
                      {!hasData ? (
                        <p className="no-data-message">No contributions recorded for this vote head</p>
                      ) : (
                        <table className="contributions-matrix-table sub-report-table">
                          <thead>
                            <tr className="header-row-1">
                              <th className="col-sno">Date</th>
                              <th className="col-name">Member Name</th>
                              {voteHead === 'merr' && <th className="col-house">House No.</th>}
                              <th className="col-amount">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {voteHeadData.map((dayData, dayIndex) => (
                              <React.Fragment key={dayIndex}>
                                <tr className="date-header-row">
                                  <td colSpan={voteHead === 'merr' ? 4 : 3} className="date-header">
                                    <strong>{dayData.date}</strong> - Total: {dayData.amount.toLocaleString()}
                                  </td>
                                </tr>
                                {dayData.members.map((member, memberIndex) => (
                                  <tr key={memberIndex} className="data-row">
                                    <td className="col-sno"></td>
                                    <td className="col-name">{member.name}</td>
                                    {voteHead === 'merr' && <td className="col-house">{member.house}</td>}
                                    <td className="col-amount amount">{member.amount.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="totals-row">
                              <td colSpan={voteHead === 'merr' ? 3 : 2} className="totals-label">TOTAL</td>
                              <td className="col-amount amount total">
                                {voteHeadData.reduce((sum, day) => sum + day.amount, 0).toLocaleString()}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Monthly Report View */}
        {activeTab === 'monthly' && (
          <>
            {generateMonthlyReport().length === 0 ? (
              <div className="empty-state">
                <p>No contributions recorded</p>
              </div>
            ) : (
              <table className="contributions-matrix-table">
                <thead>
                  <tr className="header-row-1">
                    <th className="col-sno">Month</th>
                    {voteHeadColumns.map((col) => (
                      <th key={col} className="vote-head-col">
                        {voteHeadShortLabels[col]}
                      </th>
                    ))}
                    <th className="col-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {generateMonthlyReport().map((monthReport, index) => (
                    <tr key={index} className="data-row">
                      <td className="col-sno">{monthReport.month}</td>
                      {voteHeadColumns.map((col) => (
                        <td key={col} className="vote-head-col amount">
                          {monthReport[col] > 0 ? monthReport[col].toLocaleString() : '-'}
                        </td>
                      ))}
                      <td className="col-total amount">{monthReport.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="totals-row">
                    <td className="totals-label">TOTAL</td>
                    {voteHeadColumns.map((col) => {
                      const colTotal = generateMonthlyReport().reduce((sum, month) => sum + month[col], 0);
                      return (
                        <td key={col} className="vote-head-col amount total">
                          {colTotal.toLocaleString()}
                        </td>
                      );
                    })}
                    <td className="col-total amount total">
                      {generateMonthlyReport().reduce((sum, month) => sum + month.total, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </>
        )}

        {/* Yearly Report View */}
        {activeTab === 'yearly' && (
          <>
            {generateYearlyReport().length === 0 ? (
              <div className="empty-state">
                <p>No contributions recorded</p>
              </div>
            ) : (
              <table className="contributions-matrix-table">
                <thead>
                  <tr className="header-row-1">
                    <th className="col-sno">Year</th>
                    {voteHeadColumns.map((col) => (
                      <th key={col} className="vote-head-col">
                        {voteHeadShortLabels[col]}
                      </th>
                    ))}
                    <th className="col-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {generateYearlyReport().map((yearReport, index) => (
                    <tr key={index} className="data-row">
                      <td className="col-sno">{yearReport.year}</td>
                      {voteHeadColumns.map((col) => (
                        <td key={col} className="vote-head-col amount">
                          {yearReport[col] > 0 ? yearReport[col].toLocaleString() : '-'}
                        </td>
                      ))}
                      <td className="col-total amount">{yearReport.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="totals-row">
                    <td className="totals-label">TOTAL</td>
                    {voteHeadColumns.map((col) => {
                      const colTotal = generateYearlyReport().reduce((sum, year) => sum + year[col], 0);
                      return (
                        <td key={col} className="vote-head-col amount total">
                          {colTotal.toLocaleString()}
                        </td>
                      );
                    })}
                    <td className="col-total amount total">
                      {generateYearlyReport().reduce((sum, year) => sum + year.total, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </>
        )}

        {/* Individual Member Report View */}
        {activeTab === 'individual' && isAdmin && (
          <>
            <div className="individual-report-controls">
              <label htmlFor="member-select">Select Member:</label>
              <select
                id="member-select"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="member-select"
              >
                <option value="">-- Choose a Member --</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.full_name} (ID: {member.id})
                  </option>
                ))}
              </select>
            </div>

            {selectedMemberId && generateIndividualMemberReport(selectedMemberId) ? (
              <>
                {(() => {
                  const report = generateIndividualMemberReport(selectedMemberId);
                  return (
                    <div className="individual-report-container">
                      <div className="member-info-section">
                        <h3>Member Information</h3>
                        <div className="member-info-grid">
                          <div className="info-item">
                            <label>Name:</label>
                            <span>{report.member?.full_name || 'N/A'}</span>
                          </div>
                          <div className="info-item">
                            <label>Member ID:</label>
                            <span>{report.member?.id || 'N/A'}</span>
                          </div>
                          <div className="info-item">
                            <label>Email:</label>
                            <span>{report.member?.email || 'N/A'}</span>
                          </div>
                          <div className="info-item">
                            <label>Phone:</label>
                            <span>{report.member?.phone || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {report.contributions.length === 0 ? (
                        <div className="empty-state">
                          <p>No contributions recorded for this member</p>
                        </div>
                      ) : (
                        <>
                          {/* Contribution Summary */}
                          <div className="contribution-summary-section">
                            <h3>Contribution Summary</h3>
                            <table className="contributions-matrix-table">
                              <thead>
                                <tr className="header-row-1">
                                  {voteHeadColumns.map((col) => (
                                    <th key={col} className="vote-head-col">
                                      {voteHeadShortLabels[col]}
                                    </th>
                                  ))}
                                  <th className="col-total">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="data-row">
                                  {voteHeadColumns.map((col) => (
                                    <td key={col} className="vote-head-col amount">
                                      {report.totals[col] > 0 ? report.totals[col].toLocaleString() : '-'}
                                    </td>
                                  ))}
                                  <td className="col-total amount">{report.grandTotal.toLocaleString()}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Detailed Contributions */}
                          <div className="detailed-contributions-section">
                            <h3>Detailed Contributions</h3>
                            <table className="contributions-matrix-table">
                              <thead>
                                <tr className="header-row-1">
                                  <th className="col-sno">Date</th>
                                  {voteHeadColumns.map((col) => (
                                    <th key={col} className="vote-head-col">
                                      {voteHeadShortLabels[col]}
                                    </th>
                                  ))}
                                  <th className="col-total">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {report.contributions.map((contrib, index) => {
                                  const rowTotal = voteHeadColumns.reduce((sum, col) => sum + (parseFloat(contrib[col]) || 0), 0);
                                  return (
                                    <tr key={index} className="data-row">
                                      <td className="col-sno">{contrib.date || 'N/A'}</td>
                                      {voteHeadColumns.map((col) => (
                                        <td key={col} className="vote-head-col amount">
                                          {contrib[col] > 0 ? parseFloat(contrib[col]).toLocaleString() : '-'}
                                        </td>
                                      ))}
                                      <td className="col-total amount">{rowTotal.toLocaleString()}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                              <tfoot>
                                <tr className="totals-row">
                                  <td className="totals-label">TOTAL</td>
                                  {voteHeadColumns.map((col) => {
                                    const colTotal = report.contributions.reduce((sum, contrib) => sum + (parseFloat(contrib[col]) || 0), 0);
                                    return (
                                      <td key={col} className="vote-head-col amount total">
                                        {colTotal.toLocaleString()}
                                      </td>
                                    );
                                  })}
                                  <td className="col-total amount total">
                                    {report.contributions.reduce((sum, contrib) => {
                                      const rowTotal = voteHeadColumns.reduce((s, col) => s + (parseFloat(contrib[col]) || 0), 0);
                                      return sum + rowTotal;
                                    }, 0).toLocaleString()}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="empty-state">
                <p>Please select a member to view their contribution report</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Contributions;


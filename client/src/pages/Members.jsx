import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import '../styles/Members.css';

const Members = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
  });

  useEffect(() => {
    fetchMembers();
  }, [token]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.getMembers(token);
      setMembers(response.members || response.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await api.updateMember(editingId, formData, token);
        if (response.member || response.message) {
          setEditingId(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            idNumber: '',
          });
          setShowForm(false);
          fetchMembers();
          alert('Member updated successfully!');
        } else if (response.error) {
          alert('Error: ' + response.error);
        }
      } else {
        const response = await api.createMember(formData, token);
        if (response.member || response.message) {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            idNumber: '',
          });
          setShowForm(false);
          fetchMembers();
          alert('Member created successfully!');
        } else if (response.error) {
          alert('Error: ' + response.error);
        }
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member: ' + error.message);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      idNumber: member.idNumber,
    });
    setShowForm(true);
  };

  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await api.deleteMember(memberId, token);
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  return (
    <div className="members-container">
      <div className="page-header">
        <h1>Member Management</h1>
        <p>Manage and track all welfare group members</p>
      </div>

      <div className="members-controls">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => {
          setEditingId(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            idNumber: '',
          });
          setShowForm(!showForm);
        }} className="add-member-btn">
          {showForm ? '✕ Cancel' : '+ Add New Member'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="member-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-btn">Create Member</button>
        </form>
      )}

      {loading ? (
        <p>Loading members...</p>
      ) : filteredMembers.length === 0 ? (
        <div className="empty-state">
          <p>No members found</p>
        </div>
      ) : (
        <div className="members-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>ID Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member._id}>
                  <td>{member.firstName} {member.lastName}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.idNumber}</td>
                  <td><span className={`status-${member.status || 'active'}`}>{member.status || 'Active'}</span></td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(member)} className="action-edit">Edit</button>
                    <button onClick={() => handleDelete(member._id)} className="action-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Members;


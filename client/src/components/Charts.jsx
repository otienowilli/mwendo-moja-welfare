import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

export const MembersChart = ({ data }) => {
  const chartData = [
    { name: 'Active', value: data.active || 0 },
    { name: 'Inactive', value: data.inactive || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const ContributionsChart = ({ data }) => {
  const chartData = data.slice(-12).map((item, index) => ({
    month: `Month ${index + 1}`,
    amount: item.amount || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#667eea"
          strokeWidth={2}
          dot={{ fill: '#667eea', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const LoansChart = ({ data }) => {
  const statusCounts = {
    pending: data.filter(l => l.status === 'pending').length,
    approved: data.filter(l => l.status === 'approved').length,
    rejected: data.filter(l => l.status === 'rejected').length,
    repaid: data.filter(l => l.status === 'repaid').length,
  };

  const chartData = [
    { name: 'Pending', value: statusCounts.pending },
    { name: 'Approved', value: statusCounts.approved },
    { name: 'Rejected', value: statusCounts.rejected },
    { name: 'Repaid', value: statusCounts.repaid },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#667eea" name="Count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default { MembersChart, ContributionsChart, LoansChart };


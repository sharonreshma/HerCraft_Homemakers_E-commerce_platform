import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { useSpring, animated } from '@react-spring/web';
import '../styles/cat.css';

const Cat = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

  const lineData = [
    { name: 'Jan', Sales: 4000, Orders: 2400 },
    { name: 'Feb', Sales: 3000, Orders: 1398 },
    { name: 'Mar', Sales: 2000, Orders: 9800 },
    { name: 'Apr', Sales: 2780, Orders: 3908 },
    { name: 'May', Sales: 1890, Orders: 4800 },
    { name: 'Jun', Sales: 2390, Orders: 3800 },
    { name: 'Jul', Sales: 3490, Orders: 4300 },
  ];

  const pieData = [
    { name: 'Sales', value: 400 },
    { name: 'Marketing', value: 300 },
    { name: 'Development', value: 300 },
    { name: 'Customer Support', value: 200 },
  ];

  const COLORS = ['#ffcccc', '#f5a5a5', '#e89c9c', '#ff6b6b'];

  const barData = [
    { name: 'Q1', Sales: 4000, Marketing: 2400 },
    { name: 'Q2', Sales: 3000, Marketing: 1398 },
    { name: 'Q3', Sales: 2000, Marketing: 9800 },
    { name: 'Q4', Sales: 2780, Marketing: 3908 },
  ];

  const radarData = [
    { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
    { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
    { subject: 'Development', A: 86, B: 130, fullMark: 150 },
    { subject: 'Customer Support', A: 99, B: 100, fullMark: 150 },
    { subject: 'HR', A: 85, B: 90, fullMark: 150 },
  ];

  return (
    <animated.div style={fade} className="dashboard-container">
      <h2 className="title">HerCraft Statistical Analysis Dashboard </h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>$50,000</p>
        </div>
        <div className="stat-card">
          <h3>Active Sellers</h3>
          <p>1,200</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>5,400</p>
        </div>
        <div className="stat-card">
          <h3>New Users</h3>
          <p>350</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-left">
          <div className="chart-container mb-4">
            <h3>Sales and Orders Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#ff6b6b" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Orders" stroke="#54a0ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container mb-4">
            <h3>Quarterly Sales and Marketing</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sales" fill="#ffcccc" />
                <Bar dataKey="Marketing" fill="#f5a5a5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-right">
          <div className="chart-container mb-4">
            <h3>Departmental Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Performance A" dataKey="A" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.6} />
                <Radar name="Performance B" dataKey="B" stroke="#54a0ff" fill="#54a0ff" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default Cat;

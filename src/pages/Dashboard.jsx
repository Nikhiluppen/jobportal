import React, { useMemo, useState } from 'react';
import jobsData from '../data/jobs_data.json';
import './Dashboard.css';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#AF19FF', '#FF4560', '#00A6ED', '#E3008C'
];

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchState = selectedState === "All" || job.State_Column === selectedState;
      const matchLevel = selectedLevel === "All" || job.job_level === selectedLevel;
      const matchCategory = selectedCategory === "All" || job.Category === selectedCategory;
      return matchState && matchLevel && matchCategory;
    });
  }, [selectedState, selectedLevel, selectedCategory]);

  const countByField = (field) => {
    const counts = {};
    filteredJobs.forEach(job => {
      const value = job[field] || 'Other';
      counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const categoryData = useMemo(() => {
    const counts = jobsData.reduce((acc, job) => {
      const cat = job.Category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }, []);

  const stackedData = useMemo(() => {
    const skillCounts = jobsData.flatMap(j => j.job_skills?.split(',').map(s => s.trim()) || [])
      .reduce((acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      }, {});
    const top3 = Object.entries(skillCounts)
      .sort((a,b) => b[1] - a[1])
      .slice(0,3)
      .map(([skill]) => skill);

    const byLoc = {};
    jobsData.forEach(job => {
      const loc = job.job_location || 'Unknown';
      byLoc[loc] = byLoc[loc] || { location: loc };
      const skills = job.job_skills?.split(',').map(s => s.trim()) || [];
      top3.forEach(skill => {
        byLoc[loc][skill] = (byLoc[loc][skill] || 0) + (skills.includes(skill) ? 1 : 0);
      });
    });
    return Object.values(byLoc);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="title">📊 Skill-Based Job Dashboard</h1>

      {/* Filters */}
      <div className="filters">
        <select onChange={e => setSelectedState(e.target.value)} value={selectedState}>
          <option>All</option><option>TX</option><option>MO</option><option>Other</option>
        </select>
        <select onChange={e => setSelectedLevel(e.target.value)} value={selectedLevel}>
          <option>All</option><option>Mid senior</option><option>Associate</option>
        </select>
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option>All</option>
          <option>Backend Development</option>
          <option>Data Science</option>
          <option>Frontend Development</option>
          <option>Cloud Security</option>
          <option>Full-Stack</option>
        </select>
      </div>

      {/* Bar Chart: Job Type */}
      <h2>Job Count by Type</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={countByField("job_type")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      
      

      {/* Line Chart: Job by Location */}
      <h2>Job Count by Location</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={countByField("job_location")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#00C49F" />
        </LineChart>
      </ResponsiveContainer>

      {/* Table: Job Count by Company */}
      <h2>Top Companies Hiring</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Count</th>
          </tr>
        </thead>
        <tbody>
          {countByField("company")
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
            .map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Extra Charts: Jobs by Category */}
      <section className="chart-section">
        <h2>Jobs by Category (Pie)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categoryData.map((_, idx) => (
                <Cell key={`pie-cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={v => [`${v}`, 'Jobs']} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      /* <section className="chart-section">
        <h2>Jobs by Category (Line)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Jobs" 
              stroke={COLORS[1]} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </section> */

      <section className="chart-section">
        <h2>Jobs by Category (Bar)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Jobs" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Stacked Bar: Top Skills by Location */}
      <section className="chart-section">
        <h2>Top 3 Skills by Location (Stacked)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stackedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(stackedData[0] || {})
              .filter(k => k !== 'location')
              .map((skill, i) => (
                <Bar 
                  key={`stack-${i}`}
                  dataKey={skill}
                  stackId="a"
                  name={skill}
                  fill={COLORS[(i+4) % COLORS.length]} 
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Dashboard;

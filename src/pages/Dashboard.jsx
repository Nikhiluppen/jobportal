import React, { useMemo } from 'react';
import jobsData from '../data/jobs_data.json';
import './Dashboard.css';


import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#AF19FF', '#FF4560', '#00A6ED', '#E3008C'
];

export default function Dashboard() {
  // 1) Jobs by Category (for Pie, Bar & Line)
  const categoryData = useMemo(() => {
    const counts = jobsData.reduce((acc, job) => {
      const cat = job.Category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }, []);

  // 2) Top 3 Skills by Location (Stacked Bar)
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

  // 3) Job Types (Pie)
  const jobTypeData = useMemo(() => {
    const counts = jobsData.reduce((acc, job) => {
      const type = job.job_type || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([job_type, count]) => ({ job_type, count }));
  }, []);

  // 4) Job Levels (Bar)
  const jobLevelData = useMemo(() => {
    const counts = jobsData.reduce((acc, job) => {
      const lvl = job.job_level || 'Unknown';
      acc[lvl] = (acc[lvl] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([job_level, count]) => ({ job_level, count }));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Jobs Dashboard</h1>

      {/* Pie: Jobs by Category */}
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

      {/* Line: Jobs by Category */}
      <section className="chart-section">
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
      </section>

      {/* Bar: Jobs by Category */}
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

      {/* Pie: Job Types */}
      <section className="chart-section">
        <h2>Job Types Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={jobTypeData}
              dataKey="count"
              nameKey="job_type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={(entry) => entry.job_type}
            >
              {jobTypeData.map((_, idx) => (
                <Cell key={`type-cell-${idx}`} fill={COLORS[(idx+2) % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={v => [`${v}`, 'Jobs']} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Bar: Job Levels */}
      <section className="chart-section">
        <h2>Job Levels Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobLevelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="job_level" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Jobs" fill={COLORS[3]} />
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
              ))
            }
          </BarChart>
        </ResponsiveContainer>
      </section>

      <style>{`
        .dashboard-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: #f9f9f9;
        }
        h1 {
          text-align: center;
          margin-bottom: 1rem;
        }
        .chart-section {
          background: #fff;
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .chart-section h2 {
          text-align: center;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}


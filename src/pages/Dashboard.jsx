import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/job_data.json'; 
import {
  ResponsiveContainer,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import './home.css';

export default function Dashboard() {
  // count jobs per category
  const categoryData = useMemo(() => {
    const counts = jobsData.reduce((acc, job) => {
      const cat = job.Category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }, []);

  // prepare stacked data for top 3 skills by location
  const stackedData = useMemo(() => {
    const skillCounts = jobsData.flatMap(j => (j.job_skills||'').split(',').map(s=>s.trim()))
      .reduce((acc, skill) => {
        if (!skill) return acc;
        acc[skill] = (acc[skill]||0)+1;
        return acc;
      }, {});
    const top3 = Object.entries(skillCounts)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,3)
      .map(([skill])=>skill);

    const byLoc = {};
    jobsData.forEach(job => {
      const loc = job.job_location || 'Unknown';
      byLoc[loc] = byLoc[loc] || { location: loc };
      const skills = (job.job_skills||'').split(',').map(s=>s.trim());
      top3.forEach(skill => {
        byLoc[loc][skill] = (byLoc[loc][skill]||0) + (skills.includes(skill) ? 1 : 0);
      });
    });
    return Object.values(byLoc);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar (same as HomePage) */}
      <nav className="navbar">
        <div className="logo">JobBoard</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/candidates">Candidates</Link></li>
          <li><Link to="/savedjobs">SavedJobs</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/jobboard">JobBoard</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>

      <h1>Jobs Dashboard</h1>

      {/* Jobs by Category */}
      <section className="chart-section">
        <h2>Jobs by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="category"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="count" name="Jobs" fill="#8884d8"/>
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Top 3 Skills by Location */}
      <section className="chart-section">
        <h2>Top 3 Skills by Location</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stackedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="location"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            {Object.keys(stackedData[0]||{})
              .filter(key => key !== 'location')
              .map((skill, i) => (
                <Bar key={skill} dataKey={skill} stackId="a" name={skill}/>
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
        .navbar {
          display: flex;
          align-items: center;
          padding: 0 20px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          margin-right: 2rem;
        }
        .nav-links {
          list-style: none;
          display: flex;
          flex: 1;
          margin: 0;
          padding: 0;
        }
        .nav-links li {
          margin-right: 1rem;
        }
        .nav-links a {
          text-decoration: none;
          color: #333;
          padding: 0.5rem;
        }
        .nav-links a:hover {
          background: #eef3f8;
          border-radius: 4px;
        }
        .signup-btn {
          background: #0073b1;
          color: #fff !important;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
        }
        h1 {
          text-align: center;
          margin-top: 1rem;
        }
        .chart-section {
          background: #fff;
          padding: 1rem;
          margin: 2rem 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .chart-section h2 {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

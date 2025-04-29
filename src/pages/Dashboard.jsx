import React, { useMemo, useState } from 'react';
import jobsData from '../data/jobs_data.json';
import './Dashboard.css';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#AF19FF', '#FF4560', '#00A6ED', '#E3008C'
];

export default function Dashboard() {
  // Multi-select filter state
  const [states, setStates] = useState([]);
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  // Enrich jobs with state code and skills array
  const jobs = useMemo(() => jobsData.map(job => {
    const loc = job.job_location || '';
    const match = loc.match(/,?\s*([A-Z]{2})$/);
    const state = match ? match[1] : 'Other';
    const skillsList = (job.job_skills || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    return { ...job, state, skills: skillsList };
  }), []);

  // Options for each filterwqeeqe2e12weq s dropdown
  const stateOptions = useMemo(() => Array.from(new Set(jobs.map(j => j.state))), [jobs]);
  const levelOptions = useMemo(() => Array.from(new Set(jobs.map(j => j['job level'] || 'Other'))), [jobs]);
  const categoryOptions = useMemo(() => Array.from(new Set(jobs.map(j => j.Category || 'Other'))), [jobs]);
  const skillOptions = useMemo(() => Array.from(new Set(jobs.flatMap(j => j.skills))).sort(), [jobs]);

  // Apply multi-select filters
  const filtered = useMemo(() => jobs.filter(job => {
    const okState = !states.length || states.includes(job.state);
    const okLevel = !levels.length || levels.includes(job['job level']);
    const okCat = !categories.length || categories.includes(job.Category);
    const okSkill = !skills.length || job.skills.some(s => skills.includes(s));
    return okState && okLevel && okCat && okSkill;
  }), [jobs, states, levels, categories, skills]);

  // Helper to count by any field
  const countByField = field => Object.entries(
    filtered.reduce((acc, job) => {
      const key = job[field] || 'Other';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Chart datasets
  const categoryData = useMemo(() => countByField('Category'), [filtered]);
  const companyData  = useMemo(() => countByField('company'), [filtered]);
  const stackedData = useMemo(() => {
    const allSkills = filtered.flatMap(j => j.skills);
    const top3 = Object.entries(
      allSkills.reduce((acc, s) => ({ ...acc, [s]: (acc[s] || 0) + 1 }), {})
    )
      .sort(([,a],[,b]) => b - a)
      .slice(0, 3)
      .map(([s]) => s);

    const byLoc = {};
    filtered.forEach(job => {
      const loc = job.job_location || 'Unknown';
      byLoc[loc] = byLoc[loc] || { location: loc };
      top3.forEach(skill => {
        byLoc[loc][skill] = (byLoc[loc][skill] || 0) + (job.skills.includes(skill) ? 1 : 0);
      });
    });
    return Object.values(byLoc);
  }, [filtered]);

  return (
    <div className="dashboard-container">
      <h1 className="title">📊 Skill-Based Job Dashboard</h1>

      {/* Filters */}
      <div className="filters">
        <Autocomplete
          multiple options={stateOptions} value={states} onChange={(_, v) => setStates(v)}
          disableCloseOnSelect getOptionLabel={opt => opt}
          renderOption={(props, opt, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {opt}
            </li>
          )}
          renderInput={params => <TextField {...params} label="States" placeholder="Select states" />}
          style={{ minWidth: 180 }}
        />
        <Autocomplete
          multiple options={levelOptions} value={levels} onChange={(_, v) => setLevels(v)}
          disableCloseOnSelect getOptionLabel={opt => opt}
          renderOption={(props, opt, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {opt}
            </li>
          )}
          renderInput={params => <TextField {...params} label="Levels" placeholder="Select levels" />}
          style={{ minWidth: 180 }}
        />
        <Autocomplete
          multiple options={categoryOptions} value={categories} onChange={(_, v) => setCategories(v)}
          disableCloseOnSelect getOptionLabel={opt => opt}
          renderOption={(props, opt, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {opt}
            </li>
          )}
          renderInput={params => <TextField {...params} label="Categories" placeholder="Select categories" />}
          style={{ minWidth: 180 }}
        />
        <Autocomplete
          multiple options={skillOptions} value={skills} onChange={(_, v) => setSkills(v)}
          disableCloseOnSelect getOptionLabel={opt => opt}
          renderOption={(props, opt, { selected }) => (
            <li {...props}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
              {opt}
            </li>
          )}
          renderInput={params => <TextField {...params} label="Skills" placeholder="Select skills" />}
          style={{ minWidth: 240 }}
        />
      </div>

      {/* Job Count by Type */}
      <section className="chart-section job-type-chart">
        <h2>Job Count by Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={countByField('job_type')}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={COLORS[0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Job Count by Location */}
      <section className="chart-section job-location-chart">
        <h2>Job Count by Location</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={countByField('job_location')}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={COLORS[1]} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Top Companies Hiring */}
      <section className="chart-section companies-chart">
        <h2>Top Companies Hiring</h2>
        <table className="data-table">
          <thead>
            <tr><th>Company</th><th>Count</th></tr>
          </thead>
          <tbody>
            {companyData
              .sort((a, b) => b.value - a.value)
              .slice(0, 10)
              .map((it, i) => (
                <tr key={i}><td>{it.name}</td><td>{it.value}</td></tr>
              ))}
          </tbody>
        </table>
      </section>

      {/* Jobs by Category (Pie) */}
      <section className="chart-section category-pie-chart">
        <h2>Jobs by Category (Pie)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={value => [value, 'Jobs']} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Jobs by Category (Bar) */}
      <section className="chart-section category-bar-chart">
        <h2>Jobs by Category (Bar)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={COLORS[2]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Top 3 Skills by Location (Stacked) */}
      <section className="chart-section skills-stacked-chart">
        <h2>Top 3 Skills by Location (Stacked)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={stackedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Legend />
            {stackedData[0] &&
              Object.keys(stackedData[0])
                .filter(k => k !== 'location')
                .map((skill, i) => (
                  <Bar key={skill} dataKey={skill} stackId="a" name={skill} fill={COLORS[i % COLORS.length]} />
                ))
            }
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

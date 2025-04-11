import React, { useState } from 'react';
import { Link } from "react-router-dom";
import jobsData from '../data/jobs_data.json';
import './JobSearch.css'; // Import CSS here

const JobSearch = () => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearch = () => {
    const results = jobsData.filter((job) => {
      const skillMatch = skill
        ? job.job_skills.toLowerCase().includes(skill.toLowerCase())
        : true;

      const locationMatch = location
        ? job.job_location.toLowerCase().includes(location.toLowerCase())
        : true;

      return (skill || location) && skillMatch && locationMatch;
    });

    setFilteredJobs(results);
  };

  return (
    <div className="job-search-container">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Skill (e.g., Python, AWS)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Location (e.g., Austin, Remote)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="job-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="job-listings">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.job_link} className="job-card">
              <h3>{job.job_title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.job_location}</p>
              <p><strong>Skills:</strong> {job.job_skills}</p>
              <Link
                to={`/job/${encodeURIComponent(job.job_link)}`}
              >
                View & Apply
              </Link>
            </div>
          ))
        ) : (
          <p className="message-no-jobs">
            Enter skill or location and click Search to find jobs.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobSearch;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../data/jobs_data.json';
import './JobSearch.css';

const JobSearch = () => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearch = () => {
    const results = jobsData.filter((job) => {
      const skillMatch = job.job_skills?.toLowerCase().includes(skill.toLowerCase());
      const locationMatch = job.job_location?.toLowerCase().includes(location.toLowerCase());
      return skillMatch && locationMatch;
    });
    setFilteredJobs(results);
  };

  const handleSaveJob = (job) => {
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const alreadySaved = saved.some(
      (j) => j.job_link === job.job_link || j.job_title === job.job_title
    );

    if (!alreadySaved) {
      saved.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(saved));
      alert("Job saved successfully!");
    } else {
      alert("Job already saved.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Jobs</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Skill (e.g., Python)"
          className="border px-3 py-2 rounded w-full"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (e.g., Austin)"
          className="border px-3 py-2 rounded w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="border p-4 rounded shadow mb-4">
              <h3 className="font-semibold">{job.job_title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.job_location}</p>
              <p><strong>Skills:</strong> {job.job_skills}</p>

              <div className="flex gap-4 mt-3">
                {/* ✅ View and Apply */}
                <a
                  href={job.job_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  View & Apply
                </a>

                {/* ✅ Save for Later */}
                <button
                  className="bg-yellow-500 text-black px-4 py-2 rounded"
                  onClick={() => handleSaveJob(job)}
                >
                  Save & Apply Later
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No jobs to show. Try a search.</p>
        )}
      </div>
    </div>
  );
};

export default JobSearch;

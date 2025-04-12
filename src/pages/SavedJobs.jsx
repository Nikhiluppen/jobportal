import React, { useEffect, useState } from 'react';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(saved);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        savedJobs.map((job, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <h3 className="font-semibold">{job.job_title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.job_location}</p>
            <p><strong>Skills:</strong> {job.job_skills}</p>
            <a
              href={job.job_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View & Apply
            </a>
          </div>
        ))
      ) : (
        <p>No saved jobs found.</p>
      )}
    </div>
  );
};

export default SavedJobs;

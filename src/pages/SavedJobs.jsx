import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(jobs);
  }, []);

  const handleRemove = (job_link) => {
    const updated = savedJobs.filter((j) => j.job_link !== job_link);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        savedJobs.map((job, index) => (
          <div key={index} className="border rounded p-4 mb-4">
            <h3>{job.job_title || job.Title}</h3>
            <p><strong>Company:</strong> {job.company || job["Company Name"]}</p>
            <p><strong>Location:</strong> {job.job_location || job.Location}</p>
            <Link to={`/job/${encodeURIComponent(job.job_link || job["Detail URL"])}`} className="text-blue-500 underline">View & Apply</Link>
            <button
              onClick={() => handleRemove(job.job_link || job["Detail URL"])}
              className="ml-4 text-red-600"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No saved jobs.</p>
      )}
    </div>
  );
};

export default SavedJobs;

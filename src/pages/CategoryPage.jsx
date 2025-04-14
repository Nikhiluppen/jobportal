import React from 'react';
import { useParams } from 'react-router-dom';
import jobs from '../data/jobs_data.json'; // Ensure this file exists and uses "Category", "job_title", etc.

const CategoryPage = () => {
  const { category } = useParams();

  // Convert "cloud-security" → "Cloud Security"
  const normalizedCategory = category.replace(/-/g, ' ').toLowerCase();

  // Filter jobs where the category matches
  const filteredJobs = jobs.filter(
    (job) => job.Category?.toLowerCase() === normalizedCategory
  );

  return (
    <div className="category-container">
      <h1 className="category-title">{normalizedCategory}</h1>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.job_title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Skills:</strong> {job.job_skills}</p>
              <p><strong>Location:</strong> {job.job_location}</p>
              <p><strong>Summary:</strong> {job.job_summary}</p>
              <a
                href={job.job_link}
                className="apply-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p>No jobs available in this category.</p>
        )}
      </div>

      {/* Embedded CSS Styling */}
      <style>{`
        .category-container {
          padding: 2rem;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          min-height: 100vh;
        }

        .category-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-transform: capitalize;
          color: #333;
        }

        .job-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .job-card {
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .job-card h3 {
          margin-bottom: 0.5rem;
          color: #222;
        }

        .job-card p {
          margin: 0.3rem 0;
          color: #444;
        }

        .apply-btn {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .apply-btn:hover {
          background-color: #1e40af;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;

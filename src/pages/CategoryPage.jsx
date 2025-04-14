import React from 'react';
import { useParams } from 'react-router-dom';
import jobs from '../data/jobs_data.json'; // Your actual JSON file

const CategoryPage = () => {
  const { category } = useParams();
  const normalizedCategory = category.replace(/-/g, ' ').toLowerCase();

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

      <style>{`
        .category-container {
          padding: 2rem;
          font-family: Arial, sans-serif;
        }

        .category-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;ss
          text-transform: capitalize;
        }

        .job-list {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .job-card {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 8px rgba(0,0,0,0.05);
        }

        .apply-btn {
          margin-top: 0.5rem;
          display: inline-block;
          background-color: #2563eb;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          text-decoration: none;
        }

        .apply-btn:hover {
          background-color: #1e40af;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;

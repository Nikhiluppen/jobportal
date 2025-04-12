import React from 'react';
import { useParams, Link } from 'react-router-dom';
import jobs from '../data/jobsdata';  // Adjust path if needed

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL

  // Normalize the category from the URL to match job data format (replace "-" with spaces)
  const normalizedCategory = category.replace(/-/g, " "); // replace all dashes with spaces

  // dwqqdw
  const filteredJobs = jobs.filter(job => job.category.toLowerCase() === normalizedCategory.toLowerCase());

  return (
    <div className="category-container">
      <h1>{normalizedCategory}</h1>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <Link to={`/apply/${index}`} className="apply-btn">Apply Now</Link>
            </div>
          ))
        ) : (
          <p>No jobs available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

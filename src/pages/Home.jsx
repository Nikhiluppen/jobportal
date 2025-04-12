import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";  // Ensure you style it as described below

const HomePage = () => {
  // Job Listings Data
  const jobs = [
    {
      title: "Software Engineer",
      skills: ["Java", "Spring Boot", "SQL"],
      location: "New York, NY",
      description: "Develop scalable web applications and APIs.",
    },
    {
      title: "Cloud Security Specialist",
      skills: ["AWS", "Zero Trust", "Cybersecurity"],
      location: "Remote",
      description: "Implement security measures for cloud infrastructure.",
    },
    {
      title: "Data Scientist",
      skills: ["Python", "TensorFlow", "SQL"],
      location: "San Francisco, CA",
      description: "Analyze large datasets and build predictive models.",
    },
    {
      title: "Frontend Developer",
      skills: ["React", "TypeScript", "CSS"],
      location: "Austin, TX",
      description: "Build responsive UI components for web applications.",
    },
    {
      title: "AI/ML Engineer",
      skills: ["Python", "PyTorch", "Deep Learning"],
      location: "Seattle, WA",
      description: "Design and train AI models for automation.",
    }
  ];

  return (
    <div className="home-container">
      {/* ✅ Fixed Navbar */}
      <nav className="navbar">
        <div className="logo">JobBoard</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/candidates">Candidates</Link></li>
          <li><Link to="/savedjobs">SavedJobs</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/jobboard">JobBoard</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>

      {/* ✅ Search bar directly after navbar */}
      {/* <header className="search-header">
        <div className="search-container">
          <h1>Find Your Software Job</h1>
          <div className="search-bar">
            <input type="text" placeholder="Skill (e.g., Python, React, AWS)" />
            <input type="text" placeholder="Location (City, Remote, etc.)" />
            <button>Search</button>
          </div>
        </div>
      </header> */}

      {/* Categories Section */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <Link to="/skills/full-stack-development" className="category">Full-Stack Development</Link>
          <Link to="/skills/frontend-development" className="category">Frontend Development</Link>
          <Link to="/skills/backend-development" className="category">Backend Development</Link>
          <Link to="/skills/cloud-security" className="category">Cloud Security</Link>
          <Link to="/skills/data-science" className="category">Data Science</Link>
          <Link to="/skills/ai-machine-learning" className="category">AI & Machine Learning</Link>
        </div>

        {/* Job Listings Section */}
        <h2>Available Jobs</h2>
        <div className="job-list">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <Link to={`/apply/${index}`} className="apply-btn">Apply Now</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Job Board. All rights reserved</p>
      </footer>
    </div>
  );
};


export default HomePage;

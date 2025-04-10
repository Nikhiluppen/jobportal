import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";  // Ensure correct path

const HomePage = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">JobBoard</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pages">Profile</Link></li>
          <li><Link to="/candidates">Candidates</Link></li>
          <li><Link to="/employers">Employers</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>

      <header>
        <div className="container">
          <h1>Find Your Software Job</h1>
          <div className="search-bar">
            <input type="text" placeholder="Skill (e.g., Python, React, AWS)" />
            <input type="text" placeholder="Location (City, Remote, etc.)" />
            <button>Search</button>
          </div>
        </div>
      </header>

      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <div className="category">Full-Stack Development</div>
          <div className="category">Frontend Development</div>
          <div className="category">Backend Development</div>
          <div className="category">Cloud Security</div>
          <div className="category">Data Science</div>
          <div className="category">AI & Machine Learning</div>
        </div>
      </section>

      <section className="job-listings">
        <h2>Recent Jobs</h2>
        <div className="job">
          <h3>Software Engineer</h3>
          <p>Skills: Java, Spring Boot, SQL</p>
          <p>Location: New York, NY</p>
          <button>Apply not Now</button>
        </div>
        <div className="job">
          <h3>Cloud Security Specialist</h3>
          <p>Skills: AWS, Zero Trust, Cybersecurity</p>
          <p>Location: Remote</p>
          <button>Apply Now</button>
        </div>
        <div className="job">
          <h3>Data Scientist</h3>
          <p>Skills: Python, TensorFlow, SQL</p>
          <p>Location: San Francisco, CA</p>
          <button>Apply Now</button>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Job Board. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

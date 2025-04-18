import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Custom styles
import jobsImage from '../Images/jobs.jpg'; // ✅ Import your image

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="logo">SkillOverTitle</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/saved-jobs">Saved Jobs</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav> */}

      {/* Hero Section with Background Image */}
      <section
        className="hero-banner"
        style={{
          backgroundImage: `url(${jobsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 20px',
          color: 'white',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <div className="hero-content">
          <h1>Find Jobs Based on What You Know, Not What They Call It.</h1>
          <p>Discover your dream job through skills-based matching.</p>
          <div className="search-bar">
            <input type="text" placeholder="e.g., JavaScript, SQL" />
            <input type="text" placeholder="Location (Optional)" />
            <button>Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h2>Browse Jobs</h2>
        <div className="filters">
          <select><option>All Skills</option></select>
          <select><option>Location</option></select>
          <select><option>Job Type</option></select>
          <select><option>Experience Level</option></select>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs">
        <h2>Featured Jobs</h2>
        <div className="job-card">
          <h3>Frontend Developer</h3>
          <p><strong>Skills:</strong> React, CSS, JavaScript</p>
          <p><strong>Location:</strong> Remote</p>
          <p><strong>Description:</strong> Build and maintain UI components for a job platform.</p>
          <Link to="/apply/1" className="apply-btn">Apply Now</Link>
        </div>
      </section>

      {/* Add Profile Section */}
<section className="create-profile">
  <h2>Create Your Profile</h2>
  <p>Stand out to employers by building your profile and uploading your resume.</p>

  <form className="profile-form">
    <input type="text" placeholder="Full Name" required />
    <input type="email" placeholder="Email Address" required />
    <input type="text" placeholder="Skills (e.g., React, AWS, SQL)" required />
    <select>
      <option value="">Experience Level</option>
      <option value="fresher">Fresher</option>
      <option value="mid">Mid-Level</option>
      <option value="senior">Senior</option>
    </select>
    <textarea placeholder="Short Bio (100 words max)"></textarea>

    <label className="upload-label">
      Upload Resume:
      <input type="file" accept=".pdf,.doc,.docx" />
    </label>

    <button type="submit" className="submit-btn">Submit Profile</button>
  </form>
</section>


      {/* Why Use Our Platform */}
      <section className="why-choose-us">
        <h2>Why Use Our Platform?</h2>
        <div className="cards">
          <div className="card">✅ Skill-based filtering</div>
          <div className="card">⚡ Real-time listings</div>
          <div className="card">🧾 Easy application process</div>
          <div className="card">📊 Dashboard to track</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-jobseeker">
          <h3>Create Your Profile Today and Get Matched Instantly</h3>
          <Link to="/signup" className="cta-btn">Sign Up</Link>
        </div>
        <div className="cta-employer">
          <h3>Looking for Talent? Post Jobs Now</h3>
          <Link to="/postjob" className="cta-btn">Post a Job</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What People Say</h2>
        <p>“This platform helped me find the right job in days!” </p>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Get the latest job openings straight to your inbox</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Contact us: +1 (314) 444-4444</p>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms & Conditions</Link></li>
        </ul>
        <p>Follow us: [FB] [X] [LinkedIn]</p>
        <p>&copy; 2025 SkillOverTitle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

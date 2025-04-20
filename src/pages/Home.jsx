import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css';
import jobsImage from '../Images/jobs.jpg';
import ishowspeed from '../Images/ishowspeed.jpg';

const Home = () => {
  const location = useLocation();
  const user = location.state || JSON.parse(localStorage.getItem('userData')) || {};

  return (
    <div className="home-wrapper">
      {/* Greeting */}
      {/* <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>Welcome, {user.name || 'Guest'}!</h1>
        {user.email && <p>Email: {user.email}</p>}
      </div>
      <input type="text" placeholder="Full Name" defaultValue={user.name} required />
<input type="email" placeholder="Email Address" defaultValue={user.email} required /> */}

      {/* Hero Section */}
      <section className="hero-banner" style={{
        backgroundImage: `url(${jobsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 20px',
        color: 'white',
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        <div className="hero-content">
          <h1>Find Jobs Based on What You Know, Not What They Call It.</h1>
          <p>Discover your dream job through skills-based matching.</p>
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

        <div className="job-card">
          <h3>Cloud Engineer</h3>
          <p><strong>Skills:</strong> AWS, Terraform, DevOps</p>
          <p><strong>Location:</strong> Texas</p>
          <p><strong>Description:</strong> Manage cloud deployments and automation scripts.</p>
          <Link to="/apply/2" className="apply-btn">Apply Now</Link>
        </div>

        <div className="job-card">
          <h3>Data Analyst</h3>
          <p><strong>Skills:</strong> Python, SQL, Power BI</p>
          <p><strong>Location:</strong> Missouri</p>
          <p><strong>Description:</strong> Analyze data and visualize trends for business teams.</p>
          <Link to="/apply/3" className="apply-btn">Apply Now</Link>
        </div>
      </section>

      {/* Create Profile Section */}
      <section className="create-profile">
        <h2>Create Your Profile</h2>
        <p>Stand out to employers by building your profile and uploading your resume.</p>

        <form className="profile-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Previous Experience" required></textarea>
          <textarea placeholder="Projects" required></textarea>
          <textarea placeholder="Certifications" required></textarea>
          <textarea placeholder="Short Bio (100 words max)" required></textarea>
          <label className="upload-label">
            Upload Resume:
            <input type="file" accept=".pdf,.doc,.docx" />
          </label>
          <button type="submit" className="submit-btn">Submit Profile</button>
        </form>
      </section>

      {/* Job Recommendations */}
      <section className="job-recommendations">
        <h2>Recommended Jobs for You</h2>
        <div className="job-card">
          <h3>Full Stack Developer</h3>
          <p><strong>Matched Skills:</strong> React, Node.js</p>
          <Link to="/apply/4" className="apply-btn">Apply Now</Link>
        </div>
        <div className="job-card">
          <h3>Backend Developer</h3>
          <p><strong>Matched Skills:</strong> Node.js, Express, MongoDB</p>
          <Link to="/apply/5" className="apply-btn">Apply Now</Link>
        </div>
      </section>

      {/* Why Use Our Platform */}
      <section className="why-choose-us">
        <h2>Why Use Our Platform?</h2>
        <div className="cards">
          <div className="card">✅ Skill-based filtering</div>
          <div className="card">🧾 Easy application process</div>
          <div className="card">📊 Dashboard to track</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonial-card">
          <img src={ishowspeed} alt="I Show Speed" style={{ width: '150px', borderRadius: '50%' }} />
          <p>
            My name is I Show Speed, I am so elated to share my experience with the SkillOverTitle website. 
            This website helped me to land in a job that I dreamt of. 
            Job recommendation features, and the personalized dashboard made me apply for the positions which aligned with my skill.
          </p>
        </div>
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

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
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
      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="logo">JobBoard</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pages">Pages</Link></li>
          <li><Link to="/candidates">Candidates</Link></li>
          <li><Link to="/savedjobs">SavedJobs</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/jobboard">JobBoard</Link></li>
           <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav> */}

      {/* Popular Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <Link to="/category/full-stack-development" className="category">Full-Stacksdcsfefc Development</Link>
          <Link to="/category/frontend-development" className="category">Frontend Development</Link>
          <Link to="/category/backend-development" className="category">Backend Development</Link>
          <Link to="/category/cloud-security" className="category">Cloud Security</Link>
          <Link to="/category/data-science" className="category">Data Science</Link>
          <Link to="/category/ai-machine-learning" className="category">AI & Machine Learning</Link>
        </div>
      </section>

      {/* Available Jobs */}
      <section className="job-listings">
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

      {/* Embedded CSS Styling */}
      <style>{`
        .home-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f9f9f9;
        }
        // .navbar {
          
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        //   background-color: #333;
        //   padding: 10px 20px;
        // }
        // .navbar .logo {
        //   color: #fff;
        //   font-size: 1.5rem;
        //   font-weight: bold;
        // }
        .nav-links {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }
        .nav-links li {
          margin: 0 10px;
        }
        .nav-links a {
          color: #fff;
          text-decoration: none;
        }
        .signup-btn {
          background-color:rgb(106, 255, 0);
          padding: 5px 10px;
          border-radius: 5px;
          color: #fff;
        }
        // .categories {
        //   margin: 20px 0;
        //   padding: 20px;
        //   background-color: #fff;
        //   border-radius: 5px;
        //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        // }
        // .category-list {
        //   display: flex;
        //   flex-wrap: wrap;
        //   gap: 10px;
        //   margin-top: 10px;
        // }
        // .category {
        //   background-color: #eee;
        //   padding: 8px 12px;
        //   border-radius: 5px;
        //   text-decoration: none;
        //   color: #333;
        // }
        .job-listings {
          margin: 20px 0;
        }
        .job-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .job-card {
          background-color: #fff;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .apply-btn {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #28a745;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .apply-btn:hover {
          background-color: #218838;
        }
        footer {
          text-align: center;
          padding: 20px;
          background-color: #333;
          color: #fff;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default Home;

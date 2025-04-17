import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', headline: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/home', { state: form });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label>Headline</label>
          <input
            name="headline"
            value={form.headline}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />

          <button type="submit">Continue</button>
        </form>
      </div>

      <style>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f3f2ef;
        }
        .signup-card {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          width: 320px;
        }
        .signup-card h2 {
          margin-bottom: 1rem;
          text-align: center;
        }
        .signup-card label {
          display: block;
          margin-top: 1rem;
          font-weight: 500;
        }
        .signup-card input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .signup-card button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem;
          background: #0073b1;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }
        .signup-card button:hover {
          background: #005582;
        }
      `}</style>
    </div>
  );
};

export default SignUp;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobBoard from "./pages/JobBoard";
import ApplyJob from "./pages/ApplyJob";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CategoryPage from "./pages/CategoryPage";
import JobUpload from "./components/JobUpload";

const App = () => {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = localStorage.getItem("jobs");
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

  useEffect(() => {
    console.log("Stored Jobs in localStorage:", jobs);
  }, [jobs]);

  const handleJobUpload = (uploadedJobs) => {
    setJobs(uploadedJobs);
    localStorage.setItem("jobs", JSON.stringify(uploadedJobs));
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Category & Location-Based Job Dashboard</h1>

        <JobUpload onJobsParsed={handleJobUpload} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobBoard jobs={jobs} />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/apply/:jobId" element={<ApplyJob jobs={jobs} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

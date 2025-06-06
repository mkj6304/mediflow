// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MediFlow 💊</h1>
      <p>Select your role to proceed:</p>

      <div className="role-buttons">
        <Link to="/hospital" className="role-btn">🏥 Hospital</Link>
        <Link to="/manufacturer" className="role-btn">🏭 Manufacturer</Link>
        <Link to="/user" className="role-btn">🧍 User</Link>
        <Link to="/pharmacy" className="role-btn">🏪 Pharmacy</Link>
        <Link to="/supplier" className="role-btn">🚚 Supplier</Link>
        <Link to="/lab" className="role-btn">🔬 Lab</Link>
      </div>
    </div>
  );
};

export default Home;

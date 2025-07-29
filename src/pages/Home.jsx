// pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/home.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="home-container">
      <h1>Welcome to MediFlow 💊</h1>
      <p>
        A smart and secure platform for online testing, monitoring, and distribution of
        medicines and consumables across hospitals, pharmacies, suppliers, labs,
        manufacturers, and patients.
      </p>

      {/* Toggle Login/Signup */}
      <div className="auth-toggle">
        <button onClick={() => setShowLogin(true)} className={showLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setShowLogin(false)} className={!showLogin ? 'active' : ''}>Sign Up</button>
      </div>

      {/* Auth Form */}
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        {!showLogin && (
          <input type="text" placeholder="Full Name" required />
        )}
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">{showLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      {/* Role Selection - only visible after login/signup (placeholder logic) */}
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

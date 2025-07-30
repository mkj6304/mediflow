// pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHospital, 
  FaIndustry, 
  FaUser, 
  FaStore, 
  FaTruck, 
  FaFlask,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaMobileAlt
} from 'react-icons/fa';
import './css/home.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  const roleCards = [
    { icon: FaHospital, title: 'Hospital', path: '/hospital', color: 'var(--primary-600)' },
    { icon: FaIndustry, title: 'Manufacturer', path: '/manufacturer', color: 'var(--success-600)' },
    { icon: FaUser, title: 'User', path: '/user', color: 'var(--warning-500)' },
    { icon: FaStore, title: 'Pharmacy', path: '/pharmacy', color: 'var(--error-500)' },
    { icon: FaTruck, title: 'Supplier', path: '/supplier', color: 'var(--primary-800)' },
    { icon: FaFlask, title: 'Lab', path: '/lab', color: 'var(--success-700)' }
  ];

  const features = [
    { icon: FaShieldAlt, title: 'Secure Platform', description: 'End-to-end encryption for data protection' },
    { icon: FaChartLine, title: 'ML-Powered Analysis', description: 'Advanced quality assessment using AI' },
    { icon: FaUsers, title: 'Multi-Role Access', description: 'Tailored interfaces for different stakeholders' },
    { icon: FaMobileAlt, title: 'Mobile Ready', description: 'Access from anywhere, anytime' }
  ];

  return (
    <div className="container">
      <motion.div 
        className="home-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Welcome to <span className="text-primary">MediFlow</span>
          </h1>
          <p className="hero-description">
            A smart and secure platform for online testing, monitoring, and distribution of
            medicines and consumables across hospitals, pharmacies, suppliers, labs,
            manufacturers, and patients.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="section-title">Why Choose MediFlow?</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Auth Section */}
        <motion.div 
          className="auth-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="auth-toggle">
            <button 
              onClick={() => setShowLogin(true)} 
              className={`btn ${showLogin ? 'btn-primary' : 'btn-secondary'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setShowLogin(false)} 
              className={`btn ${!showLogin ? 'btn-primary' : 'btn-secondary'}`}
            >
              Sign Up
            </button>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            {!showLogin && (
              <input type="text" className="input" placeholder="Full Name" required />
            )}
            <input type="email" className="input" placeholder="Email" required />
            <input type="password" className="input" placeholder="Password" required />
            <button type="submit" className="btn btn-primary btn-lg">
              {showLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </motion.div>

        {/* Role Selection */}
        <motion.div 
          className="role-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="section-title">Select Your Role</h3>
          <div className="role-grid">
            {roleCards.map((role, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={role.path} className="role-card">
                  <div className="role-icon" style={{ color: role.color }}>
                    <role.icon />
                  </div>
                  <h4>{role.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;

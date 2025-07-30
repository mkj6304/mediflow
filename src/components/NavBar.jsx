// components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaPills, 
  FaHome, 
  FaHospital, 
  FaIndustry, 
  FaUser, 
  FaStore, 
  FaTruck, 
  FaFlask,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaPills className="brand-icon" />
        <span>MediFlow</span>
      </div>
      
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <NavLink to="/" end>
            <FaHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/hospital">
            <FaHospital />
            <span>Hospital</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/manufacturer">
            <FaIndustry />
            <span>Manufacturer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user">
            <FaUser />
            <span>User</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacy">
            <FaStore />
            <span>Pharmacy</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/supplier">
            <FaTruck />
            <span>Supplier</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/lab">
            <FaFlask />
            <span>Lab</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
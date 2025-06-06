// components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">💊 MediFlow</div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/hospital">Hospital</NavLink></li>
        <li><NavLink to="/manufacturer">Manufacturer</NavLink></li>
        <li><NavLink to="/user">User</NavLink></li>
        <li><NavLink to="/pharmacy">Pharmacy</NavLink></li>
        <li><NavLink to="/supplier">Supplier</NavLink></li>
        <li><NavLink to="/lab">Lab</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
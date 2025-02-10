import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          CyberGuard
        </Link>
        <div className="navbar-links">
          <Link to="/image-detection" className="nav-link">
            AI Detection
          </Link>
          <Link to="/system-scan" className="nav-link">
            System Scan
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
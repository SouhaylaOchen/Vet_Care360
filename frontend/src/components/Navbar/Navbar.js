import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // دالة للتحقق من الرابط النشط
  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active-link' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">VetCare 360</Link>
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>HOME</Link>
          <Link to="/owners" className={isActive('/owners')}>FIND OWNERS</Link>
          <Link to="/vets" className={isActive('/vets')}>VETERINARIANS</Link>
          <Link to="/error" className={isActive('/error')}>ERROR</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaPaw, FaUserMd } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to VetCare 360</h1>
          <p className="subtitle">Comprehensive veterinary clinic management system</p>
          <div className="cta-buttons">
            <Link to="/owners/search" className="btn btn-primary">
              <FaUserFriends /> Find Owners
            </Link>
            <Link to="/vets" className="btn btn-secondary">
              <FaUserMd /> View Veterinarians
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserFriends size={40} />
            </div>
            <h3>Owner Management</h3>
            <p>Easily manage pet owner information and their pets</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaPaw size={40} />
            </div>
            <h3>Pet Records</h3>
            <p>Track medical history and visits for each pet</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserMd size={40} />
            </div>
            <h3>Veterinarians</h3>
            <p>View and manage our team of professional vets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
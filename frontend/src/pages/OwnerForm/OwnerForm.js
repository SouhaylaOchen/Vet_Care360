import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOwner } from '../../services/ownerService';
import './OwnerForm.css';

const OwnerForm = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOwner(owner);
      alert('Owner added successfully!');
      navigate('/owners');
    } catch (error) {
      console.error('Error adding owner:', error);
      alert('Failed to add owner.');
    }
  };

  return (
    <div className="owner-form-page">
      <div className="header">
        <h1>New Owner</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={owner.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={owner.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={owner.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={owner.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={owner.telephone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">
              Add Owner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditOwner.css';

const EditOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState({
    firstName: '', lastName: '', address: '', city: '', telephone: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${id}`)
      .then(res => setOwner(res.data))
      .catch(err => console.error('Error fetching owner:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/owners/${id}`, owner);
      const updatedOwner = await axios.get(`http://localhost:5000/api/owners/${id}/full`);
      navigate(`/owners/${id}`, { state: { updatedOwner: updatedOwner.data } });
    } catch (error) {
      console.error('Error updating owner:', error);
      alert('Failed to update owner.');
    }
  };

  return (
    <div className="edit-owner-container">
      <div className="edit-owner-header"><h1>Edit Owner</h1></div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={owner.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={owner.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input name="address" value={owner.address} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input name="city" value={owner.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Telephone</label>
            <input name="telephone" value={owner.telephone} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/owners/${id}`)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditOwner;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddVisit.css';

const AddVisit = () => {
  const { id, petId } = useParams();
  const navigate = useNavigate();

  const [visit, setVisit] = useState({
    date: '',
    description: ''
  });

  const [pet, setPet] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${petId}`)
      .then(res => setPet(res.data))
      .catch(err => console.error('Error fetching pet:', err));
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/visits`, {
        ...visit,
        pet: petId
      });
      const updatedOwner = await axios.get(`http://localhost:5000/api/owners/${id}/full`);
      navigate(`/owners/${id}`, { state: { updatedOwner: updatedOwner.data } });
    } catch (error) {
      console.error('Error adding visit:', error);
      alert('Failed to add visit.');
    }
  };

  return (
    <div className="add-visit-page">
      <div className="header"><h1>Add Visit</h1></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          {pet && (
            <div className="pet-info">
              <h3>Pet Information</h3>
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Birth Date:</strong> {pet.birthDate?.split('T')[0]}</p>
              <p><strong>Type:</strong> {pet.type}</p>
            </div>
          )}
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={visit.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={visit.description} onChange={handleChange} rows="4" required />
          </div>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Add Visit</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/owners/${id}`)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisit;

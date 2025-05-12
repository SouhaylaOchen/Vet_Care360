import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPet.css';

const EditPet = () => {
  const { id, petId } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: '',
    birthDate: '',
    type: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${petId}`)
      .then(res => setPet(res.data))
      .catch(err => console.error('Error fetching pet:', err));
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/pets/${petId}`, pet);
      const updatedOwner = await axios.get(`http://localhost:5000/api/owners/${id}/full`);
      navigate(`/owners/${id}`, { state: { updatedOwner: updatedOwner.data } });
    } catch (error) {
      console.error('Error updating pet:', error);
      alert('Failed to update pet.');
    }
  };

  return (
    <div className="edit-pet-page">
      <div className="header"><h1>Edit Pet</h1></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pet Name</label>
            <input type="text" name="name" value={pet.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Birth Date</label>
            <input type="date" name="birthDate" value={pet.birthDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Pet Type</label>
            <select name="type" value={pet.type} onChange={handleChange} required>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="hamster">Hamster</option>
              <option value="lizard">Lizard</option>
            </select>
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/owners/${id}`)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPet;

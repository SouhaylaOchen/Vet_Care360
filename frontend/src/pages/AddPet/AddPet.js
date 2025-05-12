import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPet.css';

const AddPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({ name: '', birthDate: '', type: 'dog' });
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${id}`)
      .then(res => setOwner(res.data))
      .catch(err => console.error('Error fetching owner:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pets', { ...pet, owner: id });
      const updatedOwner = await axios.get(`http://localhost:5000/api/owners/${id}/full`);
      navigate(`/owners/${id}`, { state: { updatedOwner: updatedOwner.data } });
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('Failed to add pet.');
    }
  };

  return (
    <div className="add-pet-container">
      <div className="add-pet-header"><h1>Add New Pet</h1></div>
      {owner && (
        <div className="owner-info">
          Owner: {owner.firstName} {owner.lastName}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pet Name</label>
          <input name="name" value={pet.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Birth Date</label>
          <input type="date" name="birthDate" value={pet.birthDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={pet.type} onChange={handleChange} required>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="hamster">Hamster</option>
            <option value="lizard">Lizard</option>
          </select>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/owners/${id}`)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save Pet</button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;

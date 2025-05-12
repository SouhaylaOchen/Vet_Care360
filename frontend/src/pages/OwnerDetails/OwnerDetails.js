import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './OwnerDetails.css';

const OwnerDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.updatedOwner) {
      setOwner(location.state.updatedOwner);
      setLoading(false);
    } else {
      axios.get(`http://localhost:5000/api/owners/${id}/full`)
        .then(res => {
          setOwner(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching owner:', err);
          setLoading(false);
        });
    }
  }, [id, location.state]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!owner) return <div className="not-found">Owner not found</div>;

  return (
    <div className="owner-details-container">
      <div className="owner-header"><h1>Owner Information</h1></div>
      <div className="owner-info-card">
        <div className="info-grid">
          <div className="info-item"><div className="info-label">Name</div><div className="info-value">{owner.firstName} {owner.lastName}</div></div>
          <div className="info-item"><div className="info-label">Address</div><div className="info-value">{owner.address}</div></div>
          <div className="info-item"><div className="info-label">City</div><div className="info-value">{owner.city}</div></div>
          <div className="info-item"><div className="info-label">Telephone</div><div className="info-value">{owner.telephone}</div></div>
        </div>
        <div className="action-buttons">
          <Link to={`/owners/edit/${owner._id}`} className="btn btn-primary">Edit Owner</Link>
          <Link to={`/owners/${owner._id}/pets/new`} className="btn btn-secondary">Add New Pet</Link>
        </div>
      </div>

      <div className="pets-section">
        <h2 className="section-title">Pets and Visits</h2>
        {owner.pets?.length > 0 ? (
          owner.pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <div className="pet-header">
                <h3 className="pet-name">{pet.name}</h3>
                <div className="pet-actions">
                  <Link to={`/owners/${owner._id}/pets/${pet._id}/edit`} className="btn btn-sm btn-primary">Edit Pet</Link>
                  <Link to={`/owners/${owner._id}/pets/${pet._id}/visits/new`} className="btn btn-sm btn-secondary">Add Visit</Link>
                </div>
              </div>
              <div className="pet-meta">
                <div className="pet-meta-item"><span className="meta-label">Birth Date</span><span className="meta-value">{pet.birthDate?.split('T')[0]}</span></div>
                <div className="pet-meta-item"><span className="meta-label">Type</span><span className="meta-value">{pet.type}</span></div>
              </div>
              {pet.visits?.length > 0 ? (
                <div className="visits-section">
                  <h4 className="visits-title">Visit History</h4>
                  <table className="visits-table">
                    <thead><tr><th>Date</th><th>Description</th></tr></thead>
                    <tbody>
                      {pet.visits.map((visit) => (
                        <tr key={visit._id}>
                          <td>{visit.date?.split('T')[0]}</td>
                          <td>{visit.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">No visits recorded for this pet</div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">No pets registered for this owner</div>
        )}
      </div>
    </div>
  );
};

export default OwnerDetails;

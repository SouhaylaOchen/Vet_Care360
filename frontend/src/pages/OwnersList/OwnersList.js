import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OwnersList.css';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/owners');
      if (!response.ok) {
        throw new Error('Failed to fetch owners');
      }
      const data = await response.json();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div className="owners-list-container">
      <div className="owners-list-header">
        <h1>Owners Directory</h1>
        <p>Manage and view all registered pet owners</p>
        <Link to="/owners/new" className="action-btn">+ Add New Owner</Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading owners data...</p>
        </div>
      ) : owners.length === 0 ? (
        <div className="empty-state">
          <p>No owners found. Would you like to add a new owner?</p>
        </div>
      ) : (
        <div className="owners-table-container">
          <table className="owners-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Telephone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner._id}>
                  <td>{owner.firstName} {owner.lastName}</td>
                  <td>{owner.address}</td>
                  <td>{owner.city}</td>
                  <td>{owner.telephone}</td>
                  <td>
                   <Link to={`/owners/${owner._id}`} className="btn btn-view">
  View Details
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnersList;

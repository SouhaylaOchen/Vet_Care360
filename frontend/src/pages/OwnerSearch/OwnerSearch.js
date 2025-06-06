import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OwnerSearch.css';

const OwnerSearch = () => {
  const [lastName, setLastName] = useState('');
  const [owners, setOwners] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/owners');
      const allOwners = response.data;

      const filtered = lastName.trim()
        ? allOwners.filter((o) =>
            o.lastName.toLowerCase().includes(lastName.trim().toLowerCase())
          )
        : allOwners;

      setOwners(filtered);
    } catch (error) {
      console.error('Error searching owners:', error);
      setOwners([]);
    }

    setSearched(true);
  };

  return (
    <div className="owner-search-container">
      <div className="search-header">
        <h1>Find Owners</h1>
      </div>

      <div className="search-card">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="lastName">Search by Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter owner's last name"
            />
          </div>
          <div className="search-actions">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <Link to="/owners/new" className="btn btn-secondary">
              Add New Owner
            </Link>
          </div>
        </form>
      </div>

      {searched && (
        <div className="results-section">
          <h2 className="results-header">Owner Results</h2>
          {owners.length > 0 ? (
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
                      <Link 
                        to={`/owners/${owner._id}`} 
                        className="action-btn btn-view"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>No owners found matching your search criteria</p>
              <p>Try a different search or add a new owner</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerSearch;

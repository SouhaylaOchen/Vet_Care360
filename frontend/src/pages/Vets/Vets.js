import React, { useState, useEffect } from 'react';
import './Vets.css';

const Vets = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockVets = [
          { id: 1, name: 'Dr. James Carter', specialties: [] },
          { id: 2, name: 'Dr. Linda Douglas', specialties: ['Dentistry', 'Surgery'] },
          { id: 3, name: 'Dr. Sharon Jenkins', specialties: [] },
          { id: 4, name: 'Dr. Helen Leary', specialties: ['Radiology'] },
          { id: 5, name: 'Dr. Rafael Ortega', specialties: ['Surgery'] },
          { id: 6, name: 'Dr. Henry Stevens', specialties: ['Radiology'] },
        ];
        
        setVets(mockVets);
      } catch (error) {
        console.error('Error fetching vets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVets();
  }, []);

  const renderSpecialties = (specialties) => {
    if (specialties.length === 0) {
      return <span className="specialty-badge">General Practice</span>;
    }
    
    return specialties.map((specialty, index) => (
      <span key={index} className="specialty-badge">
        {specialty}
      </span>
    ));
  };

  return (
    <div className="vets-container">
      <div className="vets-header">
        <h1>Our Veterinary Team</h1>
        <p>Meet our professional and experienced veterinarians</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading veterinary team data...</p>
        </div>
      ) : vets.length === 0 ? (
        <div className="empty-state">
          <p>No veterinarians found at this time.</p>
        </div>
      ) : (
        <div className="vets-table-container">
          <table className="vets-table">
            <thead>
              <tr>
                <th>Veterinarian</th>
                <th>Specialties</th>
              </tr>
            </thead>
            <tbody>
              {vets.map((vet) => (
                <tr key={vet.id}>
                  <td>{vet.name}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {renderSpecialties(vet.specialties)}
                    </div>
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

export default Vets;
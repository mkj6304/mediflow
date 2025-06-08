// pages/User.jsx
import React, { useState, useEffect } from 'react';
import './css/user.css';

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [order, setOrder] = useState('');
  const [complaint, setComplaint] = useState('');

  // Fetching sample data (Day 12)
  useEffect(() => {
    const mockMedicines = [
      { name: 'Paracetamol', quality: 'A+', category: 'Painkiller' },
      { name: 'Ibuprofen', quality: 'A', category: 'Anti-inflammatory' },
      { name: 'Cetirizine', quality: 'B+', category: 'Antihistamine' }
    ];
    setResults(mockMedicines);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResults = results.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrder = () => {
    alert(`Order placed for: ${order}`);
    setOrder('');
  };

  const handleComplaint = () => {
    alert(`Complaint submitted: ${complaint}`);
    setComplaint('');
  };

  return (
    <div className="user-container">
      <h2>🧍 User Dashboard</h2>

      {/* Search Medicines */}
      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search medicines..."
        />
      </div>

      {/* Search Results */}
      <div className="results-section">
        <h4>Search Results</h4>
        <ul>
          {filteredResults.map((med, idx) => (
            <li key={idx}>
              <strong>{med.name}</strong> - Quality: {med.quality} ({med.category})
            </li>
          ))}
        </ul>
      </div>

      {/* Order Placement */}
      <div className="order-section">
        <h4>Order Medicines</h4>
        <input
          type="text"
          placeholder="Enter medicine name"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <button onClick={handleOrder}>Place Order</button>
      </div>

      {/* Complaint Form */}
      <div className="complaint-section">
        <h4>Lodge a Complaint</h4>
        <textarea
          rows="3"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your issue..."
        ></textarea>
        <button onClick={handleComplaint}>Submit</button>
      </div>
    </div>
  );
};

export default User;
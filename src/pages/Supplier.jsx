// pages/Supplier.jsx
import React, { useState } from 'react';
import './css/supplier.css';

const Supplier = () => {
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({ medicine: '', from: '', deliveryStatus: 'Pending' });

  const handleChange = (e) => {
    setNewSupply({ ...newSupply, [e.target.name]: e.target.value });
  };

  const handleDeliver = () => {
    setSupplies([...supplies, newSupply]);
    setNewSupply({ medicine: '', from: '', deliveryStatus: 'Pending' });
  };

  return (
    <div className="supplier-container">
      <h2>🚚 Supplier Dashboard</h2>

      <form className="supply-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="medicine"
          placeholder="Medicine Name"
          value={newSupply.medicine}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="from"
          placeholder="From Manufacturer"
          value={newSupply.from}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleDeliver}>Record Delivery</button>
      </form>

      <table className="supply-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>From</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((supply, index) => (
            <tr key={index}>
              <td>{supply.medicine}</td>
              <td>{supply.from}</td>
              <td>{supply.deliveryStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="supplier-footer">
        <p>📦 Delivery tracking and logistics integration coming soon...</p>
      </div>
    </div>
  );
};

export default Supplier;
// pages/Pharmacy.jsx
import React, { useState } from 'react';
import './css/pharmacy.css';

const Pharmacy = () => {
  const [inventory, setInventory] = useState([]);
  const [medicine, setMedicine] = useState({ name: '', supplier: '', authenticated: false });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const authStatus = window.confirm('Is the medicine authenticated?');
    setInventory([...inventory, { ...medicine, authenticated: authStatus }]);
    setMedicine({ name: '', supplier: '', authenticated: false });
  };

  return (
    <div className="pharmacy-container">
      <h2>🏪 Pharmacy Dashboard</h2>

      <form className="pharmacy-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={medicine.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={medicine.supplier}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleAdd}>Add to Inventory</button>
      </form>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Supplier</th>
            <th>Authenticated</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.supplier}</td>
              <td>{item.authenticated ? '✔️' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pharmacy-footer">
        <p>📦 Inventory sync and stock reports coming soon...</p>
      </div>
    </div>
  );
};

export default Pharmacy;
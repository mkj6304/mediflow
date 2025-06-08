// pages/Hospital.jsx
import React, { useState, useEffect } from 'react';
import './css/hospital.css'; // Styling via CSS (Day 2-3)

const Hospital = () => {
  // useState for managing stock and medicine inputs (Day 9)
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', quantity: '', manufacturer: '' });

  // Simulated fetch to mimic getting existing stock data (Day 12)
  useEffect(() => {
    const existingStock = [
      { name: 'Paracetamol', quantity: 100, manufacturer: 'PharmaCorp' },
      { name: 'Amoxicillin', quantity: 50, manufacturer: 'MediLab' },
    ];
    setMedicines(existingStock);
  }, []);

  const handleChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, newMedicine]);
    setNewMedicine({ name: '', quantity: '', manufacturer: '' });
  };

  return (
    <div className="hospital-container">
      <h2>🏥 Hospital Dashboard</h2>

      {/* Form for inventory input (Day 1: Forms, Tables, Semantic HTML) */}
      <form onSubmit={(e) => e.preventDefault()} className="medicine-form">
        <input type="text" name="name" placeholder="Medicine Name" value={newMedicine.name} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={newMedicine.quantity} onChange={handleChange} required />
        <input type="text" name="manufacturer" placeholder="Manufacturer" value={newMedicine.manufacturer} onChange={handleChange} required />
        <button type="button" onClick={handleAddMedicine}>Add to Inventory</button>
      </form>

      {/* Table to show current stock (Day 1: Tables) */}
      <table className="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, index) => (
            <tr key={index}>
              <td>{med.name}</td>
              <td>{med.quantity}</td>
              <td>{med.manufacturer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Placeholder for future features: Business Reports, Authentication */}
      <div className="features-coming">
        <p>📦 Inventory management and 📊 reports coming soon...</p>
      </div>
    </div>
  );
};

export default Hospital;

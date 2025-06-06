// pages/Manufacturer.jsx
import React, { useState } from 'react';
import './manufacturer.css';

const Manufacturer = () => {
  const [batch, setBatch] = useState({ name: '', batchNo: '', formulation: '', quality: '' });
  const [batches, setBatches] = useState([]);

  const handleChange = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  const handleAddBatch = () => {
    setBatches([...batches, batch]);
    setBatch({ name: '', batchNo: '', formulation: '', quality: '' });
  };

  return (
    <div className="manufacturer-container">
      <h2>🏭 Manufacturer Dashboard</h2>

      <form onSubmit={(e) => e.preventDefault()} className="batch-form">
        <input type="text" name="name" placeholder="Medicine Name" value={batch.name} onChange={handleChange} required />
        <input type="text" name="batchNo" placeholder="Batch Number" value={batch.batchNo} onChange={handleChange} required />
        <input type="text" name="formulation" placeholder="Formulation" value={batch.formulation} onChange={handleChange} required />
        <input type="text" name="quality" placeholder="Quality Norms" value={batch.quality} onChange={handleChange} required />
        <button type="button" onClick={handleAddBatch}>Add Batch</button>
      </form>

      <table className="batch-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Batch No</th>
            <th>Formulation</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b, index) => (
            <tr key={index}>
              <td>{b.name}</td>
              <td>{b.batchNo}</td>
              <td>{b.formulation}</td>
              <td>{b.quality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="features-coming">
        <p>🧬 QR code generator and blockchain linking coming soon...</p>
      </div>
    </div>
  );
};

export default Manufacturer;

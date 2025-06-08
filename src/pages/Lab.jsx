// pages/Lab.jsx
import React, { useState } from 'react';
import './css/lab.css';

const Lab = () => {
  const [report, setReport] = useState({ sampleId: '', result: '', interpretation: '' });
  const [reports, setReports] = useState([]);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleAddReport = () => {
    setReports([...reports, report]);
    setReport({ sampleId: '', result: '', interpretation: '' });
  };

  return (
    <div className="lab-container">
      <h2>🔬 Laboratory Dashboard</h2>

      <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="sampleId"
          placeholder="Sample ID"
          value={report.sampleId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="result"
          placeholder="Spectroscopy Result"
          value={report.result}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="interpretation"
          placeholder="Interpretation"
          value={report.interpretation}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleAddReport}>Upload Report</button>
      </form>

      <table className="report-table">
        <thead>
          <tr>
            <th>Sample ID</th>
            <th>Result</th>
            <th>Interpretation</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, index) => (
            <tr key={index}>
              <td>{r.sampleId}</td>
              <td>{r.result}</td>
              <td>{r.interpretation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lab-footer">
        <p>🧪 ML-based analysis integration coming soon...</p>
      </div>
    </div>
  );
};

export default Lab;

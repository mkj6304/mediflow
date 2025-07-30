// pages/Lab.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFlask, 
  FaUpload, 
  FaChartLine, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaDownload,
  FaCog,
  FaPlay,
  FaPause,
  FaStop,
  FaFileAlt,
  FaMicroscope,
  FaBrain,
  FaClock,
  FaDatabase
} from 'react-icons/fa';
import Notification from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';
import './css/lab.css';

const Lab = () => {
  const [report, setReport] = useState({ 
    sampleId: '', 
    result: '', 
    interpretation: '',
    qualityScore: 0,
    status: 'pending'
  });
  const [reports, setReports] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [mlModelStatus, setMlModelStatus] = useState('ready'); // ready, running, completed

  // Mock data for demonstration
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        sampleId: 'SAMPLE-001',
        result: 'Spectroscopy Analysis Complete',
        interpretation: 'High quality medicine detected',
        qualityScore: 92,
        status: 'completed',
        timestamp: '2024-01-15 10:30:00',
        mlConfidence: 0.94,
        parameters: {
          purity: 98.5,
          potency: 95.2,
          stability: 89.7,
          contamination: 0.1
        }
      },
      {
        id: 2,
        sampleId: 'SAMPLE-002',
        result: 'Chemical Composition Analysis',
        interpretation: 'Standard quality with minor variations',
        qualityScore: 78,
        status: 'completed',
        timestamp: '2024-01-15 09:15:00',
        mlConfidence: 0.87,
        parameters: {
          purity: 85.2,
          potency: 82.1,
          stability: 76.8,
          contamination: 2.3
        }
      },
      {
        id: 3,
        sampleId: 'SAMPLE-003',
        result: 'Pending Analysis',
        interpretation: 'Under ML processing',
        qualityScore: 0,
        status: 'processing',
        timestamp: '2024-01-15 11:00:00',
        mlConfidence: 0,
        parameters: null
      }
    ];
    setReports(mockReports);
  }, []);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleAddReport = () => {
    if (!report.sampleId || !report.result) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const newReport = {
      ...report,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      status: 'pending',
      qualityScore: 0,
      mlConfidence: 0,
      parameters: null
    };

    setReports([newReport, ...reports]);
    setReport({ sampleId: '', result: '', interpretation: '', qualityScore: 0, status: 'pending' });
    setNotification({ show: true, message: 'Report uploaded successfully!', type: 'success' });
  };

  const startMlAnalysis = (reportId) => {
    setIsAnalyzing(true);
    setMlModelStatus('running');
    setAnalysisProgress(0);

    // Simulate ML analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setMlModelStatus('completed');
          
          // Update report with analysis results
          setReports(prevReports => 
            prevReports.map(r => 
              r.id === reportId 
                ? {
                    ...r,
                    status: 'completed',
                    qualityScore: Math.floor(Math.random() * 40) + 60, // 60-100
                    mlConfidence: (Math.random() * 0.3) + 0.7, // 0.7-1.0
                    parameters: {
                      purity: (Math.random() * 20) + 80,
                      potency: (Math.random() * 20) + 80,
                      stability: (Math.random() * 20) + 80,
                      contamination: Math.random() * 5
                    }
                  }
                : r
            )
          );
          
          setNotification({ show: true, message: 'ML analysis completed successfully!', type: 'success' });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success-600)';
      case 'processing': return 'var(--warning-500)';
      case 'pending': return 'var(--gray-500)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle />;
      case 'processing': return <FaCog />;
      case 'pending': return <FaClock />;
      default: return <FaClock />;
    }
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  return (
    <div className="container">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={closeNotification}
      />
      
      <motion.div 
        className="lab-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="lab-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <h2>Laboratory Dashboard</h2>
            <p>Advanced medicine quality analysis using ML-powered spectroscopy</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <FaFlask />
              <div>
                <h3>{reports.length}</h3>
                <p>Total Samples</p>
              </div>
            </div>
            <div className="stat-card">
              <FaCheckCircle />
              <div>
                <h3>{reports.filter(r => r.status === 'completed').length}</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <FaCog />
              <div>
                <h3>{reports.filter(r => r.status === 'processing').length}</h3>
                <p>Processing</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ML Model Status */}
        <motion.div 
          className="ml-status-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ml-status-card">
            <div className="ml-status-header">
              <FaBrain />
              <h3>ML Analysis Engine</h3>
            </div>
            <div className="ml-status-content">
              <div className="status-indicator">
                <span className={`status-dot ${mlModelStatus}`}></span>
                <span className="status-text">
                  {mlModelStatus === 'ready' && 'Ready for Analysis'}
                  {mlModelStatus === 'running' && 'Processing Sample...'}
                  {mlModelStatus === 'completed' && 'Analysis Complete'}
                </span>
              </div>
              {isAnalyzing && (
                <div className="progress-section">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{analysisProgress}%</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Upload Form */}
        <motion.div 
          className="upload-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="upload-card">
            <h3>Upload New Sample</h3>
            <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>Sample ID</label>
                  <input
                    type="text"
                    name="sampleId"
                    className="input"
                    placeholder="Enter sample ID"
                    value={report.sampleId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Spectroscopy Result</label>
                  <input
                    type="text"
                    name="result"
                    className="input"
                    placeholder="Enter spectroscopy result"
                    value={report.result}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Initial Interpretation</label>
                <textarea
                  name="interpretation"
                  className="input"
                  rows="3"
                  placeholder="Enter initial interpretation"
                  value={report.interpretation}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleAddReport}>
                <FaUpload />
                Upload Report
              </button>
            </form>
          </div>
        </motion.div>

        {/* Reports Table */}
        <motion.div 
          className="reports-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="reports-header">
            <h3>Sample Analysis Reports</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              <FaChartLine />
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </button>
          </div>

          <div className="reports-table">
            <table>
              <thead>
                <tr>
                  <th>Sample ID</th>
                  <th>Result</th>
                  <th>Quality Score</th>
                  <th>ML Confidence</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {reports.map((r, index) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`report-row ${r.status}`}
                    >
                      <td>{r.sampleId}</td>
                      <td>{r.result}</td>
                      <td>
                        {r.qualityScore > 0 ? (
                          <span className="quality-score" style={{ 
                            color: r.qualityScore >= 90 ? 'var(--success-600)' : 
                                   r.qualityScore >= 80 ? 'var(--warning-500)' : 'var(--error-500)' 
                          }}>
                            {r.qualityScore}%
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        {r.mlConfidence > 0 ? (
                          <span className="confidence-score">
                            {(r.mlConfidence * 100).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <span className="status-badge" style={{ color: getStatusColor(r.status) }}>
                          {getStatusIcon(r.status)}
                          {r.status}
                        </span>
                      </td>
                      <td>{r.timestamp}</td>
                      <td>
                        <div className="action-buttons">
                          {r.status === 'pending' && (
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => startMlAnalysis(r.id)}
                              disabled={isAnalyzing}
                            >
                              <FaPlay />
                              Analyze
                            </button>
                          )}
                          {r.status === 'completed' && (
                            <button 
                              className="btn btn-sm btn-secondary"
                              onClick={() => setSelectedReport(r)}
                            >
                              <FaEye />
                              View
                            </button>
                          )}
                          <button className="btn btn-sm btn-secondary">
                            <FaDownload />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Analysis Visualization */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div 
              className="analysis-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="analysis-grid">
                <div className="analysis-card">
                  <h4>Quality Distribution</h4>
                  <div className="quality-chart">
                    <div className="chart-bar">
                      <div className="bar-label">90-100%</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill excellent" 
                          style={{ width: `${(reports.filter(r => r.qualityScore >= 90).length / reports.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="bar-value">{reports.filter(r => r.qualityScore >= 90).length}</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">80-89%</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill good" 
                          style={{ width: `${(reports.filter(r => r.qualityScore >= 80 && r.qualityScore < 90).length / reports.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="bar-value">{reports.filter(r => r.qualityScore >= 80 && r.qualityScore < 90).length}</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">70-79%</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill average" 
                          style={{ width: `${(reports.filter(r => r.qualityScore >= 70 && r.qualityScore < 80).length / reports.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="bar-value">{reports.filter(r => r.qualityScore >= 70 && r.qualityScore < 80).length}</div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">&lt;70%</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill poor" 
                          style={{ width: `${(reports.filter(r => r.qualityScore < 70).length / reports.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="bar-value">{reports.filter(r => r.qualityScore < 70).length}</div>
                    </div>
                  </div>
                </div>

                <div className="analysis-card">
                  <h4>ML Model Performance</h4>
                  <div className="performance-metrics">
                    <div className="metric">
                      <span className="metric-label">Average Confidence</span>
                      <span className="metric-value">
                        {reports.filter(r => r.mlConfidence > 0).length > 0 
                          ? `${((reports.filter(r => r.mlConfidence > 0).reduce((sum, r) => sum + r.mlConfidence, 0) / reports.filter(r => r.mlConfidence > 0).length) * 100).toFixed(1)}%`
                          : '0%'
                        }
                      </span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Samples Analyzed</span>
                      <span className="metric-value">{reports.filter(r => r.status === 'completed').length}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Success Rate</span>
                      <span className="metric-value">
                        {reports.length > 0 
                          ? `${((reports.filter(r => r.status === 'completed').length / reports.length) * 100).toFixed(1)}%`
                          : '0%'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              className="modal-content report-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Sample Analysis Report - {selectedReport.sampleId}</h2>
                <button className="modal-close" onClick={() => setSelectedReport(null)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="report-details">
                  <div className="detail-section">
                    <h3>Basic Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <strong>Sample ID:</strong> {selectedReport.sampleId}
                      </div>
                      <div className="detail-item">
                        <strong>Quality Score:</strong> 
                        <span className="quality-score" style={{ 
                          color: selectedReport.qualityScore >= 90 ? 'var(--success-600)' : 
                                 selectedReport.qualityScore >= 80 ? 'var(--warning-500)' : 'var(--error-500)' 
                        }}>
                          {selectedReport.qualityScore}%
                        </span>
                      </div>
                      <div className="detail-item">
                        <strong>ML Confidence:</strong> {(selectedReport.mlConfidence * 100).toFixed(1)}%
                      </div>
                      <div className="detail-item">
                        <strong>Analysis Date:</strong> {selectedReport.timestamp}
                      </div>
                    </div>
                  </div>

                  {selectedReport.parameters && (
                    <div className="detail-section">
                      <h3>Quality Parameters</h3>
                      <div className="parameters-grid">
                        <div className="parameter-card">
                          <h4>Purity</h4>
                          <div className="parameter-value">{selectedReport.parameters.purity.toFixed(1)}%</div>
                        </div>
                        <div className="parameter-card">
                          <h4>Potency</h4>
                          <div className="parameter-value">{selectedReport.parameters.potency.toFixed(1)}%</div>
                        </div>
                        <div className="parameter-card">
                          <h4>Stability</h4>
                          <div className="parameter-value">{selectedReport.parameters.stability.toFixed(1)}%</div>
                        </div>
                        <div className="parameter-card">
                          <h4>Contamination</h4>
                          <div className="parameter-value">{selectedReport.parameters.contamination.toFixed(2)}%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="detail-section">
                    <h3>Analysis Results</h3>
                    <div className="result-content">
                      <p><strong>Spectroscopy Result:</strong> {selectedReport.result}</p>
                      <p><strong>Interpretation:</strong> {selectedReport.interpretation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedReport(null)}>
                  Close
                </button>
                <button className="btn btn-primary">
                  <FaDownload />
                  Export Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lab;

// pages/Manufacturer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaIndustry, 
  FaPills, 
  FaChartLine, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaUser,
  FaTimes,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaBell,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaQrcode,
  FaLink,
  FaCog,
  FaTruck,
  FaBox,
  FaTag,
  FaFlask,
  FaThermometerHalf,
  FaWeightHanging,
  FaClock,
  FaCertificate
} from 'react-icons/fa';
import Notification from '../components/Notification';
import DashboardStats from '../components/DashboardStats';
import './css/manufacturer.css';

const Manufacturer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [batches, setBatches] = useState([]);
  const [production, setProduction] = useState([]);
  const [quality, setQuality] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [batch, setBatch] = useState({ 
    name: '', 
    batchNo: '', 
    formulation: '', 
    quantity: '',
    productionDate: '',
    expiryDate: '',
    qualityScore: 0,
    status: 'production'
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockBatches = [
      { 
        id: 1,
        name: 'Paracetamol 500mg', 
        batchNo: 'BATCH-001-2024',
        formulation: 'Tablet',
        quantity: 10000,
        productionDate: '2024-01-10',
        expiryDate: '2027-01-10',
        qualityScore: 98,
        status: 'completed',
        qrCode: 'QR-001-2024',
        blockchainHash: '0x1234567890abcdef'
      },
      { 
        id: 2,
        name: 'Amoxicillin 250mg', 
        batchNo: 'BATCH-002-2024',
        formulation: 'Capsule',
        quantity: 5000,
        productionDate: '2024-01-12',
        expiryDate: '2026-01-12',
        qualityScore: 95,
        status: 'completed',
        qrCode: 'QR-002-2024',
        blockchainHash: '0xabcdef1234567890'
      },
      { 
        id: 3,
        name: 'Omeprazole 20mg', 
        batchNo: 'BATCH-003-2024',
        formulation: 'Tablet',
        quantity: 8000,
        productionDate: '2024-01-15',
        expiryDate: '2027-01-15',
        qualityScore: 97,
        status: 'production',
        qrCode: 'QR-003-2024',
        blockchainHash: '0x7890abcdef123456'
      }
    ];

    const mockProduction = [
      {
        id: 1,
        batchNo: 'BATCH-001-2024',
        medicineName: 'Paracetamol 500mg',
        startDate: '2024-01-10',
        endDate: '2024-01-12',
        quantity: 10000,
        status: 'completed',
        efficiency: 95.5
      },
      {
        id: 2,
        batchNo: 'BATCH-003-2024',
        medicineName: 'Omeprazole 20mg',
        startDate: '2024-01-15',
        endDate: '2024-01-18',
        quantity: 8000,
        status: 'in-progress',
        efficiency: 87.2
      }
    ];

    const mockQuality = [
      {
        id: 1,
        batchNo: 'BATCH-001-2024',
        testType: 'Purity Test',
        result: 'Passed',
        score: 98.5,
        date: '2024-01-12',
        inspector: 'Dr. Sarah Johnson'
      },
      {
        id: 2,
        batchNo: 'BATCH-002-2024',
        testType: 'Potency Test',
        result: 'Passed',
        score: 95.2,
        date: '2024-01-14',
        inspector: 'Dr. Michael Chen'
      }
    ];

    const mockShipments = [
      {
        id: 1,
        batchNo: 'BATCH-001-2024',
        destination: 'City General Hospital',
        quantity: 5000,
        shipDate: '2024-01-15',
        status: 'delivered',
        trackingId: 'TRK-001-2024'
      },
      {
        id: 2,
        batchNo: 'BATCH-002-2024',
        destination: 'MediPharm Pharmacy',
        quantity: 3000,
        shipDate: '2024-01-16',
        status: 'in-transit',
        trackingId: 'TRK-002-2024'
      }
    ];

    setBatches(mockBatches);
    setProduction(mockProduction);
    setQuality(mockQuality);
    setShipments(mockShipments);
  }, []);

  const handleChange = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  const handleAddBatch = () => {
    if (!batch.name || !batch.batchNo || !batch.formulation) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const newBatch = {
      ...batch,
      id: Date.now(),
      qrCode: `QR-${batch.batchNo}`,
      blockchainHash: `0x${Math.random().toString(16).substr(2, 16)}`,
      qualityScore: Math.floor(Math.random() * 20) + 80
    };

    setBatches([newBatch, ...batches]);
    setBatch({ name: '', batchNo: '', formulation: '', quantity: '', productionDate: '', expiryDate: '', qualityScore: 0, status: 'production' });
    setNotification({ show: true, message: 'Batch created successfully!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success-600)';
      case 'production': return 'var(--primary-600)';
      case 'in-progress': return 'var(--warning-500)';
      case 'delivered': return 'var(--success-600)';
      case 'in-transit': return 'var(--warning-500)';
      case 'passed': return 'var(--success-600)';
      case 'failed': return 'var(--error-500)';
      default: return 'var(--gray-500)';
    }
  };

  const filteredBatches = batches.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const manufacturerStats = {
    totalBatches: batches.length,
    completedBatches: batches.filter(b => b.status === 'completed').length,
    inProductionBatches: batches.filter(b => b.status === 'production').length,
    averageQualityScore: Math.round(batches.reduce((sum, b) => sum + b.qualityScore, 0) / batches.length),
    totalShipments: shipments.length,
    deliveredShipments: shipments.filter(s => s.status === 'delivered').length,
    systemHealth: 99.2
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
        className="manufacturer-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="manufacturer-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <h2>Manufacturing Management System</h2>
            <p>Advanced production control and quality assurance platform</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">
              <FaBell />
              Alerts
            </button>
          </div>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DashboardStats stats={manufacturerStats} />
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="nav-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine />
            Dashboard
          </button>
          <button 
            className={`nav-tab ${activeTab === 'batches' ? 'active' : ''}`}
            onClick={() => setActiveTab('batches')}
          >
            <FaPills />
            Batches
          </button>
          <button 
            className={`nav-tab ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            <FaIndustry />
            Production
          </button>
          <button 
            className={`nav-tab ${activeTab === 'quality' ? 'active' : ''}`}
            onClick={() => setActiveTab('quality')}
          >
            <FaShieldAlt />
            Quality
          </button>
          <button 
            className={`nav-tab ${activeTab === 'shipments' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipments')}
          >
            <FaTruck />
            Shipments
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="dashboard-overview">
                <div className="overview-card">
                  <h3>Production Overview</h3>
                  <div className="production-stats">
                    <div className="stat-item">
                      <FaIndustry />
                      <div>
                        <h4>{production.filter(p => p.status === 'in-progress').length}</h4>
                        <p>Active Production</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FaCheckCircle />
                      <div>
                        <h4>{production.filter(p => p.status === 'completed').length}</h4>
                        <p>Completed Today</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FaThermometerHalf />
                      <div>
                        <h4>{Math.round(production.reduce((sum, p) => sum + p.efficiency, 0) / production.length)}%</h4>
                        <p>Avg Efficiency</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>Quality Metrics</h3>
                  <div className="quality-metrics">
                    <div className="metric-item">
                      <FaShieldAlt />
                      <div>
                        <h4>{quality.filter(q => q.result === 'Passed').length}</h4>
                        <p>Tests Passed</p>
                      </div>
                    </div>
                    <div className="metric-item">
                      <FaCertificate />
                      <div>
                        <h4>{Math.round(quality.reduce((sum, q) => sum + q.score, 0) / quality.length)}%</h4>
                        <p>Avg Quality Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'batches' && (
            <motion.div
              key="batches"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Batch Management</h3>
                <div className="header-actions">
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search batches..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">
                    <FaPlus />
                    New Batch
                  </button>
                </div>
              </div>

              <div className="batches-grid">
                {filteredBatches.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="batch-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="batch-header">
                      <h4>{item.name}</h4>
                      <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="batch-info">
                      <div className="info-item">
                        <FaTag />
                        <span>Batch: {item.batchNo}</span>
                      </div>
                      <div className="info-item">
                        <FaFlask />
                        <span>{item.formulation}</span>
                      </div>
                      <div className="info-item">
                        <FaBox />
                        <span>Qty: {item.quantity.toLocaleString()}</span>
                      </div>
                      <div className="info-item">
                        <FaCheckCircle />
                        <span>Quality: {item.qualityScore}%</span>
                      </div>
                    </div>
                    <div className="batch-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaQrcode />
                        QR Code
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaLink />
                        Blockchain
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaEye />
                        View
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'production' && (
            <motion.div
              key="production"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Production Lines</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Production
                </button>
              </div>

              <div className="production-table">
                <table>
                  <thead>
                    <tr>
                      <th>Batch No</th>
                      <th>Medicine</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Efficiency</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {production.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`production-row ${item.status}`}
                      >
                        <td>{item.batchNo}</td>
                        <td>{item.medicineName}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.quantity.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <span className="efficiency-score">{item.efficiency}%</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-primary">
                              <FaEye />
                            </button>
                            <button className="btn btn-sm btn-secondary">
                              <FaCog />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'quality' && (
            <motion.div
              key="quality"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Quality Control</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Test
                </button>
              </div>

              <div className="quality-grid">
                {quality.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="quality-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="quality-header">
                      <h4>{item.testType}</h4>
                      <span className={`status-badge ${item.result}`} style={{ color: getStatusColor(item.result) }}>
                        {item.result}
                      </span>
                    </div>
                    <div className="quality-info">
                      <div className="info-item">
                        <FaTag />
                        <span>Batch: {item.batchNo}</span>
                      </div>
                      <div className="info-item">
                        <FaCheckCircle />
                        <span>Score: {item.score}%</span>
                      </div>
                      <div className="info-item">
                        <FaCalendarAlt />
                        <span>{item.date}</span>
                      </div>
                      <div className="info-item">
                        <FaUser />
                        <span>{item.inspector}</span>
                      </div>
                    </div>
                    <div className="quality-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        View Report
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaDownload />
                        Certificate
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'shipments' && (
            <motion.div
              key="shipments"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Shipment Tracking</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Shipment
                </button>
              </div>

              <div className="shipments-grid">
                {shipments.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="shipment-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="shipment-header">
                      <h4>{item.batchNo}</h4>
                      <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="shipment-info">
                      <div className="info-item">
                        <FaMapMarkerAlt />
                        <span>{item.destination}</span>
                      </div>
                      <div className="info-item">
                        <FaBox />
                        <span>Qty: {item.quantity.toLocaleString()}</span>
                      </div>
                      <div className="info-item">
                        <FaCalendarAlt />
                        <span>Ship Date: {item.shipDate}</span>
                      </div>
                      <div className="info-item">
                        <FaTruck />
                        <span>Tracking: {item.trackingId}</span>
                      </div>
                    </div>
                    <div className="shipment-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        Track
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Manufacturer;

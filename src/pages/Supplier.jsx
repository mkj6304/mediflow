// pages/Supplier.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTruck, 
  FaPills, 
  FaChartLine, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaCheckCircle,
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
  FaRoute,
  FaBox,
  FaTag,
  FaThermometerHalf,
  FaWeightHanging,
  FaClock,
  FaCertificate,
  FaIndustry,
  FaWarehouse,
  FaShippingFast,
  FaLocationArrow,
  FaUser
} from 'react-icons/fa';
import Notification from '../components/Notification';
import DashboardStats from '../components/DashboardStats';
import './css/supplier.css';

const Supplier = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [supplies, setSupplies] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [newSupply, setNewSupply] = useState({ 
    medicine: '', 
    from: '', 
    quantity: '',
    batchNumber: '',
    expiryDate: '',
    qualityScore: 0,
    deliveryStatus: 'pending'
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockSupplies = [
      { 
        id: 1,
        medicine: 'Paracetamol 500mg', 
        from: 'PharmaCorp',
        quantity: 5000,
        batchNumber: 'BATCH-001-2024',
        expiryDate: '2027-01-10',
        qualityScore: 98,
        deliveryStatus: 'delivered',
        deliveryDate: '2024-01-15',
        destination: 'City General Hospital'
      },
      { 
        id: 2,
        medicine: 'Amoxicillin 250mg', 
        from: 'MediLab',
        quantity: 3000,
        batchNumber: 'BATCH-002-2024',
        expiryDate: '2026-01-12',
        qualityScore: 95,
        deliveryStatus: 'in-transit',
        deliveryDate: '2024-01-18',
        destination: 'MediPharm Pharmacy'
      },
      { 
        id: 3,
        medicine: 'Omeprazole 20mg', 
        from: 'HealthFirst',
        quantity: 2000,
        batchNumber: 'BATCH-003-2024',
        expiryDate: '2027-01-15',
        qualityScore: 97,
        deliveryStatus: 'pending',
        deliveryDate: '2024-01-20',
        destination: 'Regional Medical Center'
      }
    ];

    const mockDeliveries = [
      {
        id: 1,
        trackingId: 'TRK-001-2024',
        medicine: 'Paracetamol 500mg',
        quantity: 5000,
        destination: 'City General Hospital',
        status: 'delivered',
        startDate: '2024-01-15',
        endDate: '2024-01-15',
        driver: 'John Smith',
        vehicle: 'TRK-001'
      },
      {
        id: 2,
        trackingId: 'TRK-002-2024',
        medicine: 'Amoxicillin 250mg',
        quantity: 3000,
        destination: 'MediPharm Pharmacy',
        status: 'in-transit',
        startDate: '2024-01-16',
        endDate: '2024-01-18',
        driver: 'Maria Garcia',
        vehicle: 'TRK-002'
      }
    ];

    const mockInventory = [
      {
        id: 1,
        medicine: 'Paracetamol 500mg',
        quantity: 15000,
        location: 'Warehouse A',
        temperature: '22°C',
        humidity: '45%',
        status: 'available'
      },
      {
        id: 2,
        medicine: 'Amoxicillin 250mg',
        quantity: 8000,
        location: 'Warehouse B',
        temperature: '20°C',
        humidity: '42%',
        status: 'available'
      }
    ];

    const mockRoutes = [
      {
        id: 1,
        routeName: 'North Route',
        destinations: ['City General Hospital', 'Regional Medical Center'],
        distance: '150 km',
        estimatedTime: '3 hours',
        status: 'active',
        driver: 'John Smith'
      },
      {
        id: 2,
        routeName: 'South Route',
        destinations: ['MediPharm Pharmacy', 'Community Clinic'],
        distance: '120 km',
        estimatedTime: '2.5 hours',
        status: 'active',
        driver: 'Maria Garcia'
      }
    ];

    setSupplies(mockSupplies);
    setDeliveries(mockDeliveries);
    setInventory(mockInventory);
    setRoutes(mockRoutes);
  }, []);

  const handleChange = (e) => {
    setNewSupply({ ...newSupply, [e.target.name]: e.target.value });
  };

  const handleDeliver = () => {
    if (!newSupply.medicine || !newSupply.from || !newSupply.quantity) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const supply = {
      ...newSupply,
      id: Date.now(),
      deliveryDate: new Date().toISOString().split('T')[0],
      qualityScore: Math.floor(Math.random() * 20) + 80
    };

    setSupplies([supply, ...supplies]);
    setNewSupply({ medicine: '', from: '', quantity: '', batchNumber: '', expiryDate: '', qualityScore: 0, deliveryStatus: 'pending' });
    setNotification({ show: true, message: 'Supply recorded successfully!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'var(--success-600)';
      case 'in-transit': return 'var(--warning-500)';
      case 'pending': return 'var(--gray-500)';
      case 'available': return 'var(--success-600)';
      case 'low': return 'var(--warning-500)';
      case 'active': return 'var(--success-600)';
      default: return 'var(--gray-500)';
    }
  };

  const filteredSupplies = supplies.filter(item =>
    item.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const supplierStats = {
    totalSupplies: supplies.length,
    deliveredSupplies: supplies.filter(s => s.deliveryStatus === 'delivered').length,
    inTransitSupplies: supplies.filter(s => s.deliveryStatus === 'in-transit').length,
    totalDeliveries: deliveries.length,
    activeRoutes: routes.filter(r => r.status === 'active').length,
    totalInventory: inventory.reduce((sum, item) => sum + item.quantity, 0),
    systemHealth: 98.7
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
        className="supplier-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="supplier-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <h2>Logistics & Supply Management</h2>
            <p>Comprehensive delivery tracking and inventory management platform</p>
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
          <DashboardStats stats={supplierStats} />
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
            className={`nav-tab ${activeTab === 'supplies' ? 'active' : ''}`}
            onClick={() => setActiveTab('supplies')}
          >
            <FaPills />
            Supplies
          </button>
          <button 
            className={`nav-tab ${activeTab === 'deliveries' ? 'active' : ''}`}
            onClick={() => setActiveTab('deliveries')}
          >
            <FaTruck />
            Deliveries
          </button>
          <button 
            className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaWarehouse />
            Inventory
          </button>
          <button 
            className={`nav-tab ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            <FaRoute />
            Routes
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
                  <h3>Delivery Overview</h3>
                  <div className="delivery-stats">
                    <div className="stat-item">
                      <FaTruck />
                      <div>
                        <h4>{deliveries.filter(d => d.status === 'in-transit').length}</h4>
                        <p>Active Deliveries</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FaCheckCircle />
                      <div>
                        <h4>{deliveries.filter(d => d.status === 'delivered').length}</h4>
                        <p>Completed Today</p>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FaRoute />
                      <div>
                        <h4>{routes.filter(r => r.status === 'active').length}</h4>
                        <p>Active Routes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary">
                      <FaPlus />
                      Record Supply
                    </button>
                    <button className="btn btn-secondary">
                      <FaTruck />
                      New Delivery
                    </button>
                    <button className="btn btn-success">
                      <FaDownload />
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'supplies' && (
            <motion.div
              key="supplies"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Supply Management</h3>
                <div className="header-actions">
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search supplies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">
                    <FaPlus />
                    Record Supply
                  </button>
                </div>
              </div>

              <div className="supplies-grid">
                {filteredSupplies.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="supply-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="supply-header">
                      <h4>{item.medicine}</h4>
                      <span className={`status-badge ${item.deliveryStatus}`} style={{ color: getStatusColor(item.deliveryStatus) }}>
                        {item.deliveryStatus}
                      </span>
                    </div>
                    <div className="supply-info">
                      <div className="info-item">
                        <FaIndustry />
                        <span>From: {item.from}</span>
                      </div>
                      <div className="info-item">
                        <FaBox />
                        <span>Qty: {item.quantity.toLocaleString()}</span>
                      </div>
                      <div className="info-item">
                        <FaTag />
                        <span>Batch: {item.batchNumber}</span>
                      </div>
                      <div className="info-item">
                        <FaCheckCircle />
                        <span>Quality: {item.qualityScore}%</span>
                      </div>
                    </div>
                    <div className="supply-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        Track
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaEdit />
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'deliveries' && (
            <motion.div
              key="deliveries"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Delivery Tracking</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Delivery
                </button>
              </div>

              <div className="deliveries-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tracking ID</th>
                      <th>Medicine</th>
                      <th>Destination</th>
                      <th>Driver</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`delivery-row ${item.status}`}
                      >
                        <td>{item.trackingId}</td>
                        <td>{item.medicine}</td>
                        <td>{item.destination}</td>
                        <td>{item.driver}</td>
                        <td>
                          <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.startDate}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-primary">
                              <FaLocationArrow />
                            </button>
                            <button className="btn btn-sm btn-secondary">
                              <FaEye />
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

          {activeTab === 'inventory' && (
            <motion.div
              key="inventory"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Warehouse Inventory</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  Add Stock
                </button>
              </div>

              <div className="inventory-grid">
                {inventory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="inventory-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="inventory-header">
                      <h4>{item.medicine}</h4>
                      <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="inventory-info">
                      <div className="info-item">
                        <FaBox />
                        <span>Qty: {item.quantity.toLocaleString()}</span>
                      </div>
                      <div className="info-item">
                        <FaWarehouse />
                        <span>Location: {item.location}</span>
                      </div>
                      <div className="info-item">
                        <FaThermometerHalf />
                        <span>Temp: {item.temperature}</span>
                      </div>
                      <div className="info-item">
                        <FaWeightHanging />
                        <span>Humidity: {item.humidity}</span>
                      </div>
                    </div>
                    <div className="inventory-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        Monitor
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaEdit />
                        Update
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'routes' && (
            <motion.div
              key="routes"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Delivery Routes</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Route
                </button>
              </div>

              <div className="routes-grid">
                {routes.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="route-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="route-header">
                      <h4>{item.routeName}</h4>
                      <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="route-info">
                      <div className="info-item">
                        <FaMapMarkerAlt />
                        <span>Destinations: {item.destinations.join(', ')}</span>
                      </div>
                      <div className="info-item">
                        <FaRoute />
                        <span>Distance: {item.distance}</span>
                      </div>
                      <div className="info-item">
                        <FaClock />
                        <span>ETA: {item.estimatedTime}</span>
                      </div>
                      <div className="info-item">
                        <FaUser />
                        <span>Driver: {item.driver}</span>
                      </div>
                    </div>
                    <div className="route-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        Track
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaEdit />
                        Edit
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

export default Supplier;
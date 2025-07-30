// pages/Hospital.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHospital, 
  FaUserInjured, 
  FaPills, 
  FaChartLine, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
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
  FaEnvelope
} from 'react-icons/fa';
import Notification from '../components/Notification';
import DashboardStats from '../components/DashboardStats';
import './css/hospital.css';

const Hospital = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medicines, setMedicines] = useState([]);
  const [patients, setPatients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ 
    name: '', 
    quantity: '', 
    manufacturer: '', 
    category: '',
    expiryDate: '',
    qualityScore: 0
  });
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    contact: '',
    diagnosis: '',
    assignedDoctor: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockMedicines = [
      { 
        id: 1,
        name: 'Paracetamol 500mg', 
        quantity: 150, 
        manufacturer: 'PharmaCorp',
        category: 'Painkiller',
        expiryDate: '2025-12-31',
        qualityScore: 95,
        status: 'available'
      },
      { 
        id: 2,
        name: 'Amoxicillin 250mg', 
        quantity: 75, 
        manufacturer: 'MediLab',
        category: 'Antibiotic',
        expiryDate: '2025-08-15',
        qualityScore: 88,
        status: 'available'
      },
      { 
        id: 3,
        name: 'Omeprazole 20mg', 
        quantity: 45, 
        manufacturer: 'HealthFirst',
        category: 'Antacid',
        expiryDate: '2025-10-20',
        qualityScore: 92,
        status: 'low'
      }
    ];

    const mockPatients = [
      {
        id: 1,
        name: 'John Smith',
        age: 45,
        contact: '+1-555-0123',
        diagnosis: 'Hypertension',
        assignedDoctor: 'Dr. Sarah Johnson',
        admissionDate: '2024-01-10',
        status: 'admitted',
        room: 'A-101'
      },
      {
        id: 2,
        name: 'Maria Garcia',
        age: 32,
        contact: '+1-555-0456',
        diagnosis: 'Diabetes Type 2',
        assignedDoctor: 'Dr. Michael Chen',
        admissionDate: '2024-01-12',
        status: 'discharged',
        room: 'B-205'
      },
      {
        id: 3,
        name: 'Robert Wilson',
        age: 58,
        contact: '+1-555-0789',
        diagnosis: 'Cardiac Issues',
        assignedDoctor: 'Dr. Emily Davis',
        admissionDate: '2024-01-15',
        status: 'admitted',
        room: 'C-301'
      }
    ];

    const mockOrders = [
      {
        id: 1,
        medicineName: 'Paracetamol 500mg',
        quantity: 50,
        supplier: 'PharmaCorp',
        orderDate: '2024-01-14',
        status: 'pending',
        expectedDelivery: '2024-01-20'
      },
      {
        id: 2,
        medicineName: 'Amoxicillin 250mg',
        quantity: 100,
        supplier: 'MediLab',
        orderDate: '2024-01-13',
        status: 'delivered',
        expectedDelivery: '2024-01-18'
      }
    ];

    setMedicines(mockMedicines);
    setPatients(mockPatients);
    setOrders(mockOrders);
  }, []);

  const handleMedicineChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.quantity) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const medicine = {
      ...newMedicine,
      id: Date.now(),
      status: newMedicine.quantity < 50 ? 'low' : 'available'
    };

    setMedicines([medicine, ...medicines]);
    setNewMedicine({ name: '', quantity: '', manufacturer: '', category: '', expiryDate: '', qualityScore: 0 });
    setNotification({ show: true, message: 'Medicine added to inventory successfully!', type: 'success' });
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const patient = {
      ...newPatient,
      id: Date.now(),
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'admitted',
      room: `A-${Math.floor(Math.random() * 200) + 100}`
    };

    setPatients([patient, ...patients]);
    setNewPatient({ name: '', age: '', contact: '', diagnosis: '', assignedDoctor: '' });
    setNotification({ show: true, message: 'Patient registered successfully!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'var(--success-600)';
      case 'low': return 'var(--warning-500)';
      case 'out': return 'var(--error-500)';
      case 'admitted': return 'var(--primary-600)';
      case 'discharged': return 'var(--success-600)';
      case 'pending': return 'var(--warning-500)';
      case 'delivered': return 'var(--success-600)';
      default: return 'var(--gray-500)';
    }
  };

  const filteredMedicines = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hospitalStats = {
    totalPatients: patients.length,
    admittedPatients: patients.filter(p => p.status === 'admitted').length,
    dischargedPatients: patients.filter(p => p.status === 'discharged').length,
    totalMedicines: medicines.length,
    lowStockMedicines: medicines.filter(m => m.status === 'low').length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    systemHealth: 98.5
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
        className="hospital-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="hospital-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <h2>Hospital Management System</h2>
            <p>Comprehensive patient care and medicine management platform</p>
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
          <DashboardStats stats={hospitalStats} />
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
            className={`nav-tab ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            <FaUserInjured />
            Patients
          </button>
          <button 
            className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaPills />
            Inventory
          </button>
          <button 
            className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaHospital />
            Orders
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
                  <h3>Recent Activities</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <FaUserInjured className="activity-icon" />
                      <div className="activity-content">
                        <p>New patient admitted: John Smith</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <FaPills className="activity-icon" />
                      <div className="activity-content">
                        <p>Medicine order delivered: Amoxicillin</p>
                        <span>1 day ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <FaExclamationTriangle className="activity-icon" />
                      <div className="activity-content">
                        <p>Low stock alert: Omeprazole</p>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary">
                      <FaPlus />
                      Add Patient
                    </button>
                    <button className="btn btn-secondary">
                      <FaPills />
                      Add Medicine
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

          {activeTab === 'patients' && (
            <motion.div
              key="patients"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Patient Management</h3>
                <div className="header-actions">
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={() => setActiveTab('add-patient')}>
                    <FaPlus />
                    Add Patient
                  </button>
                </div>
              </div>

              <div className="patients-grid">
                {filteredPatients.map((patient, index) => (
                  <motion.div
                    key={patient.id}
                    className="patient-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="patient-header">
                      <h4>{patient.name}</h4>
                      <span className={`status-badge ${patient.status}`} style={{ color: getStatusColor(patient.status) }}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="patient-info">
                      <div className="info-item">
                        <FaCalendarAlt />
                        <span>Age: {patient.age}</span>
                      </div>
                      <div className="info-item">
                        <FaMapMarkerAlt />
                        <span>Room: {patient.room}</span>
                      </div>
                      <div className="info-item">
                        <FaPhone />
                        <span>{patient.contact}</span>
                      </div>
                      <div className="info-item">
                        <FaUserInjured />
                        <span>{patient.diagnosis}</span>
                      </div>
                    </div>
                    <div className="patient-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        View
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
                <h3>Medicine Inventory</h3>
                <div className="header-actions">
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary">
                    <FaPlus />
                    Add Medicine
                  </button>
                </div>
              </div>

              <div className="inventory-table">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Quantity</th>
                      <th>Manufacturer</th>
                      <th>Category</th>
                      <th>Quality Score</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicines.map((medicine, index) => (
                      <motion.tr
                        key={medicine.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`medicine-row ${medicine.status}`}
                      >
                        <td>{medicine.name}</td>
                        <td>
                          <span className={`quantity ${medicine.status}`}>
                            {medicine.quantity}
                          </span>
                        </td>
                        <td>{medicine.manufacturer}</td>
                        <td>{medicine.category}</td>
                        <td>
                          <span className="quality-score">
                            {medicine.qualityScore}%
                          </span>
                        </td>
                        <td>{medicine.expiryDate}</td>
                        <td>
                          <span className={`status-badge ${medicine.status}`} style={{ color: getStatusColor(medicine.status) }}>
                            {medicine.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-primary">
                              <FaEye />
                            </button>
                            <button className="btn btn-sm btn-secondary">
                              <FaEdit />
                            </button>
                            <button className="btn btn-sm btn-danger">
                              <FaTrash />
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

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Medicine Orders</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Order
                </button>
              </div>

              <div className="orders-grid">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="order-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="order-header">
                      <h4>{order.medicineName}</h4>
                      <span className={`status-badge ${order.status}`} style={{ color: getStatusColor(order.status) }}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-info">
                      <div className="info-item">
                        <span>Quantity: {order.quantity}</span>
                      </div>
                      <div className="info-item">
                        <span>Supplier: {order.supplier}</span>
                      </div>
                      <div className="info-item">
                        <span>Order Date: {order.orderDate}</span>
                      </div>
                      <div className="info-item">
                        <span>Expected: {order.expectedDelivery}</span>
                      </div>
                    </div>
                    <div className="order-actions">
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

export default Hospital;

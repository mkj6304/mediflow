// pages/Pharmacy.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStore, 
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
  FaShoppingCart,
  FaUser,
  FaCreditCard,
  FaTruck,
  FaBox,
  FaTag
} from 'react-icons/fa';
import Notification from '../components/Notification';
import DashboardStats from '../components/DashboardStats';
import './css/pharmacy.css';

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [medicine, setMedicine] = useState({ 
    name: '', 
    supplier: '', 
    price: '',
    quantity: '',
    category: '',
    expiryDate: '',
    qualityScore: 0,
    authenticated: false 
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockInventory = [
      { 
        id: 1,
        name: 'Paracetamol 500mg', 
        supplier: 'PharmaCorp',
        price: 5.99,
        quantity: 150,
        category: 'Painkiller',
        expiryDate: '2025-12-31',
        qualityScore: 95,
        authenticated: true,
        status: 'available'
      },
      { 
        id: 2,
        name: 'Amoxicillin 250mg', 
        supplier: 'MediLab',
        price: 12.50,
        quantity: 75,
        category: 'Antibiotic',
        expiryDate: '2025-08-15',
        qualityScore: 88,
        authenticated: true,
        status: 'available'
      },
      { 
        id: 3,
        name: 'Omeprazole 20mg', 
        supplier: 'HealthFirst',
        price: 8.75,
        quantity: 45,
        category: 'Antacid',
        expiryDate: '2025-10-20',
        qualityScore: 92,
        authenticated: false,
        status: 'low'
      }
    ];

    const mockSales = [
      {
        id: 1,
        medicineName: 'Paracetamol 500mg',
        quantity: 2,
        total: 11.98,
        customer: 'John Smith',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 2,
        medicineName: 'Amoxicillin 250mg',
        quantity: 1,
        total: 12.50,
        customer: 'Maria Garcia',
        date: '2024-01-14',
        status: 'completed'
      }
    ];

    const mockCustomers = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@email.com',
        phone: '+1-555-0123',
        totalPurchases: 5,
        lastVisit: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria@email.com',
        phone: '+1-555-0456',
        totalPurchases: 3,
        lastVisit: '2024-01-14',
        status: 'active'
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

    setInventory(mockInventory);
    setSales(mockSales);
    setCustomers(mockCustomers);
    setOrders(mockOrders);
  }, []);

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!medicine.name || !medicine.supplier || !medicine.price) {
      setNotification({ show: true, message: 'Please fill in all required fields', type: 'warning' });
      return;
    }

    const newMedicine = {
      ...medicine,
      id: Date.now(),
      status: medicine.quantity < 50 ? 'low' : 'available'
    };

    setInventory([newMedicine, ...inventory]);
    setMedicine({ name: '', supplier: '', price: '', quantity: '', category: '', expiryDate: '', qualityScore: 0, authenticated: false });
    setNotification({ show: true, message: 'Medicine added to inventory successfully!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'var(--success-600)';
      case 'low': return 'var(--warning-500)';
      case 'out': return 'var(--error-500)';
      case 'completed': return 'var(--success-600)';
      case 'pending': return 'var(--warning-500)';
      case 'delivered': return 'var(--success-600)';
      case 'active': return 'var(--success-600)';
      default: return 'var(--gray-500)';
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pharmacyStats = {
    totalMedicines: inventory.length,
    authenticatedMedicines: inventory.filter(m => m.authenticated).length,
    lowStockMedicines: inventory.filter(m => m.status === 'low').length,
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, sale) => sum + sale.total, 0),
    totalCustomers: customers.length,
    systemHealth: 97.8
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
        className="pharmacy-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="pharmacy-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <h2>Pharmacy Management System</h2>
            <p>Comprehensive medicine retail and inventory management platform</p>
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
          <DashboardStats stats={pharmacyStats} />
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
            className={`nav-tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <FaPills />
            Inventory
          </button>
          <button 
            className={`nav-tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            <FaShoppingCart />
            Sales
          </button>
          <button 
            className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <FaUser />
            Customers
          </button>
          <button 
            className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaTruck />
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
                  <h3>Recent Sales</h3>
                  <div className="sales-list">
                    {sales.slice(0, 5).map((sale, index) => (
                      <div key={sale.id} className="sale-item">
                        <FaShoppingCart className="sale-icon" />
                        <div className="sale-content">
                          <p>{sale.medicineName} - ${sale.total}</p>
                          <span>{sale.customer} • {sale.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overview-card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary">
                      <FaPlus />
                      Add Medicine
                    </button>
                    <button className="btn btn-secondary">
                      <FaShoppingCart />
                      New Sale
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

              <div className="inventory-grid">
                {filteredInventory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="medicine-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="medicine-header">
                      <h4>{item.name}</h4>
                      <span className={`status-badge ${item.status}`} style={{ color: getStatusColor(item.status) }}>
                        {item.status}
                      </span>
                    </div>
                    <div className="medicine-info">
                      <div className="info-item">
                        <FaTag />
                        <span>${item.price}</span>
                      </div>
                      <div className="info-item">
                        <FaBox />
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="info-item">
                        <FaShieldAlt />
                        <span>{item.authenticated ? 'Authenticated' : 'Not Authenticated'}</span>
                      </div>
                      <div className="info-item">
                        <FaCheckCircle />
                        <span>Quality: {item.qualityScore}%</span>
                      </div>
                    </div>
                    <div className="medicine-actions">
                      <button className="btn btn-sm btn-primary">
                        <FaEye />
                        View
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <FaEdit />
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <FaTrash />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'sales' && (
            <motion.div
              key="sales"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Sales History</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  New Sale
                </button>
              </div>

              <div className="sales-table">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale, index) => (
                      <motion.tr
                        key={sale.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="sale-row"
                      >
                        <td>{sale.medicineName}</td>
                        <td>{sale.quantity}</td>
                        <td>${sale.total}</td>
                        <td>{sale.customer}</td>
                        <td>{sale.date}</td>
                        <td>
                          <span className={`status-badge ${sale.status}`} style={{ color: getStatusColor(sale.status) }}>
                            {sale.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-primary">
                              <FaEye />
                            </button>
                            <button className="btn btn-sm btn-secondary">
                              <FaDownload />
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

          {activeTab === 'customers' && (
            <motion.div
              key="customers"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="section-header">
                <h3>Customer Management</h3>
                <button className="btn btn-primary">
                  <FaPlus />
                  Add Customer
                </button>
              </div>

              <div className="customers-grid">
                {customers.map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    className="customer-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="customer-header">
                      <h4>{customer.name}</h4>
                      <span className={`status-badge ${customer.status}`} style={{ color: getStatusColor(customer.status) }}>
                        {customer.status}
                      </span>
                    </div>
                    <div className="customer-info">
                      <div className="info-item">
                        <FaEnvelope />
                        <span>{customer.email}</span>
                      </div>
                      <div className="info-item">
                        <FaPhone />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="info-item">
                        <FaShoppingCart />
                        <span>Purchases: {customer.totalPurchases}</span>
                      </div>
                      <div className="info-item">
                        <FaCalendarAlt />
                        <span>Last Visit: {customer.lastVisit}</span>
                      </div>
                    </div>
                    <div className="customer-actions">
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

export default Pharmacy;
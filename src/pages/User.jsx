// pages/User.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaCamera, 
  FaFilter, 
  FaStar, 
  FaShoppingCart, 
  FaExclamationTriangle,
  FaEye,
  FaDownload,
  FaHeart,
  FaShare,
  FaMapMarkerAlt,
  FaPhone,
  FaClock
} from 'react-icons/fa';
import Notification from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';
import MedicineModal from '../components/MedicineModal';
import './css/user.css';

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('text'); // 'text' or 'image'
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [order, setOrder] = useState('');
  const [complaint, setComplaint] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Enhanced mock data
  useEffect(() => {
    const mockMedicines = [
      { 
        id: 1,
        name: 'Paracetamol 500mg', 
        quality: 'A+', 
        qualityScore: 95,
        category: 'Painkiller',
        manufacturer: 'ABC Pharma',
        price: 2.50,
        stock: 150,
        rating: 4.8,
        reviews: 124,
        image: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=P',
        description: 'Effective pain relief for headaches and fever',
        sideEffects: ['Nausea', 'Stomach upset'],
        dosage: '1-2 tablets every 4-6 hours',
        expiryDate: '2025-12-31'
      },
      { 
        id: 2,
        name: 'Ibuprofen 400mg', 
        quality: 'A', 
        qualityScore: 88,
        category: 'Anti-inflammatory',
        manufacturer: 'XYZ Labs',
        price: 3.20,
        stock: 89,
        rating: 4.6,
        reviews: 89,
        image: 'https://via.placeholder.com/150x150/22C55E/FFFFFF?text=I',
        description: 'Anti-inflammatory medication for pain and swelling',
        sideEffects: ['Stomach irritation', 'Dizziness'],
        dosage: '1 tablet every 6-8 hours',
        expiryDate: '2025-10-15'
      },
      { 
        id: 3,
        name: 'Cetirizine 10mg', 
        quality: 'B+', 
        qualityScore: 82,
        category: 'Antihistamine',
        manufacturer: 'MedCorp',
        price: 1.80,
        stock: 200,
        rating: 4.4,
        reviews: 67,
        image: 'https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=C',
        description: 'Relieves allergy symptoms and hay fever',
        sideEffects: ['Drowsiness', 'Dry mouth'],
        dosage: '1 tablet daily',
        expiryDate: '2026-03-20'
      },
      { 
        id: 4,
        name: 'Omeprazole 20mg', 
        quality: 'A+', 
        qualityScore: 92,
        category: 'Antacid',
        manufacturer: 'HealthFirst',
        price: 4.50,
        stock: 75,
        rating: 4.9,
        reviews: 156,
        image: 'https://via.placeholder.com/150x150/EF4444/FFFFFF?text=O',
        description: 'Reduces stomach acid production',
        sideEffects: ['Headache', 'Diarrhea'],
        dosage: '1 capsule daily before breakfast',
        expiryDate: '2025-08-30'
      }
    ];
    setResults(mockMedicines);
    setFilteredResults(mockMedicines);
  }, []);

  // Enhanced search and filter
  useEffect(() => {
    let filtered = results.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           med.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
      const matchesQuality = selectedQuality === 'all' || med.quality === selectedQuality;
      
      return matchesSearch && matchesCategory && matchesQuality;
    });
    
    setFilteredResults(filtered);
  }, [searchTerm, selectedCategory, selectedQuality, results]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsSearching(true);
        setNotification({ show: true, message: 'Image uploaded successfully! Analyzing...', type: 'info' });
        // Simulate image search
        setTimeout(() => {
          setIsSearching(false);
          // Mock image search results
          setFilteredResults(results.filter(med => med.quality === 'A+' || med.quality === 'A'));
          setNotification({ show: true, message: `Found ${results.filter(med => med.quality === 'A+' || med.quality === 'A').length} high-quality medicines!`, type: 'success' });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOrder = () => {
    if (order.trim()) {
      setNotification({ show: true, message: `Order placed successfully for: ${order}`, type: 'success' });
      setOrder('');
    } else {
      setNotification({ show: true, message: 'Please enter a medicine name', type: 'warning' });
    }
  };

  const handleComplaint = () => {
    if (complaint.trim()) {
      setNotification({ show: true, message: 'Complaint submitted successfully! We will review it shortly.', type: 'success' });
      setComplaint('');
    } else {
      setNotification({ show: true, message: 'Please describe your issue', type: 'warning' });
    }
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'A+': return 'var(--success-600)';
      case 'A': return 'var(--success-500)';
      case 'B+': return 'var(--warning-500)';
      case 'B': return 'var(--warning-600)';
      case 'C': return 'var(--error-500)';
      default: return 'var(--gray-500)';
    }
  };

  const categories = ['all', 'Painkiller', 'Anti-inflammatory', 'Antihistamine', 'Antacid'];
  const qualities = ['all', 'A+', 'A', 'B+', 'B', 'C'];

  return (
    <div className="container">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.show}
        onClose={closeNotification}
      />
      <motion.div 
        className="user-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="user-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2>User Dashboard</h2>
          <p>Search medicines, place orders, and manage your healthcare needs</p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-tabs">
            <button 
              className={`search-tab ${searchType === 'text' ? 'active' : ''}`}
              onClick={() => setSearchType('text')}
            >
              <FaSearch />
              Text Search
            </button>
            <button 
              className={`search-tab ${searchType === 'image' ? 'active' : ''}`}
              onClick={() => setSearchType('image')}
            >
              <FaCamera />
              Image Search
            </button>
          </div>

          {searchType === 'text' ? (
            <div className="search-input-group">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search medicines, manufacturers, or categories..."
                />
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                Filters
              </button>
            </div>
          ) : (
            <div className="image-search-section">
              <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
                ) : (
                  <div className="upload-placeholder">
                    <FaCamera />
                    <p>Click to upload medicine image</p>
                    <span>Supports JPG, PNG, GIF</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="filters-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filter-group">
                  <label>Category:</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label>Quality:</label>
                  <select 
                    value={selectedQuality} 
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="filter-select"
                  >
                    {qualities.map(qual => (
                      <option key={qual} value={qual}>
                        {qual === 'all' ? 'All Qualities' : qual}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search Results */}
        <motion.div 
          className="results-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="results-header">
            <h3>Search Results ({filteredResults.length})</h3>
            {isSearching && (
              <LoadingSpinner size="small" message="Analyzing image..." />
            )}
          </div>

          <div className="medicine-grid">
            <AnimatePresence>
              {filteredResults.map((med, idx) => (
                <motion.div
                  key={med.id}
                  className="medicine-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="medicine-image">
                    <img src={med.image} alt={med.name} />
                    <div className="quality-badge" style={{ backgroundColor: getQualityColor(med.quality) }}>
                      {med.quality}
                    </div>
                  </div>
                  
                  <div className="medicine-info">
                    <h4>{med.name}</h4>
                    <p className="manufacturer">{med.manufacturer}</p>
                    <p className="description">{med.description}</p>
                    
                    <div className="medicine-stats">
                      <div className="stat">
                        <FaStar className="stat-icon" />
                        <span>{med.rating} ({med.reviews} reviews)</span>
                      </div>
                      <div className="stat">
                        <FaMapMarkerAlt className="stat-icon" />
                        <span>In Stock: {med.stock}</span>
                      </div>
                    </div>

                    <div className="medicine-price">
                      <span className="price">${med.price}</span>
                      <span className="quality-score">Quality Score: {med.qualityScore}%</span>
                    </div>

                    <div className="medicine-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleViewDetails(med)}
                      >
                        <FaEye />
                        View Details
                      </button>
                      <button className="btn btn-success btn-sm">
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="action-cards">
            <div className="action-card">
              <h4>Quick Order</h4>
              <div className="action-input-group">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter medicine name"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                />
                <button onClick={handleOrder} className="btn btn-primary">
                  <FaShoppingCart />
                  Order
                </button>
              </div>
            </div>

            <div className="action-card">
              <h4>Report Issue</h4>
              <textarea
                className="input"
                rows="3"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Describe your issue..."
              ></textarea>
              <button onClick={handleComplaint} className="btn btn-warning">
                <FaExclamationTriangle />
                Submit
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <MedicineModal
        medicine={selectedMedicine}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default User;
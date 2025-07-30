import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import './medicine-modal.css';

const MedicineModal = ({ medicine, isOpen, onClose }) => {
  if (!medicine) return null;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{medicine.name}</h2>
              <button className="modal-close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="medicine-detail-grid">
                <div className="medicine-image-section">
                  <img src={medicine.image} alt={medicine.name} className="detail-image" />
                  <div className="quality-badge" style={{ backgroundColor: getQualityColor(medicine.quality) }}>
                    Quality: {medicine.quality}
                  </div>
                </div>

                <div className="medicine-info-section">
                  <div className="info-group">
                    <h3>Basic Information</h3>
                    <div className="info-item">
                      <strong>Manufacturer:</strong> {medicine.manufacturer}
                    </div>
                    <div className="info-item">
                      <strong>Category:</strong> {medicine.category}
                    </div>
                    <div className="info-item">
                      <strong>Quality Score:</strong> {medicine.qualityScore}%
                    </div>
                    <div className="info-item">
                      <strong>Price:</strong> ${medicine.price}
                    </div>
                  </div>

                  <div className="info-group">
                    <h3>Description</h3>
                    <p>{medicine.description}</p>
                  </div>

                  <div className="info-group">
                    <h3>Dosage Information</h3>
                    <div className="info-item">
                      <strong>Recommended Dosage:</strong> {medicine.dosage}
                    </div>
                  </div>

                  <div className="info-group">
                    <h3>Side Effects</h3>
                    <ul className="side-effects-list">
                      {medicine.sideEffects.map((effect, index) => (
                        <li key={index}>
                          <FaExclamationTriangle className="warning-icon" />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-group">
                    <h3>Additional Details</h3>
                    <div className="info-item">
                      <FaMapMarkerAlt className="info-icon" />
                      <strong>Stock Available:</strong> {medicine.stock} units
                    </div>
                    <div className="info-item">
                      <FaStar className="info-icon" />
                      <strong>Rating:</strong> {medicine.rating}/5 ({medicine.reviews} reviews)
                    </div>
                    <div className="info-item">
                      <FaCalendarAlt className="info-icon" />
                      <strong>Expiry Date:</strong> {medicine.expiryDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button className="btn btn-primary">
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MedicineModal; 
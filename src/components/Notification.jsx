import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './notification.css';

const Notification = ({ message, type = 'info', isVisible, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaExclamationTriangle />;
      default:
        return <FaInfoCircle />;
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      default:
        return 'notification-info';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`notification ${getTypeClass()}`}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="notification-icon">
            {getIcon()}
          </div>
          <div className="notification-content">
            <p>{message}</p>
          </div>
          <button className="notification-close" onClick={onClose}>
            <FaTimes />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 
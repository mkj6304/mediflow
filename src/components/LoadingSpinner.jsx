import React from 'react';
import { motion } from 'framer-motion';
import './loading-spinner.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'spinner-small';
      case 'large':
        return 'spinner-large';
      default:
        return 'spinner-medium';
    }
  };

  return (
    <div className="loading-container">
      <motion.div
        className={`loading-spinner ${getSizeClass()}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFlask, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle,
  FaChartLine,
  FaUsers,
  FaShieldAlt
} from 'react-icons/fa';
import './dashboard-stats.css';

const DashboardStats = ({ stats }) => {
  const defaultStats = {
    totalSamples: 156,
    completedAnalysis: 142,
    pendingAnalysis: 14,
    failedAnalysis: 2,
    averageQuality: 87.5,
    activeUsers: 23,
    systemHealth: 98.2
  };

  const currentStats = stats || defaultStats;

  const statCards = [
    {
      icon: FaFlask,
      title: 'Total Samples',
      value: currentStats.totalSamples,
      color: 'var(--primary-500)',
      trend: '+12%',
      trendUp: true
    },
    {
      icon: FaCheckCircle,
      title: 'Completed',
      value: currentStats.completedAnalysis,
      color: 'var(--success-500)',
      trend: '+8%',
      trendUp: true
    },
    {
      icon: FaClock,
      title: 'Pending',
      value: currentStats.pendingAnalysis,
      color: 'var(--warning-500)',
      trend: '-5%',
      trendUp: false
    },
    {
      icon: FaExclamationTriangle,
      title: 'Failed',
      value: currentStats.failedAnalysis,
      color: 'var(--error-500)',
      trend: '-2%',
      trendUp: true
    },
    {
      icon: FaChartLine,
      title: 'Avg Quality',
      value: `${currentStats.averageQuality}%`,
      color: 'var(--success-600)',
      trend: '+3.2%',
      trendUp: true
    },
    {
      icon: FaUsers,
      title: 'Active Users',
      value: currentStats.activeUsers,
      color: 'var(--primary-600)',
      trend: '+15%',
      trendUp: true
    },
    {
      icon: FaShieldAlt,
      title: 'System Health',
      value: `${currentStats.systemHealth}%`,
      color: 'var(--success-500)',
      trend: '+0.5%',
      trendUp: true
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <div className={`stat-trend ${stat.trendUp ? 'positive' : 'negative'}`}>
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats; 
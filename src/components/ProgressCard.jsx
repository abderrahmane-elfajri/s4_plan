import React from 'react';
import '../styles/ProgressCard.css';

const ProgressCard = ({ 
  label, 
  current, 
  total, 
  color = '#3B82F6',
  icon = '📊',
  darkMode 
}) => {
  const percentage = (current / total) * 100;

  return (
    <div className={`progress-card ${darkMode ? 'dark' : ''}`}>
      <div className="card-icon">{icon}</div>
      
      <div className="card-content">
        <h3 className="card-label">{label}</h3>
        <p className="card-stats">
          <span className="current">{current}</span>
          <span className="separator">/</span>
          <span className="total">{total}</span>
        </p>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: color
              }}
            />
          </div>
          <span className="percentage">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;

import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">
        Loading<span className="dots">...</span>
      </p>
    </div>
  );
};

export default Loading;

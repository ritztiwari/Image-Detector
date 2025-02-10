import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return React.createElement('div', { className: 'home' },
    React.createElement('h1', null, 'Welcome to CyberGuard'),
    React.createElement('div', { className: 'card-container' },
      React.createElement('div', {
        className: 'feature-card',
        onClick: () => navigate('/image-detection')
      },
        React.createElement('h2', null, 'AI Image Detection'),
        React.createElement('p', null, 'Upload and analyze images to detect AI-generated content')
      ),
      React.createElement('div', {
        className: 'feature-card',
        onClick: () => navigate('/system-scan')
      },
        React.createElement('h2', null, 'System Scan'),
        React.createElement('p', null, 'Perform security scans to identify potential vulnerabilities')
      )
    )
  );
};

export default Home; 
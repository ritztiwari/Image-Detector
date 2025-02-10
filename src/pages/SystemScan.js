import React, { useState } from 'react';
import './SystemScan.css';

const SystemScan = () => {
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanResults({
        threats: Math.floor(Math.random() * 5),
        vulnerabilities: Math.floor(Math.random() * 10),
        scannedItems: Math.floor(Math.random() * 1000)
      });
      setScanning(false);
    }, 3000);
  };

  return React.createElement('div', { className: 'system-scan' },
    React.createElement('h1', null, 'System Security Scan'),
    
    !scanning && !scanResults &&
      React.createElement('button', {
        className: 'scan-btn',
        onClick: startScan
      }, 'Start System Scan'),

    scanning &&
      React.createElement('div', { className: 'scanning' },
        React.createElement('div', { className: 'spinner' }),
        React.createElement('p', null, 'Scanning system for vulnerabilities...')
      ),

    scanResults &&
      React.createElement('div', { className: 'scan-results' },
        React.createElement('h2', null, 'Scan Complete'),
        React.createElement('div', { className: 'results-grid' },
          React.createElement('div', { className: 'result-item' },
            React.createElement('h3', null, 'Threats Detected'),
            React.createElement('p', {
              className: scanResults.threats > 0 ? 'red' : 'green'
            }, scanResults.threats)
          ),
          React.createElement('div', { className: 'result-item' },
            React.createElement('h3', null, 'Vulnerabilities'),
            React.createElement('p', {
              className: scanResults.vulnerabilities > 0 ? 'yellow' : 'green'
            }, scanResults.vulnerabilities)
          ),
          React.createElement('div', { className: 'result-item' },
            React.createElement('h3', null, 'Items Scanned'),
            React.createElement('p', null, scanResults.scannedItems)
          )
        )
      )
  );
};

export default SystemScan; 
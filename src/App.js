import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageDetection from './pages/ImageDetection';
import SystemScan from './pages/SystemScan';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-detection" element={<ImageDetection />} />
            <Route path="/system-scan" element={<SystemScan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

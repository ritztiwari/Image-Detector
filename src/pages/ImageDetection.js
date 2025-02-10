import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API_CONFIG } from '../config/api';
import './ImageDetection.css';

const CYBERCRIME_URLS = {
  global: 'https://www.ic3.gov/Home/ComplaintChoice', // FBI's Internet Crime Complaint Center
  india: 'https://cybercrime.gov.in/', // Indian Cybercrime Portal
  uk: 'https://www.actionfraud.police.uk/' // UK's National Fraud & Cyber Crime Reporting Center
};

const HISTORY_KEY = 'ai_detection_history';

const ImageDetection = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    // Load history from localStorage on component mount
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const onDrop = (acceptedFiles) => {
    if (!acceptedFiles?.length) {
      setError('No file was provided');
      return;
    }

    const file = acceptedFiles[0];
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image under 10MB.');
      return;
    }
    setImageFile(file);
    setImage(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024
  });

  const analyzeImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('media', file);
      formData.append('models', 'properties,quality');
      formData.append('api_user', API_CONFIG.SIGHTENGINE_API_USER);
      formData.append('api_secret', API_CONFIG.SIGHTENGINE_API_SECRET);

      const response = await axios.post(API_CONFIG.SIGHTENGINE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Sightengine Response:', response.data);

      const quality = response.data?.quality || {};
      const properties = response.data?.properties || {};
      const qualityScore = (quality.score || 0) * 100;

      // Determine status and confidence
      let status = '';
      let confidence = qualityScore;
      let detailedMessage = '';

      if (qualityScore > 65) {
        status = 'High AI Activity';
        detailedMessage = 'High probability of AI generation. The image shows strong indicators of artificial creation.';
      } else if (qualityScore >= 50 && qualityScore <= 65) {
        status = 'Potential AI';
        detailedMessage = 'Some AI patterns detected. The image shows characteristics that might indicate AI manipulation.';
      } else if (qualityScore < 40) {
        status = 'Not AI';
        detailedMessage = 'No significant AI indicators found. The image appears to be naturally created.';
      } else {
        status = 'Inconclusive';
        detailedMessage = 'Analysis is inconclusive. The image shows mixed characteristics.';
      }

      // Only include metrics that are present
      const metrics = [];
      if (quality.artifacts) metrics.push(`Artifact Level: ${(quality.artifacts * 100).toFixed(1)}%`);
      if (quality.blur) metrics.push(`Blur Level: ${(quality.blur * 100).toFixed(1)}%`);
      if (properties.contrast_level) metrics.push(`Contrast: ${(properties.contrast_level * 100).toFixed(1)}%`);

      return {
        isAIGenerated: qualityScore > 50,
        confidence: confidence,
        details: {
          quality: quality,
          properties: properties,
          status: status,
          recommendedAction: `Analysis Result: ${status}
            
Confidence Score: ${qualityScore.toFixed(1)}%

${detailedMessage}

${metrics.length > 0 ? `Technical Details:
${metrics.join('\n')}` : ''}`
        }
      };
    } catch (err) {
      console.error('Analysis Error:', err);
      throw new Error(`Failed to analyze image: ${err.message}`);
    }
  };

  const processAnalysisResults = (data) => {
    return data; // Just pass through the formatted Sightengine response
  };

  const generateRecommendation = (aiScore, quality, properties) => {
    return quality.details.recommendedAction;
  };

  const saveToHistory = (imageData, analysisResult) => {
    const historyEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      imageName: imageFile?.name || 'Unknown',
      imagePreview: image,
      result: analysisResult
    };

    const updatedHistory = [historyEntry, ...history].slice(0, 50); // Keep last 50 entries
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError('No image selected');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const results = await analyzeImage(imageFile);
      setResult(results);
      saveToHistory(image, results);
    } catch (err) {
      setError(err.message);
      console.error('Analysis Error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleReport = () => {
    // Open in new tab
    window.open(CYBERCRIME_URLS.global, '_blank', 'noopener,noreferrer');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return React.createElement('div', { className: 'image-detection' },
    React.createElement('h1', null, 'Advanced AI Image Detection'),
    
    React.createElement('div', {
      ...getRootProps(),
      className: `dropzone ${isDragActive ? 'active' : ''}`
    },
      React.createElement('input', getInputProps()),
      image 
        ? React.createElement('img', {
            src: image,
            alt: 'Uploaded',
            className: 'preview'
          })
        : React.createElement('p', null, 'Drag & drop an image here, or click to select')
    ),

    error && React.createElement('div', { className: 'error' }, error),

    image && !analyzing && !result &&
      React.createElement('button', {
        className: 'analyze-btn',
        onClick: handleAnalyze
      }, 'Analyze Image'),

    analyzing &&
      React.createElement('div', { className: 'analyzing' },
        React.createElement('div', { className: 'spinner' }),
        React.createElement('p', null, 'Performing deep analysis...')
      ),

    result && React.createElement('div', { className: 'result' },
      React.createElement('h2', null, 'Analysis Results'),
      React.createElement('div', { className: 'result-card' },
        React.createElement('div', { className: 'result-section' },
          React.createElement('h3', null, 'Detection Status'),
          React.createElement('p', { 
            className: `status-text ${
              result.details.status === 'High AI Activity' ? 'high-ai' :
              result.details.status === 'Potential AI' ? 'potential-ai' :
              result.details.status === 'Not AI' ? 'not-ai' : 'inconclusive'
            }`
          }, result.details.status),
          React.createElement('p', { className: 'confidence' }, 
            `Confidence: ${result.confidence.toFixed(1)}%`)
        ),
        React.createElement('div', { className: 'result-section' },
          React.createElement('pre', { 
            className: 'analysis-results',
            style: { 
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              background: 'rgba(0,0,0,0.1)',
              padding: '1rem',
              borderRadius: '4px',
              lineHeight: '1.5'
            }
          }, result.details.recommendedAction)
        )
      ),
      React.createElement('div', { className: 'action-buttons' },
        React.createElement('button', {
          className: 'refresh-btn',
          onClick: handleRefresh
        }, 'Analyze New Image'),
        result.isAIGenerated && React.createElement('button', {
          className: 'report-btn',
          onClick: handleReport
        }, 'Report Deepfake Content')
      )
    ),

    history.length > 0 && React.createElement('div', { className: 'history-section' },
      React.createElement('h2', null, 'Analysis History'),
      React.createElement('button', {
        className: 'clear-history-btn',
        onClick: clearHistory
      }, 'Clear History'),
      React.createElement('div', { className: 'history-list' },
        history.map(entry => 
          React.createElement('div', { 
            key: entry.id,
            className: 'history-item'
          },
            React.createElement('div', { className: 'history-item-header' },
              React.createElement('p', null, `File: ${entry.imageName}`),
              React.createElement('p', null, new Date(entry.timestamp).toLocaleString())
            ),
            React.createElement('div', { className: 'history-item-preview' },
              React.createElement('img', {
                src: entry.imagePreview,
                alt: 'Historical preview',
                className: 'history-preview-image'
              })
            ),
            React.createElement('div', { className: 'history-item-result' },
              React.createElement('p', null, 
                'AI Generated: ',
                React.createElement('span', {
                  className: entry.result.isAIGenerated ? 'red' : 'green'
                }, entry.result.isAIGenerated ? 'Yes' : 'No')
              ),
              React.createElement('p', null, `Confidence: ${entry.result.confidence.toFixed(2)}%`),
              React.createElement('p', { className: 'recommendation' },
                entry.result.details.recommendedAction
              )
            )
          )
        )
      )
    )
  );
};

export default ImageDetection; 
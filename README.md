# AI Image Detection Tool

A modern web application that detects AI-generated images using advanced image analysis techniques. The tool provides real-time analysis, detailed reports, and a history tracking system for analyzed images.

## Features

- Real-time Image Analysis
- Advanced AI Detection
- Detailed Reports
- History Tracking
- Responsive Design
- Report Integration

## Tech Stack

### Frontend
- React
- React Dropzone
- Axios
- CSS3
- LocalStorage API

### API Integration
- Sightengine API
  - Quality Assessment
  - Artifact Detection
  - Image Properties Analysis

### Development Tools
- Create React App
- webpack
- Babel
- ESLint

## Analysis Metrics

Quality Score thresholds:
- Above 65%: High AI Activity
- 50-65%: Potential AI
- Below 40%: Not AI
- 40-50%: Inconclusive

Technical Metrics:
- Artifact Detection
- Blur Analysis
- Contrast Levels
- Overall Image Quality

## Installation

```bash
git clone https://github.com/yourusername/ai-image-detection.git
cd ai-image-detection
npm install
```

Create `.env`:
```env
REACT_APP_SIGHTENGINE_API_USER=your_api_user
REACT_APP_SIGHTENGINE_API_SECRET=your_api_secret
```

Start development:
```bash
npm start
```

## API Configuration

```javascript
export const API_CONFIG = {
  SIGHTENGINE_API_USER: process.env.REACT_APP_SIGHTENGINE_API_USER,
  SIGHTENGINE_API_SECRET: process.env.REACT_APP_SIGHTENGINE_API_SECRET,
  SIGHTENGINE_URL: 'https://api.sightengine.com/1.0/check.json',
  CONFIDENCE_THRESHOLD: 0.7
};
```

## Styling
- CSS Variables
- Flexbox and Grid
- Responsive design
- Animation and transitions
- Color-coded status indicators

## Security
- Secure API handling
- File size limitations
- Type checking
- Secure external links
- Error handling

## Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License
MIT License

## Support
Email: support@yourdomain.com



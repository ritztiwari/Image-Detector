const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));

app.post('/proxy/analyze', async (req, res) => {
  try {
    const response = await axios.post('https://ping.arya.ai/api/v1/deepfake-detection/image', req.body, {
      headers: {
        'token': req.headers.token,
        'content-type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || 'No additional details'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`)); 
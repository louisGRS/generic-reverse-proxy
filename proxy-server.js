const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Proxy configuration
const TARGET_PORT = process.env.TARGET_PORT || 3001;
const vscodeProxy = createProxyMiddleware({
  target: `http://localhost:${TARGET_PORT}`,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying
  
  onProxyRes: (proxyRes, req, res) => {
    // Remove headers that prevent iframe embedding
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    
    // Add headers to allow iframe embedding
    proxyRes.headers['Content-Security-Policy'] = 'frame-ancestors *';
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
  }
});

// Apply proxy to all routes
app.use('/', vscodeProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

/**
 * Trading CRM Proxy Server
 *
 * This proxy runs on YOUR server (85.130.211.49 - whitelisted IP)
 * It forwards requests from Render to Trading CRM
 *
 * Flow: Render → Your Server (proxy) → Trading CRM
 *
 * Trading CRM sees requests from 85.130.211.49 ✅ (whitelisted)
 * Instead of 54.188.71.94 ❌ (Render's IP - not whitelisted)
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PROXY_PORT || 3001;

// Middleware
app.use(cors()); // Allow requests from Render
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'Trading CRM Proxy',
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /proxy/trading-crm
 *
 * Forwards requests to Trading CRM API
 */
app.post('/proxy/trading-crm', async (req, res) => {
  try {
    const { endpoint, method, headers, body } = req.body;

    console.log('📥 Proxy received request:', {
      endpoint,
      method,
      timestamp: new Date().toISOString()
    });

    // Forward request to Trading CRM
    const response = await fetch(endpoint, {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json',
        'Accept': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });

    // Read response as text (to handle both JSON and plain text)
    const rawResponse = await response.text();

    console.log('📤 Trading CRM responded:', {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      responseLength: rawResponse.length
    });

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(rawResponse);
    } catch {
      // Plain text response
      responseData = { error: rawResponse };
    }

    // Return response to Render
    res.status(response.status).json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
      rawResponse: rawResponse
    });

  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

/**
 * POST /proxy/trading-crm/token
 *
 * Get Bearer token from Trading CRM
 */
app.post('/proxy/trading-crm/token', async (req, res) => {
  try {
    const { tokenEndpoint, username, password } = req.body;

    console.log('🔑 Getting Bearer token from Trading CRM');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    });

    const data = await response.json();

    console.log('✅ Token obtained:', {
      hasToken: !!data.Token,
      expiresIn: data.ExpiresIn
    });

    res.status(response.status).json({
      success: response.ok,
      status: response.status,
      data: data
    });

  } catch (error) {
    console.error('❌ Token proxy error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🚀 Trading CRM Proxy Server Started');
  console.log('=====================================');
  console.log(`📍 Server IP: 85.130.211.49 (whitelisted)`);
  console.log(`🔌 Port: ${PORT}`);
  console.log(`🌐 Endpoint: http://85.130.211.49:${PORT}`);
  console.log('=====================================');
  console.log('');
  console.log('✅ Ready to proxy requests to Trading CRM');
  console.log('');
  console.log('Endpoints:');
  console.log(`  GET  /health - Health check`);
  console.log(`  POST /proxy/trading-crm - Forward to Trading CRM`);
  console.log(`  POST /proxy/trading-crm/token - Get Bearer token`);
  console.log('');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️ SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
  });
});

module.exports = app;

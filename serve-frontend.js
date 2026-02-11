const express = require('express');
const path = require('path');
const app = express();

const PORT = 5000;
const DIST_PATH = path.join(__dirname, 'client', 'dist');

// Serve static files
app.use(express.static(DIST_PATH));

// Handle SPA routing - serve index.html for all routes
app.get('/:path(.*)', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✅ Frontend server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${DIST_PATH}\n`);
});


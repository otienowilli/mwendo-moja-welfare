const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIST_PATH = path.join(__dirname, 'client', 'dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_PATH, req.url);
  
  // If it's a directory or root, serve index.html
  if (req.url === '/' || req.url.endsWith('/')) {
    filePath = path.join(DIST_PATH, 'index.html');
  }
  
  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file doesn't exist, serve index.html (for SPA routing)
      filePath = path.join(DIST_PATH, 'index.html');
    }
    
    // Determine content type
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.svg') contentType = 'image/svg+xml';
    if (ext === '.json') contentType = 'application/json';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Frontend server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${DIST_PATH}\n`);
});


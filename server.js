const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Build the file path from the requested URL
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Read the file contents
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Send the file contents as a response
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

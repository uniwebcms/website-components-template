const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const port = process.env.DEV_SERVER_PORT;

// Create a serve-static middleware
const serve = serveStatic('../build_dev');

// Custom middleware to set cache-control header
const cacheControlMiddleware = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
};

// Create an HTTP server
const server = http.createServer((req, res) => {
  const done = finalhandler(req, res);
  cacheControlMiddleware(req, res, () => {
    serve(req, res, done);
  });

  // Log request information
  console.log(`Request received: ${req.method} ${req.url}`);
});

// Enable CORS
server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

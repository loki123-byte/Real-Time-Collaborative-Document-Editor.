// backend/index.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (optional frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Create HTTP server and bind socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

// Socket.io connection
io.on('connection', (socket) => {
  console.log(' A user connected');

  socket.on('message', (data) => {
    console.log(' Received:', data);
    io.emit('message', data); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log(' A user disconnected');
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

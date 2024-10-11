// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors")

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    credentials: true
  }
});

//allow wors
app.use(cors({
  origin: "http://localhost:3000",
  method:["GET", "POST"],
  credentials: true
}))

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
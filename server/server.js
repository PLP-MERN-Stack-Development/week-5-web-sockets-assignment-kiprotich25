const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = {};
const messages = [];
const typingUsers = {};

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
    console.log(`${username} joined the chat`);
  });

  // Handle message (text or file)
  socket.on('send_message', (data) => {
    const message = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      message: data.message || '',
      type: data.type || 'text',
      fileData: data.fileData || null,
      filename: data.filename || null,
    };

    messages.push(message);
    if (messages.length > 100) messages.shift();

    io.emit('receive_message', message);
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    const username = users[socket.id]?.username;
    if (!username) return;

    if (isTyping) {
      typingUsers[socket.id] = username;
    } else {
      delete typingUsers[socket.id];
    }

    io.emit('typing_users', Object.values(typingUsers));
  });

  // Private message
  socket.on('private_message', ({ to, message, type, fileData, filename }) => {
    const messageData = {
      id: Date.now(),
      sender: users[socket.id]?.username || 'Anonymous',
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
      type: type || 'text',
      fileData: fileData || null,
      filename: filename || null,
    };

    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('user_left', { username: user.username, id: socket.id });
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
      console.log(`${user.username} left the chat`);
    }
  });
});

// API routes for testing
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running. Enjoy!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io };

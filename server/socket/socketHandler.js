const { addMessage, getAll } = require('../controllers/messageController');
const { log } = require('../utils/logger');

let users = {};
let typingUsers = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    log(`🔌 User connected: ${socket.id}`);

    socket.on('user_join', (username) => {
      users[socket.id] = { username, id: socket.id, rooms: [] };
      socket.join('global'); // default room
      io.emit('user_list', Object.values(users));
      io.emit('user_joined', { username, id: socket.id });
      log(`👤 ${username} joined`);
    });

    socket.on('send_message', (data) => {
      const message = {
        ...data,
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      addMessage(message);
      io.to(data.room || 'global').emit('receive_message', message);
    });

    socket.on('typing', (isTyping) => {
      if (users[socket.id]) {
        const username = users[socket.id].username;
        if (isTyping) {
          typingUsers[socket.id] = username;
        } else {
          delete typingUsers[socket.id];
        }
        io.emit('typing_users', Object.values(typingUsers));
      }
    });

    socket.on('private_message', ({ to, message }) => {
      const messageData = {
        id: Date.now(),
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        message,
        timestamp: new Date().toISOString(),
        isPrivate: true,
      };
      socket.to(to).emit('private_message', messageData);
      socket.emit('private_message', messageData);
    });

    socket.on('join_room', (room) => {
      socket.join(room);
      users[socket.id].rooms.push(room);
      io.to(room).emit('system_message', {
        id: Date.now(),
        message: `${users[socket.id].username} joined ${room}`,
        system: true,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('disconnect', () => {
      if (users[socket.id]) {
        const { username } = users[socket.id];
        io.emit('user_left', { username, id: socket.id });
        log(`❌ ${username} disconnected`);
        delete users[socket.id];
        delete typingUsers[socket.id];
        io.emit('user_list', Object.values(users));
        io.emit('typing_users', Object.values(typingUsers));
      }
    });
  });
};

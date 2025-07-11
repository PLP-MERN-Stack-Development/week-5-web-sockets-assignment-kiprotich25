import { useEffect, useState } from 'react';
import { socket } from '../socket/socket';

export const useSocket = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('global');

  const connect = (username) => {
    socket.connect();
    socket.emit('user_join', username);
    socket.emit('join_room', currentRoom);
  };

  const sendMessage = (message) => {
    socket.emit('send_message', { message, room: currentRoom });
  };

  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  const joinRoom = (room) => {
    socket.emit('join_room', room);
    setCurrentRoom(room);
  };

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('private_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('system_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_list', setUsers);
    socket.on('typing_users', setTypingUsers);

    return () => {
      socket.off('receive_message');
      socket.off('private_message');
      socket.off('system_message');
      socket.off('user_list');
      socket.off('typing_users');
    };
  }, []);

  return {
    socket,
    connect,
    sendMessage,
    sendPrivateMessage,
    joinRoom,
    setTyping,
    messages,
    users,
    typingUsers,
    currentRoom,
  };
};

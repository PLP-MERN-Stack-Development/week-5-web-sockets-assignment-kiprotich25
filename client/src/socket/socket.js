import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Connect to socket server
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = (messageData) => {
    socket.emit('send_message', messageData);
  };

  // Send a private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // Mark a message as read
  const markAsRead = (messageId) => {
    socket.emit('message_read', messageId);
  };

  // Acknowledge delivery of a message
  const markAsDelivered = (messageId) => {
    socket.emit('message_delivered', messageId);
  };

  // React to a message
  const reactToMessage = (messageId, emoji) => {
    socket.emit('add_reaction', { messageId, emoji });
  };

  // Socket event listeners
  useEffect(() => {
    // Connection status
   
    const onConnect = () => {
    setIsConnected(true);
    localStorage.setItem('socketId', socket.id); // ✅ Save your socket.id here
  };
    
    const onDisconnect = () => setIsConnected(false);

    // Regular messages
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      socket.emit('message_delivered', message.id); // Mark as delivered
    };

    // Private messages
    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
      socket.emit('message_delivered', message.id);
    };

    // Updated messages (reactions, read, delivery)
    const onMessageUpdated = (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    };

    // User events
    const onUserList = (userList) => setUsers(userList);
    const onUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };
    const onUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    // Typing indicator
    const onTypingUsers = (users) => setTypingUsers(users);

    // Register listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('message_updated', onMessageUpdated);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    // Cleanup
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('message_updated', onMessageUpdated);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    markAsRead,
    markAsDelivered,
    reactToMessage,
  };
};

export default socket;

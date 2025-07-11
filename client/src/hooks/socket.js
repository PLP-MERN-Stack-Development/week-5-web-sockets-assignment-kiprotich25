// import { io } from 'socket.io-client';
// import { useEffect, useState } from 'react';

// // Set up Socket URL
// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// // Create socket instance
// export const socket = io(SOCKET_URL, {
//   autoConnect: false,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
// });

// // Custom hook
// export const useSocket = () => {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Connect
//   const connect = (username) => {
//     socket.connect();
//     socket.emit('user_join', username);
//   };

//   // Send public message
//   const sendMessage = (msg) => {
//     socket.emit('send_message', msg);
//   };

//   // Private message
//   const sendPrivateMessage = (to, message) => {
//     socket.emit('private_message', { to, message });
//   };

//   const setTyping = (isTyping) => {
//     socket.emit('typing', isTyping);
//   };

//   useEffect(() => {
//     const onConnect = () => {
//       setIsConnected(true);
//       setCurrentUserId(socket.id);
//     };

//     const onDisconnect = () => {
//       setIsConnected(false);
//       setCurrentUserId(null);
//     };

//     const onReceiveMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     const onPrivateMessage = (message) => {
//       setMessages((prev) => [...prev, message]);
//     };

//     const onUserList = (userList) => {
//       setUsers(userList);
//     };

//     const onUserJoined = (user) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + Math.random(),
//           sender: 'System',
//           message: `${user.username} joined`,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     };

//     const onUserLeft = (user) => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + Math.random(),
//           sender: 'System',
//           message: `${user.username} left`,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     };

//     const onTypingUsers = (usernames) => {
//       setTypingUsers(usernames);
//     };

//     // Register events
//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('receive_message', onReceiveMessage);
//     socket.on('private_message', onPrivateMessage);
//     socket.on('user_list', onUserList);
//     socket.on('user_joined', onUserJoined);
//     socket.on('user_left', onUserLeft);
//     socket.on('typing_users', onTypingUsers);

//     // Cleanup
//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('receive_message', onReceiveMessage);
//       socket.off('private_message', onPrivateMessage);
//       socket.off('user_list', onUserList);
//       socket.off('user_joined', onUserJoined);
//       socket.off('user_left', onUserLeft);
//       socket.off('typing_users', onTypingUsers);
//     };
//   }, []);

//   return {
//     socket,
//     isConnected,
//     messages,
//     users,
//     typingUsers,
//     currentUserId,
//     connect,
//     sendMessage,
//     sendPrivateMessage,
//     setTyping,
//   };
// };

// export default socket;

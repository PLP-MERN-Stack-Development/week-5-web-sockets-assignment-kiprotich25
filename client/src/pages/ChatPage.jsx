import React, { useState } from 'react';
import { useSocket } from '../socket/socket'; // adjust path if different
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const { connect, messages, users, typingUsers, sendMessage, sendPrivateMessage } = useSocket();

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());         // Save username
      connect(inputUsername.trim());             // Connect socket
    }
  };

  if (!username) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleUsernameSubmit} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Enter Your Username</h2>
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="e.g., kiprotich25"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Join Chat
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <Sidebar users={users} />
      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} currentUser={localStorage.getItem('socketId')} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;

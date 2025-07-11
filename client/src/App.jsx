import React, { useState } from 'react';
import ChatPage from './pages/ChatPage';

const App = () => {
  const [username, setUsername] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowPrompt(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {showPrompt ? (
        <form
          onSubmit={handleJoin}
          className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Enter Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Your name"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join Chat
          </button>
        </form>
      ) : (
        <ChatPage username={username} />
      )}
    </div>
  );
};

export default App;

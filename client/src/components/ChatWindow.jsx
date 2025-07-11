import React, { useState } from 'react';
import ChatInput from './ChatInput';

const ChatWindow = ({ messages, currentUser, sendMessage, sendPrivateMessage, setTyping }) => {
  const [input, setInput] = useState('');

  const handleSend = (content, type = 'text', fileData = null) => {
    const message = {
      message: content,
      type,
      fileData,
    };

    if (currentUser?.targetSocketId) {
      sendPrivateMessage(currentUser.targetSocketId, message);
    } else {
      sendMessage(message);
    }
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-2 overflow-y-auto flex-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-xl max-w-[70%] ${
              msg.senderId === currentUser.id
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-200 text-black'
            }`}
          >
            <div className="text-xs font-semibold mb-1">
              {msg.sender} {msg.isPrivate && '(Private)'}
            </div>

            {msg.type === 'file' && msg.fileData ? (
              <img
                src={msg.fileData}
                alt={msg.filename || 'file'}
                className="rounded-lg max-h-60"
              />
            ) : (
              <p>
                {typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message)}
              </p>
            )}

            <div className="text-[10px] text-right mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        setTyping={setTyping}
      />
    </div>
  );
};

export default ChatWindow;

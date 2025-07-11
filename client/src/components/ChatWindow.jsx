import React from 'react';

const ChatWindow = ({ messages, typingUsers, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 rounded-md">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 max-w-[75%] rounded-xl ${
            msg.senderId === currentUser
              ? 'bg-blue-600 text-white ml-auto'
              : 'bg-gray-200 text-black'
          }`}
        >
          <div className="text-xs font-semibold mb-1">
            {msg.sender} {msg.isPrivate && '(Private)'}
          </div>

          {msg.type === 'file' && msg.fileData ? (
            <img
              src={msg.fileData}
              alt="file"
              className="max-h-48 rounded"
            />
          ) : (
            <p>{msg.message}</p>
          )}

          <div className="text-[10px] text-right mt-1">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
      {typingUsers.length > 0 && (
        <div className="text-xs text-gray-500">
          {typingUsers.join(', ')} typing...
        </div>
      )}
    </div>
  );
};

export default ChatWindow;


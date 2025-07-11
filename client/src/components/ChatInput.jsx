import React, { useState } from 'react';

const ChatInput = ({ sendMessage, setTyping }) => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (input.trim() || file) {
      const message = {
        message: input,
        type: file ? 'file' : 'text',
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          sendMessage({ ...message, fileData: reader.result });
        };
        reader.readAsDataURL(file);
        setFile(null);
      } else {
        sendMessage(message);
      }

      setInput('');
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setTyping(true);
        }}
        onBlur={() => setTyping(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;

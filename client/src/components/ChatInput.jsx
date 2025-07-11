import React, { useRef } from 'react';

const ChatInput = ({ input, setInput, handleSend, setTyping }) => {
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      handleSend(input.trim());
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleSend(file.name, 'file', reader.result);
    };
    reader.readAsDataURL(file);
    fileInputRef.current.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-2 border-t border-gray-300 gap-2"
    >
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="bg-gray-200 rounded p-2 hover:bg-gray-300"
        title="Attach File"
      >
        📎
      </button>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setTyping(true)}
        onBlur={() => setTyping(false)}
        placeholder="Type a message..."
        className="flex-1 p-2 border border-gray-300 rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;

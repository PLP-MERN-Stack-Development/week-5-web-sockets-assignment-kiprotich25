import { useState } from 'react';

const MessageInput = ({ onSend, onTyping }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping(e.target.value.length > 0);
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      onTyping(false);
    }
  };
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    sendFileMessage(reader.result, file.name, file.type);
  };
  reader.readAsDataURL(file);
};


  return (
    <div className="flex items-center mt-2">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message"
        className="flex-1 p-2 bg-gray-700 rounded-l"
      />
      <input
         type="file"
         onChange={handleFileChange}
         className="hidden"
         id="file-upload"
       />
      <label htmlFor="file-upload" className="cursor-pointer text-sm text-blue-400 hover:underline">
         📎 Attach File
      </label>

      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;

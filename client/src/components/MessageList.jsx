import { useEffect, useRef, useState } from 'react';
import { socket, useSocket } from '../socket/socket';

const MessageList = ({ messages }) => {
  const {
    markAsRead,
    reactToMessage,
  } = useSocket();

  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  // Automatically mark messages as read
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.id && !msg.readBy?.includes(socket.id)) {
        markAsRead(msg.id);
      }
    });
  }, [messages, markAsRead]);

  const filteredMessages = messages.filter((msg) =>
    (msg.message || msg.fileName || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white w-full mb-2"
      />

      {/* 📜 Message list */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-4 p-2"
      >
        {filteredMessages.map((msg) => (
          <div key={msg.id} className="bg-gray-800 p-3 rounded shadow">
            {/* 🧑 Sender */}
            <div className="text-sm font-semibold">{msg.sender}</div>

            {/* 📎 File or 💬 Text */}
            {msg.isFile ? (
              msg.fileType?.startsWith('image') ? (
                <img
                  src={msg.file}
                  alt={msg.fileName}
                  className="max-w-xs mt-2 rounded-md border"
                />
              ) : (
                <a
                  href={msg.file}
                  download={msg.fileName}
                  className="text-blue-400 underline mt-2 inline-block"
                >
                  📎 Download {msg.fileName}
                </a>
              )
            ) : (
              <p className="mt-2">{msg.message}</p>
            )}

            {/* 🕓 Timestamp */}
            <div className="text-xs text-gray-400">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>

            {/* ✅ Read Receipts */}
            {msg.readBy?.length > 1 && (
              <div className="text-xs text-green-400">
                ✓ Seen by {msg.readBy.length - 1} other{msg.readBy.length > 2 ? 's' : ''}
              </div>
            )}

            {/* 📬 Delivery Acknowledgment */}
            {msg.deliveredTo?.includes(socket.id) && (
              <div className="text-xs text-blue-400">
                ✓ Delivered
              </div>
            )}

            {/* 😄 Reactions */}
            {msg.reactions && Object.values(msg.reactions).length > 0 && (
              <div className="text-sm mt-1">
                {Object.values(msg.reactions).map((emoji, idx) => (
                  <span key={idx} className="mr-1">{emoji}</span>
                ))}
              </div>
            )}

            {/* ➕ Reaction Buttons */}
            <div className="flex gap-2 mt-2">
              {['❤️', '😂', '👍'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => reactToMessage(msg.id, emoji)}
                  className="text-xl hover:scale-110 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;

import React from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import { useSocket } from '../socket/socket';

const ChatPage = ({ username }) => {
  const {
    messages,
    users,
    typingUsers,
    currentUserId,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    connect,
  } = useSocket();

  React.useEffect(() => {
    connect(username);
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar users={users} sendPrivateMessage={sendPrivateMessage} />
      <div className="flex flex-col flex-1 p-4">
        <ChatWindow
          messages={messages}
          typingUsers={typingUsers}
          currentUser={currentUserId}
        />
        <ChatInput sendMessage={sendMessage} setTyping={setTyping} />
      </div>
    </div>
  );
};

export default ChatPage;

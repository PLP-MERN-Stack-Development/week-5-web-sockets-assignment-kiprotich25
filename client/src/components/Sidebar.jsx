import React from 'react';

const Sidebar = ({ users, sendPrivateMessage }) => {
  const handlePrivateMessage = (user) => {
    const msg = prompt(`Private message to ${user.username}:`);
    if (msg) {
      sendPrivateMessage(user.id, msg);
    }
  };

  return (
    <div className="w-64 bg-white shadow p-4 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Online Users</h3>
      {users.map((user) => (
        <div
          key={user.id}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
          onClick={() => handlePrivateMessage(user)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

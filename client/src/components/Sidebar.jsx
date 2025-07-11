
import React from 'react';

const Sidebar = ({ users, currentUserId, onSelectUser }) => {
  return (
    <div className="w-64 bg-gray-100 border-r overflow-y-auto">
      <h2 className="text-lg font-semibold p-4">Users</h2>
      <ul>
        {users
          .filter((u) => u.id !== currentUserId)
          .map((user) => (
            <li
              key={user.id}
              className="p-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              {user.username}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;

const UserList = ({ users }) => {
  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u.id} className="bg-gray-700 p-2 rounded">
          {u.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;

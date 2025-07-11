const TypingIndicator = ({ users }) => {
  if (users.length === 0) return null;
  return (
    <div className="text-sm text-gray-400 py-2">
      {users.join(', ')} typing...
    </div>
  );
};

export default TypingIndicator;

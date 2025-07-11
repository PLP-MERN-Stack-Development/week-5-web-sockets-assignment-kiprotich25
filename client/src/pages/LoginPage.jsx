// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   const handleJoin = () => {
//     if (username.trim()) {
//       localStorage.setItem('chat-username', username);
//       navigate('/chat');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//       <div className="bg-gray-800 p-6 rounded shadow w-80">
//         <h2 className="text-xl font-bold mb-4">Join Chat</h2>
//         <input
//           type="text"
//           className="w-full p-2 mb-4 rounded bg-gray-700"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button
//           className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
//           onClick={handleJoin}
//         >
//           Enter Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

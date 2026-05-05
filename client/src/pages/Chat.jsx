import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: authHeader
      });

      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/chat/${user._id}`,
      {
        headers: authHeader
      }
    );

    const data = await res.json();
    setMessages(data);
  };

  const handleSend = async () => {
    if (!selectedUser || !message.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader
      },
      body: JSON.stringify({
        receiver: selectedUser._id,
        message
      })
    });

    const data = await res.json();

    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    };

  return (
    <div className="h-screen flex bg-gray-950 text-white">

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-20 w-full md:w-1/3 lg:w-1/4 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300
        ${selectedUser ? "-translate-x-full md:translate-x-0" : "translate-x-0"}`}
      >
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-purple-500">Chats</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={`p-4 cursor-pointer border-b border-gray-800 hover:bg-gray-800 ${
                selectedUser?._id === user._id ? "bg-gray-800" : ""
              }`}
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          ))}
          <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 mt-4 transition"
                >
                Logout
            </button>
        </div>
      </div>

      {/* CHAT AREA */}
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300
        ${!selectedUser ? "hidden md:flex" : "flex"}`}
      >

        {/* HEADER */}
        <div className="p-4 border-b border-gray-800 bg-gray-900 flex items-center justify-between">
          <h2 className="font-semibold text-purple-400">
            {selectedUser ? selectedUser.name : "Select a chat"}
          </h2>
          

          {selectedUser && (
            <button
              onClick={() => setSelectedUser(null)}
              className="md:hidden text-sm text-gray-300"
            >
              Back
            </button>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            const isMine = msg.sender !== selectedUser._id;

            return (
              <div
                key={msg._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs ${
                    isMine ? "bg-purple-700" : "bg-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-purple-700"
          />

          <button
            onClick={handleSend}
            className="bg-purple-700 px-6 py-2 rounded-xl hover:bg-purple-800 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
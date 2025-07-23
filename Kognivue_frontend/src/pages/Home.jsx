import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/all`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-700">
        Welcome to Kognivue!
      </h1>
      <p className="text-gray-600 mb-8 text-center text-lg">
        Your one-stop platform to manage users and course data efficiently.
      </p>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="text-gray-700">
          Total Users: <strong>{filteredUsers.length}</strong>
        </span>
      </div>

      {loading ? (
        <p className="text-blue-600 text-center">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-red-500 text-center">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
            >
              <p className="text-lg">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

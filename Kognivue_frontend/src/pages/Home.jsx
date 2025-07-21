import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Welcome to Kognivue!
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        This is your one-stop platform for managing courses and users.
      </p>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="ml-4 text-gray-700">
          Total: <strong>{filteredUsers.length}</strong>
        </span>
      </div>

      {loading ? (
        <p className="text-blue-600">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-red-500">No users found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredUsers.map((user) => (
            <li key={user.id} className="bg-white p-4 rounded shadow">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
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

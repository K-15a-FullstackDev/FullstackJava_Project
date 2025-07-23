import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 bg-indigo-700 text-white">
        <h1 className="text-xl font-bold">Kognivue</h1>
        {isAuthenticated && (
          <nav className="space-x-4">
            <Link to="/home" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-4 bg-white text-indigo-700 px-3 py-1 rounded hover:bg-gray-100"
            >
              Sign Out
            </button>
          </nav>
        )}
      </header>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Confirm Logout
            </Dialog.Title>
            <p className="mb-6 text-gray-700">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Header;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="bg-white shadow-md p-4 flex gap-6 justify-center">
        <Link className="text-blue-600 hover:underline" to="/">
          Home
        </Link>
        <Link className="text-blue-600 hover:underline" to="/about">
          About
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

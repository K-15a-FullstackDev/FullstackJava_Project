import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === "password") {
      if (value.length < 6) setPasswordStrength("Weak");
      else if (value.length < 10) setPasswordStrength("Medium");
      else setPasswordStrength("Strong");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        credentials
      );
      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      }
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {message && <p className="text-red-600 text-sm text-center">{message}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={credentials.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={credentials.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-indigo-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {credentials.password && (
          <p className="text-sm text-gray-500">
            Strength:{" "}
            <span
              className={`font-semibold ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {passwordStrength}
            </span>
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

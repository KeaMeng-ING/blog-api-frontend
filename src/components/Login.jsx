"use client";

import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Login = (props) => {
  console.log(props.loggedIn);
  if (props.loggedIn) {
    window.location.href = "/";
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

      // Store the token and user info in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
        })
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      setData(response.data);
      setLoggedIn(true);

      // window.location.href = "/";
      console.log("should be redirect");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111827] px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">The Blog</h1>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <div className="rounded-lg border-0 bg-[#1f2937] p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Login
          </h2>

          {/* If logged in */}
          {loggedIn && (
            <div className="mb-4 rounded border border-green-700 bg-green-900/30 px-4 py-3 text-green-400">
              You are already logged in {data.firstName}.
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded border border-red-700 bg-red-900/30 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-[#374151] px-3 py-2 leading-tight text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                required
                autoComplete="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-300"
                >
                  Password
                </label>
                <NavLink
                  href="/forgot-password"
                  className="text-sm font-medium text-gray-400 hover:text-white"
                >
                  Forgot password?
                </NavLink>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded border border-gray-700 bg-[#374151] px-3 py-2 leading-tight text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full rounded bg-white px-4 py-2 font-bold text-[#111827] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <NavLink
                  href="/register"
                  className="font-medium text-white hover:underline"
                >
                  Register here
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./components/layouts/root-layout.jsx";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home.jsx";
import thumbnail from "./assets/thumbnail.jpg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const featuredPost = {
    title: "Featured Post Title",
    content: "This is a subtitle for the featured post.",
    excerpt: "This is an excerpt for the featured post.",
    readTime: "5 min read",
    subtitle: "This is a subtitle for the featured post.",
    imageUrl: thumbnail,
    category: "Category",
    date: "2023-10-01",
  };

  // Set up authentication token first
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoggedIn(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  // Add axios interceptor for 401 errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized - token expired or invalid
          localStorage.removeItem("token");
          setLoggedIn(false);
          // The redirect will happen in the loggedIn useEffect
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  // Fetch posts data only if logged in
  useEffect(() => {
    if (!loggedIn) return; // Don't fetch if not logged in

    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching posts...");
        const response = await axios.get("http://localhost:3000/api/posts");
        console.log("API response:", response.data);

        if (response.data && response.data.posts) {
          if (response.data.posts.length === 0) {
            setError("No posts found");
          }
          setDatas(response.data.posts);
        } else {
          setError("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(
          error.response?.data?.message || error.message || "An error occurred"
        );
        setDatas([]);
        console.log("log in move here");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [loggedIn, navigate]); // Depend on loggedIn state

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootLayout loggedIn={loggedIn} />}>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <Home
                    featuredPost={featuredPost}
                    allPosts={datas}
                    loading={loading}
                    error={error}
                  />
                }
              />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Redirect to login if no path matches */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./components/layouts/root-layout.jsx";
import Home from "./components/Home.jsx";
import CreatePost from "./components/CreatePost";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featuredPost, setFeaturedPost] = useState({});

  // Set up authentication token first
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser)); // We can try to delete this
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [navigate, setUser]);

  // Add axios interceptor for 401 errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("error 1");
          // Unauthorized - token expired or invalid
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
          // The redirect will happen in the loggedIn useEffect
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, setUser]);

  // Fetch posts data only if logged in
  useEffect(() => {
    if (!user) return; // Don't fetch if not logged in

    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching posts...");
        const response = await axios.get("http://localhost:3000/api/posts");
        // const response = await api_client.get("/api/posts");
        console.log("API response:", response.data);

        const featured = response.data.posts.find((post) => post.isFeatured);
        if (featured) {
          setFeaturedPost(featured);
        }

        if (response.data && response.data.posts) {
          if (response.data.posts.length === 0) {
            console.log("error 2");
            setError("No posts found");
          }
          setDatas(response.data.posts);
        } else {
          setError("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (error.response?.status === 401) {
          setUser(null);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
          navigate("/login");
        } else {
          setError(
            error.response?.data?.message ||
              error.message ||
              "An error occurred"
          );
        }
        setDatas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setUser, navigate, user]); // Depend on loggedIn state

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
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
          <Route path="/create" element={<CreatePost />} />
          {/* Redirect to login if no path matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

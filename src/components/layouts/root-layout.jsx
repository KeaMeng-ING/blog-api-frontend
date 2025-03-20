import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RootLayout(props) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        loggedIn={props.loggedIn}
      />
      <Outlet />
      <Footer />
    </>
  );
}

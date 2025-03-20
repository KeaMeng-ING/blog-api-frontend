"use client";

import { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-white dark:bg-[#111827] shadow-sm dark:shadow-gray-800 border-b-2 border-gray-200 py-2 dark:border-gray-800">
      <div className="container  max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">
              The Blog
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Categories
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search size={20} />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <NavLink
              to="/login"
              className="hidden md:block hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </NavLink>
            <a
              href="#"
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Sign up
            </a>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={toggleMenu}>
              <div className="w-6 flex flex-col space-y-1">
                <span className="h-0.5 w-full bg-current"></span>
                <span className="h-0.5 w-full bg-current"></span>
                <span className="h-0.5 w-full bg-current"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Categories
              </a>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </a>
              <div className="pt-4 flex space-x-4">
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

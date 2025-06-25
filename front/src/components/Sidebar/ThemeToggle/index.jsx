import React from "react";
import "../../../styles/sidebar/sidebar.css";
import { useState, useEffect } from "react";
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferência do usuário
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedMode = localStorage.getItem("theme");

    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Aplicar tema
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="theme-toggle">
      <label className="theme-switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          aria-label="Alternar tema claro/escuro"
        />
        <div className="switch-track">
          <div className="switch-thumb">
            <div className="sun-icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <line
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="12"
                  y1="21"
                  x2="12"
                  y2="23"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="4.22"
                  y1="4.22"
                  x2="5.64"
                  y2="5.64"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="18.36"
                  y1="18.36"
                  x2="19.78"
                  y2="19.78"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="1"
                  y1="12"
                  x2="3"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="21"
                  y1="12"
                  x2="23"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="4.22"
                  y1="19.78"
                  x2="5.64"
                  y2="18.36"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="18.36"
                  y1="5.64"
                  x2="19.78"
                  y2="4.22"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="moon-icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;

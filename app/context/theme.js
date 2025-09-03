"use client";
import { createContext, useState, useEffect, useContext } from "react";
export const ThemeContext = createContext();

const getTheDefaultTheme = () => {
  if (typeof window !== "undefined") {
    const userPreference = window.localStorage.getItem("theme");
    return userPreference || "light";
  }
  return "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheDefaultTheme());
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

"use client";
import { useTheme } from "@/app/context/theme";
// import { useTheme } from "@/app/context/theme";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // State
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    mounted && (
      <button className="nav-link" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    )
  );
}

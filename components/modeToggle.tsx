"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-full bg-secondary/75 hover:text-foreground group backdrop-blur-sm"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 group-hover:scale-110 duration-300" />
      ) : (
        <Moon className="w-4 h-4 group-hover:scale-110 duration-300" />
      )}
    </button>
  );
}

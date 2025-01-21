"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-full bg-secondary/75 hover:text-foreground group backdrop-blur-sm"
      aria-label={theme === "dark" ? "Dark mode toggle" : "Light mode toggle"}
      title="Theme toggle"
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4 group-hover:scale-110 duration-300" />
      ) : (
        <Sun className="w-4 h-4 group-hover:scale-110 duration-300" />
      )}
    </button>
  );
}

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ color }: { color?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center opacity-0" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle-btn relative flex items-center justify-center rounded-full transition-all duration-300 group"
      aria-label="Toggle theme"
      style={{ cursor: 'none' }}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          className={`absolute transition-all duration-500 transform ${
            isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
          size={18}
          strokeWidth={1.5}
        />
        <Moon 
          className={`absolute transition-all duration-500 transform ${
            !isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
          size={18}
          strokeWidth={1.5}
        />
      </div>
      
      {/* Subtle indicator ring */}
      <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-ink/10 transition-colors duration-300" />
    </button>
  );
}

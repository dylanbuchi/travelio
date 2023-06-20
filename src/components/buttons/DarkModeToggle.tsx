"use client";

import { themeStore } from "@/store/theme.store";
import { FiSun, FiMoon } from "react-icons/fi";

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = themeStore();

  return (
    <button
      className="rounded-full border border-gray-200 p-2 shadow-sm transition hover:shadow-md dark:border-gray-600 dark:shadow-gray-600"
      onClick={() => toggleTheme()}
    >
      {theme === "dark" ? (
        <FiSun className="text-gray-300" size={24} />
      ) : (
        <FiMoon className="text-gray-600" size={24} />
      )}
    </button>
  );
};

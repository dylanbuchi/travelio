"use client";

import { useEffect } from "react";
import { loadFromLocalStorage } from "@/helpers/localstorage.helper";
import { Theme, themeStore } from "@/store/theme.store";
import { FiSun, FiMoon } from "react-icons/fi";
import { THEME_KEY_LOCAL_STORAGE } from "@/constants/app.constants";

export const DarkModeToggle = () => {
  const { theme, toggleTheme, setTheme } = themeStore();

  useEffect(() => {
    const storedTheme = loadFromLocalStorage(THEME_KEY_LOCAL_STORAGE) as Theme;
    if (!storedTheme) return;

    if (storedTheme === "dark") {
      document?.body.classList.add("dark");
      setTheme("dark");
    } else {
      document?.body.classList.remove("dark");
    }
  }, []);

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

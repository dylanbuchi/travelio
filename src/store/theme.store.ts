import { setToLocalStorage } from "@/helpers/localstorage.helper";
import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const createThemeStore = () =>
  create<ThemeStore>((set) => ({
    theme: "light",
    setTheme: (newTheme: Theme) => {
      return set(() => ({ theme: newTheme }));
    },
    toggleTheme: () => {
      return set((state) => {
        document?.body.classList.toggle("dark");

        const newTheme: Theme = state.theme === "light" ? "dark" : "light";
        setToLocalStorage("theme", newTheme);
        return {
          theme: newTheme,
        };
      });
    },
  }));

export const themeStore = createThemeStore();

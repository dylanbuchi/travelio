import { create } from "zustand";

interface ThemeStore {
  theme: string;
  toggleTheme: () => void;
}

export const createThemeStore = () =>
  create<ThemeStore>((set) => ({
    theme: "light",

    toggleTheme: () => {
      return set((state) => {
        if (state.theme === "light") {
          document?.body.classList.add("dark");
        } else {
          document?.body.classList.remove("dark");
        }

        return {
          theme: state.theme === "light" ? "dark" : "light",
        };
      });
    },
  }));

export const themeStore = createThemeStore();

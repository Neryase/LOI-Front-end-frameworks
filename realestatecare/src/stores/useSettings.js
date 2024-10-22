import { create } from "zustand";

const init = localStorage.getItem("darkmode");

// Simple global store to store the user settings
export const useSettings = create((set) => ({
  darkmode: init === "yes",
  updateDarkmode: (v) => set({ darkmode: v === "yes" }),
}));

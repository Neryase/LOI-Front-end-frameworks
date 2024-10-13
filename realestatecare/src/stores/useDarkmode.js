import { create } from "zustand";

const init = localStorage.getItem("darkmode");

export const useDarkmode = create((set) => ({
  darkmode: init === "yes",
  update: (v) => set({ darkmode: v === "yes" }),
}));

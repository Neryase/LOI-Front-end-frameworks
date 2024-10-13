import { create } from "zustand";
import { useEffect } from "react";
import { Inspection } from "../models/inspection";

const URL =
  "https://my-json-server.typicode.com/Neryase/LOI-Front-end-frameworks/inspections";

// General store
export const useInspectionStore = create((set) => ({
  inspections: [],
  loading: true,
  getInspections: async () => {
    const res = await fetch(URL);
    const items = await res.json();
    set({ inspections: items.map((i) => new Inspection(i)), loading: false });
  },
}));

// React hook helper for easier data fetching
export function useGetInspections() {
  const inspections = useInspectionStore((state) => state.inspections);
  const loading = useInspectionStore((state) => state.loading);
  const getInspections = useInspectionStore((state) => state.getInspections);

  // load on mount
  useEffect(() => {
    getInspections();
  }, [getInspections]);

  return [inspections, loading];
}

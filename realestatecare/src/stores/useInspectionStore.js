import { create } from "zustand";
import { useEffect } from "react";
import { Inspection } from "../models/inspection";
import { BASE_URL } from "../constants";

// General store
export const useInspectionStore = create((set, get) => ({
  inspections: [],
  loading: true,
  getInspections: async () => {
    // Get the data from a remote server
    const res = await fetch(BASE_URL + "/inspections");
    const items = await res.json();
    // parse to model & set loading state back to false
    set({ inspections: items.map((i) => new Inspection(i)), loading: false });
  },
  closeInspection: async (id) => {
    const inspection = get().inspections.find((i) => i.id === id);
    set((state) => ({ ...state, loading: true }));
    inspection.status = "finished";
    // First post to the server to update the inspection
    await fetch(`${BASE_URL}/inspections/${inspection.id}`, {
      method: "PUT",
      body: JSON.stringify(inspection),
    });
    // then update store
    set((state) => {
      const inspections = [...state.inspections];
      const index = state.inspections.findIndex(
        (o) => o.id === inspection.id.toString(),
      );

      inspections[index] = inspection;
      return { ...state, inspections, loading: false };
    });
  },
}));

// React hook helper for easier data fetching
export function useGetInspections() {
  const inspections = useInspectionStore((state) => state.inspections);
  const loading = useInspectionStore((state) => state.loading);
  const getInspections = useInspectionStore((state) => state.getInspections);

  // load on mount
  useEffect(() => {
    if (inspections.length === 0) getInspections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInspections]);

  return [inspections, loading];
}

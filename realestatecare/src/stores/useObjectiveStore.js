import { useEffect } from "react";
import { create } from "zustand";

const URL =
  "https://my-json-server.typicode.com/Neryase/LOI-Front-end-frameworks/objectives";

export const useObjectiveStore = create((set) => ({
  objectives: [],
  getObjectives: async (id) => {
    const res = await fetch(URL);
    const items = res.json() || [];

    set({ objectives: items.filter((i) => i.inspectionId === id) });
  },
  add(objective) {
    set((state) => state.objectives.push(objective));
  },
}));

// React hook helper for easier data fetching
export function useGetObjectivesForInspection(id) {
  const objectives = useObjectiveStore((state) => state.objectives);
  const loading = useObjectiveStore((state) => state.loading);
  const getObjectives = useObjectiveStore((state) => state.getObjectives);
  // load on mount
  useEffect(() => {
    getObjectives(id);
  }, [getObjectives, id]);

  return [objectives, loading];
}

import { useEffect } from "react";
import { create } from "zustand";
import { BASE_URL } from "../constants";
import { objectiveFactory } from "../models/objective";

export const useObjectiveStore = create((set) => ({
  objectives: [],
  loading: false,
  getObjectives: async (id) => {
    // Get the data from a remote server
    const res = await fetch(BASE_URL + "/objectives");
    const items = (await res.json()) || [];
    // parse to model & set loading state back to false
    set(() => ({
      objectives: items
        .filter((i) => i.inspectionId === id)
        .map((i) => objectiveFactory(i)),
    }));
  },
  async add(objective) {
    set((state) => ({ ...state, loading: true }));
    // First post to the server to add a new objective
    await fetch(`${BASE_URL}/objectives`, {
      method: "POST",
      body: JSON.stringify(objective),
    });
    // Then update internal store
    set((state) => ({
      objectives: [...state.objectives, objectiveFactory(objective)],
      loading: false,
    }));
  },
  async update(objective) {
    set((state) => ({ ...state, loading: true }));
    // First PUT to the server, to update an objective
    await fetch(`${BASE_URL}/objectives/${objective.id}`, {
      method: "PUT",
      body: JSON.stringify(objective),
    });
    // then update store
    set((state) => {
      const objectives = [...state.objectives];
      const index = state.objectives.findIndex(
        (o) => o.id === objective.id.toString(),
      );

      if (index < 0) return { ...state, loading: false };
      objectives[index] = objectiveFactory(objective);

      return { ...state, objectives, loading: false };
    });
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

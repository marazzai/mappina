"use client";
import { createContext, useContext, useState } from "react";

export type Filters = {
  date: "oggi" | "domani" | "weekend" | null;
  categories: string[];
  freeOnly: boolean;
};

const FiltersContext = createContext<{
  filters: Filters;
  setFilters: (f: Filters) => void;
}>({
  filters: { date: null, categories: [], freeOnly: false },
  setFilters: () => {},
});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filters>({ date: null, categories: [], freeOnly: false });
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}

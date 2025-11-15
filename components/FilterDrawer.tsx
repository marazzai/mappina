"use client";
import React from "react";

const categories = [
  { key: "music", label: "Musica" },
  { key: "food", label: "Cibo" },
  { key: "art", label: "Arte" },
  { key: "sport", label: "Sport" },
];

export type FilterState = {
  date: "oggi" | "domani" | "weekend" | null;
  categories: string[];
  freeOnly: boolean;
};

export default function FilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onApply: () => void;
}) {
  return (
    <div
      className={`filter-drawer transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ boxShadow: open ? "-4px 0 24px #0002" : "none" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold text-lg">Filtri</span>
        <button onClick={onClose} className="text-xl px-2 py-1 hover:text-brand">×</button>
      </div>
      <div className="p-4 flex flex-col gap-6">
        {/* Data */}
        <div>
          <div className="font-medium mb-2">Data</div>
          <div className="flex gap-2">
            {(["oggi", "domani", "weekend"] as const).map((d) => (
              <button
                key={d}
                className={`px-3 py-1 rounded-full border ${filters.date === d ? "bg-brand text-white border-brand" : "bg-white border-neutral-300"}`}
                onClick={() => setFilters({ ...filters, date: d })}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Categorie */}
        <div>
          <div className="font-medium mb-2">Categorie</div>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.key)}
                  onChange={() => {
                    setFilters({
                      ...filters,
                      categories: filters.categories.includes(cat.key)
                        ? filters.categories.filter((c) => c !== cat.key)
                        : [...filters.categories, cat.key],
                    });
                  }}
                  className="accent-brand"
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>
        {/* Prezzo */}
        <div>
          <div className="font-medium mb-2">Prezzo</div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.freeOnly}
              onChange={() => setFilters({ ...filters, freeOnly: !filters.freeOnly })}
              className="accent-brand"
            />
            Solo eventi gratuiti
          </label>
        </div>
        {/* Azioni */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark"
            onClick={onApply}
          >
            Applica Filtri
          </button>
          <button
            className="flex-1 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100"
            onClick={onClose}
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}

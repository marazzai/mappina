"use client";
import React from "react";
import clsx from "clsx";

export interface FiltersState {
  category: string;
  date: string;
  popular: boolean;
}

interface FilterDrawerProps {
  open: boolean;
  onClose?: () => void;
  filters: FiltersState;
  setFilters: (f: FiltersState) => void;
}

const categories = ['Tutti', 'Cibo', 'Musica', 'Arte'];
const dates = ['Tutte', 'Oggi', 'Domani', 'Questa settimana'];

export function FilterDrawer({ open, onClose, filters, setFilters }: FilterDrawerProps) {
  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 z-50 w-80 max-w-full bg-secondary shadow-xl transform transition-transform duration-400 p-6',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Filtri</h2>
        <button className="p-2 text-secondary hover:text-primary" onClick={onClose}>&times;</button>
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Categoria</div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              className={clsx('px-3 py-1 rounded-full border',
                filters.category === cat ? 'bg-accent text-white border-accent' : 'bg-gray-100 text-secondary border-gray-200',
                'transition-colors')}
              onClick={() => setFilters({ ...filters, category: cat })}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Data</div>
        <div className="flex flex-wrap gap-2">
          {dates.map(date => (
            <button
              key={date}
              className={clsx('px-3 py-1 rounded-full border',
                filters.date === date ? 'bg-accent text-white border-accent' : 'bg-gray-100 text-secondary border-gray-200',
                'transition-colors')}
              onClick={() => setFilters({ ...filters, date })}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.popular}
            onChange={e => setFilters({ ...filters, popular: e.target.checked })}
            className="form-checkbox accent-accent"
          />
          <span className="font-semibold">Solo eventi popolari</span>
        </label>
      </div>
      <button
        className="bg-accent text-white px-6 py-2 rounded-xl font-bold tactile-btn w-full mt-4"
        onClick={onClose}
      >
        Applica Filtri
      </button>
    </div>
  );
}

export default FilterDrawer;

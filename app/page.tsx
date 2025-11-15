"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layout } from '../components/Layout';
import { MapPin } from '../components/MapPin';
import { BottomSheet } from '../components/BottomSheet';
import { FilterDrawer, FiltersState } from '../components/FilterDrawer';
import { TactileButton } from '../components/TactileButton';
import { ShimmerLoader } from '../components/ShimmerLoader';
import { Overlay } from '../components/Overlay';

// Inizializza Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Stato filtri di default
const defaultFilters: FiltersState = {
  category: 'Tutti',
  date: 'Tutte',
  popular: false,
};

export default function HomePage() {
  // Stato UI
  const [selected, setSelected] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch eventi da Supabase ogni volta che cambiano i filtri
  useEffect(() => {
    setLoading(true);
    setError(null);
    let query = supabase.from('events').select('*');
    if (filters.category !== 'Tutti') {
      query = query.eq('category', filters.category);
    }
    if (filters.popular) {
      query = query.gte('popularity', 10);
    }
    query
      .then(({ data, error }) => {
        setTimeout(() => { // shimmer visibile almeno 400ms
          if (error) setError(error.message);
          else setEvents(data || []);
          setLoading(false);
        }, 400);
      });
  }, [filters]);

  // La query già filtra, non serve altro filtraggio lato client
  const filteredEvents = events;

  return (
    <Layout>
      {/* MAPPA E PIN */}
      <div className="relative w-full h-[80vh] transition-all duration-500">
        <img src="https://placehold.co/1920x1080/e2e8f0/64748b?text=Mappa+della+città" className="w-full h-full object-cover" />
        {loading ? (
          <ShimmerLoader className="absolute top-1/2 left-1/2 w-16 h-16 animate-fade-in" />
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 font-bold animate-fade-in">{error}</div>
        ) : (
          filteredEvents.map(ev => (
            <MapPin
              key={ev.id}
              selected={selected === ev.id}
              popular={ev.popular}
              imgSrc={ev.img}
              style={{ top: ev.top, left: ev.left, transition: 'all 0.3s cubic-bezier(0.165,0.84,0.44,1)' }}
              onClick={() => setSelected(ev.id)}
            />
          ))
        )}
      </div>
      {/* CONTROLLI FLOTANTI */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-3">
        <div className="bg-secondary shadow-lg rounded-full p-1 flex items-center">
          <TactileButton className="w-24 py-2 rounded-full font-semibold flex items-center justify-center space-x-2 bg-accent text-white">Mappa</TactileButton>
          <TactileButton className="w-24 py-2 rounded-full font-semibold flex items-center justify-center space-x-2 text-secondary bg-transparent">Elenco</TactileButton>
        </div>
      </div>
      {/* FILTRO E OVERLAY */}
      <div className="absolute bottom-6 right-6 z-40 flex flex-col space-y-3">
        <TactileButton onClick={() => setFilterOpen(true)} className="w-14 h-14 rounded-full text-xl bg-secondary text-primary shadow-lg"><i className="fa-solid fa-sliders" /></TactileButton>
      </div>
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
      <Overlay show={filterOpen || selected !== null} onClick={() => { setFilterOpen(false); setSelected(null); }} />
      {/* BOTTOM SHEET DETTAGLIO EVENTO */}
      <BottomSheet open={selected !== null} onClose={() => setSelected(null)}>
        <div className="p-6 animate-fade-in">
          <h2 className="text-3xl font-black mb-2">{selected ? filteredEvents.find(e => e.id === selected)?.title : ''}</h2>
          <div className="flex items-center text-secondary mb-4 space-x-4">
            <span><i className="fa-solid fa-calendar-days w-5 mr-2 text-accent"></i>{selected ? filteredEvents.find(e => e.id === selected)?.date : ''}</span>
            <span><i className="fa-solid fa-user-tie w-5 mr-2 text-accent"></i>{selected ? filteredEvents.find(e => e.id === selected)?.organizer : ''}</span>
          </div>
          <p className="text-secondary leading-relaxed">{selected ? filteredEvents.find(e => e.id === selected)?.description : ''}</p>
        </div>
      </BottomSheet>
    </Layout>
  );
}

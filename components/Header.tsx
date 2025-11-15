"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useFilters } from "@/context/FiltersContext";

const FilterDrawer = dynamic(() => import("./FilterDrawer"), { ssr: false });

export type FilterState = {
  date: "oggi" | "domani" | "weekend" | null;
  categories: string[];
  freeOnly: boolean;
};

const defaultFilters: FilterState = {
  date: null,
  categories: [],
  freeOnly: false,
};

export default function Header({
  onFiltersChange,
}: {
  onFiltersChange?: (filters: FilterState) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { filters, setFilters } = useFilters();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  function handleApply() {
    setDrawerOpen(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <>
      <header className="header-blur flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand">EventMap</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full hover:bg-brand/10 text-brand text-xl"
            title="Filtri"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M4 6h16M6 12h12M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {user ? (
            <button onClick={handleLogout} className="px-4 py-1 rounded-full bg-neutral-200 text-brand font-medium shadow hover:bg-neutral-300 transition-colors">
              Logout
            </button>
          ) : (
            <Link href="/login" className="px-4 py-1 rounded-full bg-brand text-white font-medium shadow hover:bg-brand-dark transition-colors">
              Accedi / Registrati
            </Link>
          )}
        </div>
      </header>
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApply}
      />
    </>
  );
}

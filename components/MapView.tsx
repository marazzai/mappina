"use client";
import { useEffect, useState } from "react";
import { useFilters } from "@/context/FiltersContext";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("./MapContainer"), { ssr: false });

export default function MapView() {
  const { filters } = useFilters();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      let query = supabase.from("events").select("*").gte("date", new Date().toISOString());
      if (filters.categories.length) query = query.in("category", filters.categories);
      if (filters.freeOnly) query = query.eq("price_text", "Gratuito");
      // Filtro data: oggi, domani, weekend
      if (filters.date) {
        const now = new Date();
        let from: Date | undefined = undefined;
        let to: Date | undefined = undefined;
        if (filters.date === "oggi") {
          from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        } else if (filters.date === "domani") {
          from = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
        } else if (filters.date === "weekend") {
          const day = now.getDay();
          const saturday = new Date(now);
          saturday.setDate(now.getDate() + ((6 - day) % 7));
          const sunday = new Date(saturday);
          sunday.setDate(saturday.getDate() + 1);
          from = new Date(saturday.setHours(0, 0, 0, 0));
          to = new Date(sunday.setHours(23, 59, 59, 999));
        }
        if (from && to) {
          query = query.gte("date", from.toISOString()).lt("date", to.toISOString());
        }
      }
      const { data } = await query.order("date", { ascending: true });
      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, [filters]);

  if (loading) return <div className="w-full h-full flex items-center justify-center">Caricamento eventi...</div>;
  return <MapContainer events={events} />;
}

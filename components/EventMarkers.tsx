"use client";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useEffect, useState } from "react";

import type { Event } from "@/types/event";

const categoryColors: Record<string, string> = {
  music: "#7c3aed",
  food: "#fb923c",
  art: "#f472b6",
  sport: "#34d399",
};

function createIcon(category: string, image: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="border: 3px solid ${categoryColors[category]}; border-radius: 16px; overflow: hidden; width: 40px; height: 40px; box-shadow: 0 2px 8px #0002; background: #fff; display: flex; align-items: center; justify-content: center;">
      <img src='${image}' alt='' style='width: 100%; height: 100%; object-fit: cover;' />
    </div>`
  });
}

export default function EventMarkers({ onPinClick, filters }: { onPinClick?: (event: any) => void, filters?: any }) {
  const map = useMap();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    // @ts-ignore
    const markerCluster = L.markerClusterGroup();
    let filtered = events;
    if (filters) {
      if (filters.categories?.length)
        filtered = filtered.filter(e => filters.categories.includes(e.category));
      if (filters.freeOnly)
        filtered = filtered.filter(e => e.free);
      // Data: da implementare in base a struttura reale
    }
    filtered.forEach((event) => {
      const marker = L.marker([event.lat, event.lng], {
        icon: createIcon(event.category, event.image),
      });
      marker.on("click", () => onPinClick?.(event));
      markerCluster.addLayer(marker);
    });
    map.addLayer(markerCluster);
    return () => {
      map.removeLayer(markerCluster);
    };
  }, [map, events, onPinClick, filters]);

  return null;
}

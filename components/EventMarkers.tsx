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

export default function EventMarkers({ events, onPinClick }: { events: any[], onPinClick?: (event: any) => void }) {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const markerCluster = L.markerClusterGroup();
    events.forEach((event) => {
      if (!event.lat || !event.lng) return;
      const marker = L.marker([event.lat, event.lng], {
        icon: createIcon(event.category, event.image_url_square || event.image_url || "/mock/music1.jpg"),
      });
      marker.on("click", () => onPinClick?.(event));
      markerCluster.addLayer(marker);
    });
    map.addLayer(markerCluster);
    return () => {
      map.removeLayer(markerCluster);
    };
  }, [map, events, onPinClick]);

  return null;
}

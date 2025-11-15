"use client";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import dynamic from "next/dynamic";

const EventMarkers = dynamic(() => import("./EventMarkers"), { ssr: false });
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const DEFAULT_POSITION: [number, number] = [45.4642, 9.19]; // Milano centro
const DEFAULT_ZOOM = 13;

function Geolocate({ onLocate }: { onLocate: (pos: [number, number]) => void }) {
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocate([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        onLocate(DEFAULT_POSITION as [number, number]);
      }
    );
  }, [onLocate]);
  return null;
}

export default function MainMap({ onPinClick, filters }: { onPinClick?: (event: any) => void, filters?: any }) {
  const [center, setCenter] = useState<[number, number]>(DEFAULT_POSITION);
  const [userMoved, setUserMoved] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  function RecenterControl() {
    const map = mapRef.current;
    return (
      <button
        className="bg-white/90 rounded-full shadow p-2 mb-2 hover:bg-brand text-brand border border-brand map-controls"
        title="Ritorna alla posizione"
        onClick={() => {
          setCenter(center);
          if (map) map.setView(center, map.getZoom());
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </button>
    );
  }

  function MapEvents() {
    useMapEvents({
      dragstart: () => setUserMoved(true),
      zoomstart: () => setUserMoved(true),
    });
    return null;
  }

  useEffect(() => {
    // Aggiorna mapRef quando la mappa è pronta
    const interval = setInterval(() => {
      const mapEl = document.querySelector('.leaflet-container');
      if (mapEl && mapRef.current == null && (window as any).L && (window as any).L.map) {
        // fallback: non sempre necessario, ma garantisce che mapRef sia settato
        mapRef.current = (window as any).L.map(mapEl);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={center}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100vw" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Geolocate onLocate={setCenter} />
        <MapEvents />
        <EventMarkers onPinClick={onPinClick} filters={filters} />
      </MapContainer>
      <div className="map-controls">
        <RecenterControl />
        {/* Zoom controls customizzati */}
        <div className="flex flex-col gap-2">
          <button
            className="bg-white/90 rounded-full shadow p-2 hover:bg-brand text-brand border border-brand"
            title="Zoom in"
            onClick={() => mapRef.current && mapRef.current.zoomIn()}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="10" y="4" width="4" height="16" rx="2" fill="currentColor" />
              <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
            </svg>
          </button>
          <button
            className="bg-white/90 rounded-full shadow p-2 hover:bg-brand text-brand border border-brand"
            title="Zoom out"
            onClick={() => mapRef.current && mapRef.current.zoomOut()}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

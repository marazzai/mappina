




import MapView from "@/components/MapView";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Header fisso */}
      <header className="header-blur flex items-center justify-between px-6 h-14">
        <span className="text-xl font-bold text-brand">EventMap</span>
        <button className="px-4 py-1 rounded-full bg-brand text-white font-medium shadow hover:bg-brand-dark transition-colors">
          Accedi / Registrati
        </button>
      </header>
      {/* Contenitore mappa fullscreen */}
      <div className="absolute inset-0 top-14 bg-gray-100">
        <MapView />
      </div>
      {/* Pulsante recenter flottante */}
      <button className="fixed bottom-6 right-6 z-30 bg-white/90 rounded-full shadow p-3 hover:bg-brand text-brand border border-brand flex items-center justify-center" title="Ritorna alla posizione">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}


import dynamic from "next/dynamic";
import { useState } from "react";
import Header, { FilterState } from "../components/Header";
import EventSheet, { EventData } from "../components/EventSheet";

const MainMap = dynamic(() => import("../components/MapContainer"), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({ date: null, categories: [], freeOnly: false });
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handlePinClick(event: EventData) {
    setSelectedEvent(event);
    setSheetOpen(true);
  }

  function handleCloseSheet() {
    setSheetOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Header onFiltersChange={setFilters} />
      <MainMap onPinClick={handlePinClick} filters={filters} />
      <EventSheet event={selectedEvent} open={sheetOpen} onClose={handleCloseSheet} />
    </div>
  );
}

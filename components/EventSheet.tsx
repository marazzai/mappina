"use client";
import React from "react";

export type EventData = {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  place: string;
  description: string;
  price: string;
  lat: number;
  lng: number;
};

export default function EventSheet({
  event,
  open,
  onClose,
}: {
  event: EventData | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!event) return null;
  return (
    <div
      className={`event-bottom-sheet transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"} md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-[400px] md:rounded-t-none md:rounded-l-2xl md:max-h-full`}
      style={{ boxShadow: open ? "0 -4px 24px #0002" : "none" }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg">{event.title}</div>
        <button onClick={onClose} className="text-2xl px-2 py-1 hover:text-brand">×</button>
      </div>
      <img
        src={event.image}
        alt={event.title}
        className="w-full aspect-video object-cover rounded-xl mb-3"
      />
      <div className="text-sm text-neutral-500 mb-1">{event.date} • {event.time}</div>
      <div className="text-sm mb-2">{event.place}</div>
      <div className="mb-3 text-neutral-700 text-sm">{event.description}</div>
      <div className="font-semibold mb-3">{event.price}</div>
      <div className="flex gap-2 mt-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-full bg-brand text-white font-semibold text-center hover:bg-brand-dark"
        >
          Ottieni Indicazioni
        </a>
        <button
          className="flex-1 py-2 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 font-semibold"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copiato!");
            }
          }}
        >
          Condividi
        </button>
      </div>
    </div>
  );
}

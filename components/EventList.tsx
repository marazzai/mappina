import { MapPin } from './MapPin';

interface Event {
  id: number;
  title: string;
  img: string;
  category: string;
  date: string;
  place: string;
  popular?: boolean;
}

export function EventList({ events, onSelect }: { events: Event[]; onSelect: (id: number) => void }) {
  return (
    <div className="space-y-4">
      {events.map(ev => (
        <div
          key={ev.id}
          className="bg-secondary rounded-xl shadow-lg p-4 flex space-x-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => onSelect(ev.id)}
        >
          <img src={ev.img} className="w-24 h-24 rounded-lg object-cover" alt={ev.title} />
          <div>
            <h3 className="font-bold text-lg">{ev.title}</h3>
            <p className="text-secondary text-sm">{ev.date} - {ev.place}</p>
            <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded-full mt-2">{ev.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

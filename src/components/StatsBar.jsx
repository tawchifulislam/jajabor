import { MapPin, Compass } from 'lucide-react';

export default function StatsBar({ places }) {
  const totalPlaces = places.length;
  const districts = new Set(places.map(p => p.location.split(',')[0].trim()))
    .size;

  if (totalPlaces === 0) return null;

  return (
    <div className="flex items-center gap-4 rounded-full border border-line bg-card px-5 py-2.5">
      <div className="flex items-center gap-1.5">
        <Compass className="h-4 w-4 text-brand" />
        <span className="text-sm text-ink-soft">
          <strong className="text-ink">{totalPlaces}</strong> places
        </span>
      </div>
      <div className="h-4 w-px bg-line" />
      <div className="flex items-center gap-1.5">
        <MapPin className="h-4 w-4 text-brand" />
        <span className="text-sm text-ink-soft">
          <strong className="text-ink">{districts}</strong> districts
        </span>
      </div>
    </div>
  );
}

import { MapPin, Compass } from 'lucide-react';

export default function StatsBar({ places }) {
  const totalPlaces = places.length;
  const districts = new Set(places.map(p => p.location.split(',')[0].trim()))
    .size;

  if (totalPlaces === 0) return null;

  return (
    <div className="mx-auto -mt-8 mb-10 flex max-w-fit gap-6 rounded-full border border-line bg-card px-8 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Compass className="h-4 w-4 text-brand" />
        <span className="text-sm text-ink-soft">
          <strong className="text-ink">{totalPlaces}</strong> places
        </span>
      </div>
      <div className="h-5 w-px bg-line" />
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand" />
        <span className="text-sm text-ink-soft">
          <strong className="text-ink">{districts}</strong> districts
        </span>
      </div>
    </div>
  );
}

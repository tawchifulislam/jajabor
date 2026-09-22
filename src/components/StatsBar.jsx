import { MapPin, Compass, CheckCircle2 } from 'lucide-react';

export default function StatsBar({ places, visitedCount }) {
  const totalPlaces = places.length;
  const districts = new Set(places.map(p => p.location.split(',')[0].trim()))
    .size;

  if (totalPlaces === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-full border border-line bg-card px-5 py-2.5">
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
      {visitedCount !== null && visitedCount !== undefined ? (
        <>
          <div className="h-4 w-px bg-line" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-ink-soft">
              <strong className="text-ink">{visitedCount}</strong> visited by
              you
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

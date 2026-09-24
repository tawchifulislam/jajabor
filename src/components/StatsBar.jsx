import { MapPin, Compass, CheckCircle2 } from 'lucide-react';

function StatChip({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
      </span>
      <span className="text-sm text-ink-soft">
        <strong className="text-ink">{value}</strong> {label}
      </span>
    </div>
  );
}

export default function StatsBar({ places, visitedCount }) {
  const totalPlaces = places.length;
  const districts = new Set(places.map(p => p.district).filter(Boolean)).size;

  if (totalPlaces === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-full border border-line bg-card px-4 py-2">
      <StatChip
        icon={Compass}
        iconBg="bg-brand-soft"
        iconColor="text-brand"
        value={totalPlaces}
        label="places"
      />
      <div className="h-4 w-px bg-line" />
      <StatChip
        icon={MapPin}
        iconBg="bg-accent/15"
        iconColor="text-accent"
        value={districts}
        label="districts"
      />
      {visitedCount !== null && visitedCount !== undefined ? (
        <>
          <div className="h-4 w-px bg-line" />
          <StatChip
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            value={visitedCount}
            label="visited by you"
          />
        </>
      ) : null}
    </div>
  );
}

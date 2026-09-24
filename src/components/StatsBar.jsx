import { MapPin, Compass, CheckCircle2 } from 'lucide-react';

function StatChip({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
      </span>
      <span className="whitespace-nowrap text-sm text-ink-soft">
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
    <div
      className="flex max-w-full items-center gap-4 overflow-x-auto rounded-full border border-line bg-card px-4 py-2 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      <StatChip
        icon={Compass}
        iconBg="bg-brand-soft"
        iconColor="text-brand"
        value={totalPlaces}
        label="places"
      />
      <div className="h-4 w-px shrink-0 bg-line" />
      <StatChip
        icon={MapPin}
        iconBg="bg-accent/15"
        iconColor="text-accent"
        value={districts}
        label="districts"
      />
      {visitedCount !== null && visitedCount !== undefined ? (
        <>
          <div className="h-4 w-px shrink-0 bg-line" />
          <StatChip
            icon={CheckCircle2}
            iconBg="bg-success-soft"
            iconColor="text-success"
            value={visitedCount}
            label="visited by you"
          />
        </>
      ) : null}
    </div>
  );
}

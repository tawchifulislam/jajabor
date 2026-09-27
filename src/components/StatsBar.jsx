import { MapPin, Compass, CheckCircle2, Flag } from 'lucide-react';

function StatChip({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`h-3 w-3 ${iconColor}`} />
      </span>
      <span className="whitespace-nowrap text-xs text-ink-soft">
        <strong className="text-ink">{value}</strong> {label}
      </span>
    </div>
  );
}

export default function StatsBar({
  places,
  visitedCount,
  districtsVisited,
  totalDistricts,
}) {
  const totalPlaces = places.length;
  const districts = new Set(places.map(p => p.district).filter(Boolean)).size;

  if (totalPlaces === 0) return null;

  return (
    <div
      className="flex max-w-full items-center gap-3 overflow-x-auto rounded-full border border-line bg-card px-3 py-1.5 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      <StatChip
        icon={Compass}
        iconBg="bg-brand-soft"
        iconColor="text-brand"
        value={totalPlaces}
        label="places"
      />
      <div className="h-3.5 w-px shrink-0 bg-line" />
      <StatChip
        icon={MapPin}
        iconBg="bg-accent/15"
        iconColor="text-accent"
        value={districts}
        label="districts"
      />

      {visitedCount !== null && visitedCount !== undefined ? (
        <>
          <div className="h-3.5 w-px shrink-0 bg-line" />
          <StatChip
            icon={CheckCircle2}
            iconBg="bg-success-soft"
            iconColor="text-success"
            value={visitedCount}
            label="visited"
          />
        </>
      ) : null}

      {districtsVisited !== null && districtsVisited !== undefined ? (
        <>
          <div className="h-3.5 w-px shrink-0 bg-line" />
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Flag className="h-3 w-3 text-accent" />
            </span>
            <span className="whitespace-nowrap text-xs text-ink-soft">
              <strong className="text-ink">
                {districtsVisited}/{totalDistricts}
              </strong>{' '}
              <span className="font-bn">জেলা</span>
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

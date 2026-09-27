'use client';

export default function DistrictFilter({ districts, selected, onSelect }) {
  if (!districts.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex h-10 shrink-0 items-center rounded-full border px-3 text-xs font-medium transition ${
          !selected
            ? 'border-action bg-action text-white'
            : 'border-line text-ink-soft hover:bg-card'
        }`}
      >
        All
      </button>
      {districts.map(d => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`flex h-10 shrink-0 items-center rounded-full border px-3 font-bn text-xs font-medium transition ${
            selected === d
              ? 'border-action bg-action text-white'
              : 'border-line text-ink-soft hover:bg-card'
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}

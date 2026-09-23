'use client';

export default function DistrictFilter({ districts, selected, onSelect }) {
  if (!districts.length) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          !selected
            ? 'border-brand bg-brand text-white'
            : 'border-line text-ink-soft hover:bg-card'
        }`}
      >
        All
      </button>
      {districts.map(d => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`rounded-full border px-3 py-1.5 font-bn text-xs font-medium transition ${
            selected === d
              ? 'border-brand bg-brand text-white'
              : 'border-line text-ink-soft hover:bg-card'
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}

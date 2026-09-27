'use client';

import { DISTRICTS_BY_DIVISION } from '@/lib/districts';

const CHIP_THRESHOLD = 6;

export default function DistrictFilter({ districts, selected, onSelect }) {
  if (!districts.length) return null;

  if (districts.length > CHIP_THRESHOLD) {
    const grouped = {};
    for (const [division, divDistricts] of Object.entries(
      DISTRICTS_BY_DIVISION,
    )) {
      const present = divDistricts.filter(d => districts.includes(d));
      if (present.length) grouped[division] = present;
    }

    return (
      <select
        value={selected || ''}
        onChange={e => onSelect(e.target.value || null)}
        aria-label="Filter by district"
        className="h-10 rounded-full border border-line bg-card px-3 text-xs font-medium text-ink outline-none transition focus:border-brand"
      >
        <option value="">All districts</option>
        {Object.entries(grouped).map(([division, divDistricts]) => (
          <optgroup key={division} label={division}>
            {divDistricts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  }

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

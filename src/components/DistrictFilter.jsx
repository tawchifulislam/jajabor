'use client';

import { DISTRICTS_BY_DIVISION } from '@/lib/districts';

const CHIP_THRESHOLD = 6;

const chipBase =
  'flex h-10 shrink-0 items-center rounded-full px-3 text-xs font-medium transition active:scale-95';
const chipIdle = 'bg-surface-alt text-ink-soft hover:bg-line';
const chipActive = 'bg-action text-white';

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
        className="h-10 rounded-full border-0 bg-surface-alt px-3 text-xs font-medium text-ink outline-none transition focus:ring-2 focus:ring-brand/40"
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
        className={`${chipBase} ${!selected ? chipActive : chipIdle}`}
      >
        All
      </button>
      {districts.map(d => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          className={`${chipBase} font-bn ${selected === d ? chipActive : chipIdle}`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}

'use client';

import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search places or districts..."
        aria-label="Search places or districts"
        className="h-10 w-full rounded-full border-0 bg-surface-alt pl-10 pr-9 text-sm text-ink outline-none transition focus:ring-2 focus:ring-brand/40"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition hover:bg-line active:scale-90"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import PlaceGrid from './PlaceGrid';
import StatsBar from './StatsBar';
import { SearchX } from 'lucide-react';

export default function PlaceExplorer({ places }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;

    return places.filter(place => {
      const haystack = [place.title, place.location, place.howToGetThere]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [places, query]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-l-4 border-brand py-1 pl-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-brand">
            Your list
          </p>
          <h2 className="font-display text-2xl text-ink">
            Places I want to go
          </h2>
        </div>

        <StatsBar places={places} />
      </div>

      {places.length > 0 ? (
        <div className="mb-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      ) : null}

      {query && filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line py-16 text-center">
          <SearchX className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
          <p className="text-ink">No places match &ldquo;{query}&rdquo;</p>
          <button
            onClick={() => setQuery('')}
            className="text-sm text-brand underline underline-offset-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <PlaceGrid places={filtered} />
      )}
    </>
  );
}

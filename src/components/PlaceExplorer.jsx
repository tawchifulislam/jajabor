'use client';

import { useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import PlaceGrid from './PlaceGrid';
import StatsBar from './StatsBar';
import SectionHeader from './layout/SectionHeader';
import AddInviteNote from './AddInviteNote';
import ListGuidelineNote from './ListGuidelineNote';
import { SearchX } from 'lucide-react';

export default function PlaceExplorer({
  places,
  myStatuses = {},
  isLoggedIn = false,
}) {
  const [query, setQuery] = useState('');
  const [statuses, setStatuses] = useState(myStatuses);

  function handleStatusChange(placeId, next) {
    setStatuses(prev => ({ ...prev, [placeId]: next }));
  }

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

  const visitedCount = isLoggedIn
    ? places.filter(p => statuses[p._id] === 'visited').length
    : null;

  return (
    <>
      <SectionHeader
        eyebrow="Your list"
        title="Places I want to go"
        action={<StatsBar places={places} visitedCount={visitedCount} />}
        className="mb-4"
      />

      <AddInviteNote isLoggedIn={isLoggedIn} />

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
        <PlaceGrid
          places={filtered}
          myStatuses={statuses}
          isLoggedIn={isLoggedIn}
          onStatusChange={handleStatusChange}
        />
      )}

      {places.length > 0 ? <ListGuidelineNote /> : null}
    </>
  );
}

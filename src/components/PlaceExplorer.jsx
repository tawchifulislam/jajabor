'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import PlaceGrid from './PlaceGrid';
import StatsBar from './StatsBar';
import DistrictFilter from './DistrictFilter';
import SectionHeader from './layout/SectionHeader';
import AddInviteNote from './AddInviteNote';
import ListGuidelineNote from './ListGuidelineNote';
import { SearchX } from 'lucide-react';

export default function PlaceExplorer({
  places,
  myStatuses = {},
  isLoggedIn = false,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [statuses, setStatuses] = useState(myStatuses);
  const [selectedDistrict, setSelectedDistrict] = useState(
    searchParams.get('district') || null,
  );

  function handleStatusChange(placeId, next) {
    setStatuses(prev => ({ ...prev, [placeId]: next }));
  }

  const districts = useMemo(
    () =>
      Array.from(new Set(places.map(p => p.district).filter(Boolean))).sort(),
    [places],
  );

  function handleSelectDistrict(d) {
    setSelectedDistrict(d);
    const params = new URLSearchParams(window.location.search);
    if (d) params.set('district', d);
    else params.delete('district');
    router.replace(params.toString() ? `/?${params.toString()}` : '/', {
      scroll: false,
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter(place => {
      if (selectedDistrict && place.district !== selectedDistrict) return false;
      if (!q) return true;
      const haystack = [
        place.title,
        place.district,
        place.area,
        place.location,
        place.howToGetThere,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [places, query, selectedDistrict]);

  const visitedCount = isLoggedIn
    ? places.filter(p => statuses[p._id] === 'visited').length
    : null;

  const hasActiveFilter = Boolean(query || selectedDistrict);

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
        <>
          <div className="mb-4">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <DistrictFilter
            districts={districts}
            selected={selectedDistrict}
            onSelect={handleSelectDistrict}
          />
        </>
      ) : null}

      {filtered.length === 0 && hasActiveFilter ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line py-16 text-center">
          <SearchX className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
          <p className="text-ink">No places match your filters</p>
          <button
            onClick={() => {
              setQuery('');
              handleSelectDistrict(null);
            }}
            className="text-sm text-brand underline underline-offset-2"
          >
            Clear filters
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

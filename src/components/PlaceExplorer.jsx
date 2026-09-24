'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import PlaceGrid from './PlaceGrid';
import StatsBar from './StatsBar';
import DistrictFilter from './DistrictFilter';
import StatusFilter from './StatusFilter';
import SectionHeader from './layout/SectionHeader';
import AddInviteNote from './AddInviteNote';
import ListGuidelineNote from './ListGuidelineNote';
import { SearchX } from 'lucide-react';

const PAGE_SIZE = 15;

export default function PlaceExplorer({
  places,
  myStatuses = {},
  isLoggedIn = false,
  visitedCounts = {},
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [statuses, setStatuses] = useState(myStatuses);
  const [selectedDistrict, setSelectedDistrict] = useState(
    searchParams.get('district') || null,
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

      if (isLoggedIn && selectedStatus) {
        const current = statuses[place._id] || 'want-to-go';
        if (current !== selectedStatus) return false;
      }

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
  }, [places, query, selectedDistrict, selectedStatus, statuses, isLoggedIn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(PAGE_SIZE);
  }, [query, selectedDistrict, selectedStatus]);

  const visiblePlaces = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const visitedCount = isLoggedIn
    ? places.filter(p => statuses[p._id] === 'visited').length
    : null;

  const hasActiveFilter = Boolean(query || selectedDistrict || selectedStatus);

  function clearFilters() {
    setQuery('');
    setSelectedStatus(null);
    handleSelectDistrict(null);
  }

  return (
    <>
      <SectionHeader
        eyebrow="The Collection"
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
          {isLoggedIn ? (
            <StatusFilter
              selected={selectedStatus}
              onSelect={setSelectedStatus}
            />
          ) : null}
        </>
      ) : null}

      {filtered.length === 0 && hasActiveFilter ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line py-16 text-center">
          <SearchX className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
          <p className="text-ink">No places match your filters</p>
          <button
            onClick={clearFilters}
            className="text-sm text-brand underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <PlaceGrid
            places={visiblePlaces}
            myStatuses={statuses}
            isLoggedIn={isLoggedIn}
            visitedCounts={visitedCounts}
            onStatusChange={handleStatusChange}
          />

          {hasMore ? (
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-xs text-ink-faint">
                Showing {visiblePlaces.length} of {filtered.length}
              </p>
              <button
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className="rounded-full border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-card"
              >
                Load more
              </button>
            </div>
          ) : null}
        </>
      )}

      {places.length > 0 ? <ListGuidelineNote /> : null}
    </>
  );
}

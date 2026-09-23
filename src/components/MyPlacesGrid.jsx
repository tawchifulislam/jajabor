'use client';

import { useState } from 'react';
import PlaceGrid from './PlaceGrid';

const PAGE_SIZE = 15;

export default function MyPlacesGrid({ places, myStatuses }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = places.slice(0, visibleCount);
  const hasMore = places.length > visibleCount;

  return (
    <>
      <PlaceGrid places={visible} myStatuses={myStatuses} isLoggedIn />

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
            className="rounded-full border border-line px-6 py-2.5 text-sm font-medium text-ink transition hover:bg-card"
          >
            Load more ({places.length - visibleCount} more)
          </button>
        </div>
      ) : null}
    </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import PlaceGrid from './PlaceGrid';
import StatsBar from './StatsBar';
import SectionHeader from './layout/SectionHeader';
import { SearchX } from 'lucide-react';
import { useSession, signIn } from '@/lib/auth-client';

export default function PlaceExplorer({ places }) {
  const { data: session } = useSession();
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
      <SectionHeader
        title="Places I want to go"
        action={<StatsBar places={places} />}
        className="mb-3"
      />

      <p className="mb-8 text-sm text-ink-soft">
        {session?.user ? (
          <>
            Know a place worth visiting?{' '}
            <Link
              href="/add"
              className="text-brand underline underline-offset-2"
            >
              Add it to the list
            </Link>
            .
          </>
        ) : (
          <>
            Know a place worth visiting?{' '}
            <button
              onClick={() =>
                signIn.social({ provider: 'google', callbackURL: '/add' })
              }
              className="text-brand underline underline-offset-2"
            >
              Sign in with Google
            </button>{' '}
            to add it.
          </>
        )}
      </p>

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

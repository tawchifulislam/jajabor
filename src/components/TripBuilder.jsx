'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, X, ChevronUp, ChevronDown, Search } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { displayLocation } from '@/lib/placeDisplay';
import { isBengali } from '@/lib/isBengali';
import { useToast } from './ToastProvider';

export default function TripBuilder({ places }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const placeMap = useMemo(() => {
    const map = {};
    places.forEach(p => {
      map[p._id] = p;
    });
    return map;
  }, [places]);

  const availablePlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    return places.filter(p => {
      if (selectedIds.includes(p._id)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.district || '').toLowerCase().includes(q)
      );
    });
  }, [places, query, selectedIds]);

  function addPlace(id) {
    setSelectedIds(prev => [...prev, id]);
  }

  function removePlace(id) {
    setSelectedIds(prev => prev.filter(pid => pid !== id));
  }

  function moveUp(index) {
    if (index === 0) return;
    setSelectedIds(prev => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index) {
    setSelectedIds(prev => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index + 1], next[index]] = [next[index], next[index + 1]];
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Give your trip a name.');
      return;
    }
    if (selectedIds.length < 1) {
      setError('Add at least one place.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, placeIds: selectedIds }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }
      const data = await res.json();
      showToast('Trip created');
      router.push(`/trips/${data.trip.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="trip-name"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Trip name
        </label>
        <input
          id="trip-name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Sitakunda day trip"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
        />
      </div>

      {selectedIds.length > 0 ? (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Stops, in order</p>
          <ul className="space-y-2">
            {selectedIds.map((id, index) => {
              const place = placeMap[id];
              if (!place) return null;
              const loc = displayLocation(place);
              return (
                <li
                  key={id}
                  className="flex items-center gap-2 rounded-lg border border-line bg-card p-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                    {index + 1}
                  </span>
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={cloudinaryUrl(place.coverImage, 100)}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm text-ink ${
                        isBengali(place.title)
                          ? 'font-bn font-medium'
                          : 'font-medium'
                      }`}
                    >
                      {place.title}
                    </p>
                    <p
                      className={`truncate text-xs text-ink-soft ${isBengali(loc) ? 'font-bn' : ''}`}
                    >
                      {loc}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      aria-label="Move up"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface-alt disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(index)}
                      disabled={index === selectedIds.length - 1}
                      aria-label="Move down"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface-alt disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removePlace(id)}
                      aria-label="Remove"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-danger-text transition hover:bg-danger-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="trip-search"
          className="mb-1 block text-sm font-medium text-ink"
        >
          Add places
        </label>
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="trip-search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your list..."
            className="w-full rounded-full border border-line bg-card py-2.5 pl-10 pr-4 text-sm text-ink outline-none focus:border-brand"
          />
        </div>

        <ul className="max-h-72 space-y-1 overflow-y-auto rounded-lg border border-line p-2">
          {availablePlaces.length === 0 ? (
            <li className="px-2 py-4 text-center text-sm text-ink-faint">
              No more places to add.
            </li>
          ) : (
            availablePlaces.map(place => {
              const loc = displayLocation(place);
              return (
                <li key={place._id}>
                  <button
                    type="button"
                    onClick={() => addPlace(place._id)}
                    className="flex w-full items-center gap-3 rounded-lg p-1.5 text-left transition hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={cloudinaryUrl(place.coverImage, 100)}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm text-ink ${isBengali(place.title) ? 'font-bn' : ''}`}
                      >
                        {place.title}
                      </p>
                      <p
                        className={`truncate text-xs text-ink-soft ${isBengali(loc) ? 'font-bn' : ''}`}
                      >
                        {loc}
                      </p>
                    </div>
                    <Plus className="h-4 w-4 shrink-0 text-brand" />
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {error ? <p className="text-sm text-danger-text">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-action px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50"
      >
        {submitting ? 'Creating...' : 'Create trip'}
      </button>
    </form>
  );
}

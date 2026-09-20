'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

export default function PlaceForm({ initialData = null, placeId = null }) {
  const router = useRouter();
  const isEdit = Boolean(placeId);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    location: initialData?.location || '',
    coverImage: initialData?.coverImage || '',
    gallery: initialData?.gallery || [],
    howToGetThere: initialData?.howToGetThere || '',
    bestTime: initialData?.bestTime || '',
    estimatedCost: initialData?.estimatedCost || '',
    notes: initialData?.notes || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.location.trim() || !form.coverImage) {
      setError('Title, location, and a cover image are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        isEdit ? `/api/places/${placeId}` : '/api/places',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }

      const data = await res.json();
      router.push(`/places/${data.place.slug}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Title</label>
        <input
          value={form.title}
          onChange={e => update('title', e.target.value)}
          placeholder="Name of the place"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Location
        </label>
        <input
          value={form.location}
          onChange={e => update('location', e.target.value)}
          placeholder="District or area, country"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Cover image
          </label>
          <ImageUploader
            value={form.coverImage}
            onChange={url => update('coverImage', url)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Gallery (optional)
          </label>
          <ImageUploader
            value={form.gallery}
            onChange={urls => update('gallery', urls)}
            multiple
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          How to get there
        </label>
        <textarea
          value={form.howToGetThere}
          onChange={e => update('howToGetThere', e.target.value)}
          rows={4}
          placeholder="Describe how to get there - transport options, route, and stops"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Best time to visit
          </label>
          <input
            value={form.bestTime}
            onChange={e => update('bestTime', e.target.value)}
            placeholder="Best season or months to visit"
            className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Route details
          </label>
          <textarea
            value={form.estimatedCost}
            onChange={e => update('estimatedCost', e.target.value)}
            rows={3}
            placeholder="Explain the route and approximate cost in your own words"
            className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Notes</label>
        <textarea
          value={form.notes}
          onChange={e => update('notes', e.target.value)}
          rows={3}
          placeholder="Anything else worth remembering"
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-brand"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand px-6 py-3 font-medium text-white transition hover:bg-brand-dark disabled:opacity-50"
      >
        {submitting ? 'Saving...' : isEdit ? 'Save changes' : 'Add place'}
      </button>
    </form>
  );
}

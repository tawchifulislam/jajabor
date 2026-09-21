'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from './ImageUploader';
import FormSection from './FormSection';

const inputClass =
  'w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10';
const inputErrorClass =
  'w-full rounded-lg border border-red-300 bg-card px-3 py-2 text-ink outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-100';

function Required() {
  return <span className="text-red-500">*</span>;
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  function validate() {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.location.trim()) errors.location = 'Location is required.';
    if (!form.coverImage) errors.coverImage = 'Add a cover photo.';
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <p className="text-xs text-ink-soft">
        Fields marked with <Required /> are required.
      </p>

      <FormSection title="Place details">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Title <Required />
          </label>
          <input
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="Name of the place"
            className={fieldErrors.title ? inputErrorClass : inputClass}
          />
          <FieldError message={fieldErrors.title} />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            Location <Required />
          </label>
          <input
            value={form.location}
            onChange={e => update('location', e.target.value)}
            placeholder="District or area, country"
            className={fieldErrors.location ? inputErrorClass : inputClass}
          />
          <FieldError message={fieldErrors.location} />
        </div>
      </FormSection>

      <FormSection
        title="Photos"
        description="A cover photo is required - the gallery is optional."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Cover image <Required />
            </label>
            <ImageUploader
              value={form.coverImage}
              onChange={url => update('coverImage', url)}
            />
            <FieldError message={fieldErrors.coverImage} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Gallery <span className="text-ink-faint">(optional)</span>
            </label>
            <ImageUploader
              value={form.gallery}
              onChange={urls => update('gallery', urls)}
              multiple
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="Getting there">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">
            How to get there
          </label>
          <textarea
            value={form.howToGetThere}
            onChange={e => update('howToGetThere', e.target.value)}
            rows={4}
            placeholder="Describe how to get there - transport options, route, and stops"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              Best time to visit
            </label>
            <input
              value={form.bestTime}
              onChange={e => update('bestTime', e.target.value)}
              placeholder="Best season or months to visit"
              className={inputClass}
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
              className={inputClass}
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Notes"
        description="Optional - anything else worth remembering."
      >
        <textarea
          value={form.notes}
          onChange={e => update('notes', e.target.value)}
          rows={3}
          placeholder="Anything else worth remembering"
          className={inputClass}
        />
      </FormSection>

      {formError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3 border-t border-line pt-5">
        <Link
          href="/"
          className="rounded-full px-5 py-2.5 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark disabled:opacity-50"
        >
          {submitting ? 'Saving...' : isEdit ? 'Save changes' : 'Add place'}
        </button>
      </div>
    </form>
  );
}

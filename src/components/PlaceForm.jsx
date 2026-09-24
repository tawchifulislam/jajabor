'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from './ImageUploader';
import FormSection from './FormSection';
import { DISTRICTS_BY_DIVISION } from '@/lib/districts';
import { CATEGORIES } from '@/lib/categories';
import { useToast } from './ToastProvider';

const inputClass =
  'w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10';
const inputErrorClass =
  'w-full rounded-lg border border-danger/50 bg-card px-3 py-2 text-ink outline-none transition focus:border-danger focus:ring-4 focus:ring-danger/10';

function Required() {
  return <span className="text-danger">*</span>;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-danger-text">
      {message}
    </p>
  );
}

export default function PlaceForm({ initialData = null, placeId = null }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = Boolean(placeId);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    district: initialData?.district || '',
    area: initialData?.area || '',
    category: initialData?.category || '',
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
    if (!form.district) errors.district = 'Choose a district.';
    if (!form.area.trim()) errors.area = 'Area is required.';
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
      showToast(isEdit ? 'Changes saved' : 'Place added to your list');
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
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-ink"
          >
            Title <Required />
          </label>
          <input
            id="title"
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="Name of the place"
            aria-invalid={Boolean(fieldErrors.title)}
            aria-describedby={fieldErrors.title ? 'title-error' : undefined}
            className={fieldErrors.title ? inputErrorClass : inputClass}
          />
          <FieldError id="title-error" message={fieldErrors.title} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="district"
              className="mb-1 block text-sm font-medium text-ink"
            >
              District <Required />
            </label>
            <select
              id="district"
              value={form.district}
              onChange={e => update('district', e.target.value)}
              aria-invalid={Boolean(fieldErrors.district)}
              aria-describedby={
                fieldErrors.district ? 'district-error' : undefined
              }
              className={fieldErrors.district ? inputErrorClass : inputClass}
            >
              <option value="">Select a district</option>
              {Object.entries(DISTRICTS_BY_DIVISION).map(
                ([division, districts]) => (
                  <optgroup key={division} label={division}>
                    {districts.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </optgroup>
                ),
              )}
            </select>
            <FieldError id="district-error" message={fieldErrors.district} />
          </div>

          <div>
            <label
              htmlFor="area"
              className="mb-1 block text-sm font-medium text-ink"
            >
              Area <Required />
            </label>
            <input
              id="area"
              value={form.area}
              onChange={e => update('area', e.target.value)}
              placeholder="Upazila, thana, or specific spot"
              aria-invalid={Boolean(fieldErrors.area)}
              aria-describedby={fieldErrors.area ? 'area-error' : undefined}
              className={fieldErrors.area ? inputErrorClass : inputClass}
            />
            <FieldError id="area-error" message={fieldErrors.area} />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-ink"
          >
            Category <span className="text-ink-faint">(optional)</span>
          </label>
          <select
            id="category"
            value={form.category}
            onChange={e => update('category', e.target.value)}
            className={inputClass}
          >
            <option value="">Not specified</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </FormSection>

      <FormSection
        title="Photos"
        description="A cover photo is required - the gallery is optional."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <span className="mb-1 block text-sm font-medium text-ink">
              Cover image <Required />
            </span>
            <ImageUploader
              value={form.coverImage}
              onChange={url => update('coverImage', url)}
            />
            <FieldError message={fieldErrors.coverImage} />
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-ink">
              Gallery <span className="text-ink-faint">(optional)</span>
            </span>
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
          <label
            htmlFor="howToGetThere"
            className="mb-1 block text-sm font-medium text-ink"
          >
            How to get there
          </label>
          <textarea
            id="howToGetThere"
            value={form.howToGetThere}
            onChange={e => update('howToGetThere', e.target.value)}
            rows={4}
            placeholder="Describe how to get there - transport options, route, and stops"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="bestTime"
              className="mb-1 block text-sm font-medium text-ink"
            >
              Best time to visit
            </label>
            <input
              id="bestTime"
              value={form.bestTime}
              onChange={e => update('bestTime', e.target.value)}
              placeholder="Best season or months to visit"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="estimatedCost"
              className="mb-1 block text-sm font-medium text-ink"
            >
              Route details
            </label>
            <textarea
              id="estimatedCost"
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
        <label htmlFor="notes" className="sr-only">
          Notes
        </label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={e => update('notes', e.target.value)}
          rows={3}
          placeholder="Anything else worth remembering"
          className={inputClass}
        />
      </FormSection>

      {formError ? (
        <div className="rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger-text">
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

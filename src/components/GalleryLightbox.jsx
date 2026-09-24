'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';

export default function GalleryLightbox({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex(i => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setActiveIndex(i => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, next, prev]);

  if (!images?.length) return null;

  return (
    <>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {images.map((url, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-line/70 transition hover:border-brand/50"
          >
            <Image
              src={cloudinaryUrl(url, 200)}
              alt={`${alt}  photo ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <button
              onClick={e => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={cloudinaryUrl(images[activeIndex], 1600)}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 ? (
            <button
              onClick={e => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

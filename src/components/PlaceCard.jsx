'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Route } from 'lucide-react';

function isBengali(text) {
  return /[\u0980-\u09FF]/.test(text);
}

export default function PlaceCard({ place, index = 0 }) {
  const rotateClass = index % 2 === 0 ? '-rotate-[1.4deg]' : 'rotate-[1.3deg]';
  const district = place.location.split(',')[0].trim();
  const bengaliTitle = isBengali(place.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/places/${place.slug}`} className="block">
        <div
          className={`relative bg-[#fffefb] p-2.5 pb-7 shadow-[0_1px_3px_rgba(15,23,32,0.1)] ${rotateClass}`}
        >
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={place.coverImage}
              alt={place.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -top-2 left-5 h-5 w-14 -rotate-6 bg-accent/30" />

          <div className="absolute -right-3 -bottom-1 flex h-18 w-18 -rotate-12 items-center justify-center rounded-full border-[1.5px] border-dashed border-stamp bg-surface">
            <span className="px-1 text-center text-[9.5px] leading-tight tracking-wide text-stamp">
              {district}
            </span>
          </div>
        </div>

        <p
          className={
            bengaliTitle
              ? 'mt-4 font-quote text-lg text-ink'
              : 'mt-4 font-display text-lg italic text-ink'
          }
        >
          {place.title}
        </p>

        {place.howToGetThere ? (
          <p className="mt-1 flex items-start gap-1.5 text-xs text-ink-soft line-clamp-2">
            <Route className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {place.howToGetThere}
          </p>
        ) : (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
            <MapPin className="h-3.5 w-3.5" />
            {place.location}
          </p>
        )}

        {place.gallery?.length ? (
          <p className="mt-2 border-t border-dashed border-line pt-1.5 text-[11px] text-ink-soft">
            +{place.gallery.length} more photo
            {place.gallery.length === 1 ? '' : 's'}
          </p>
        ) : null}
      </Link>
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Route } from 'lucide-react';

function isBengali(text) {
  return /[\u0980-\u09FF]/.test(text);
}

export default function PlaceCard({ place, index = 0 }) {
  const baseRotate = index % 2 === 0 ? -1.2 : 1.1;
  const district = place.location.split(',')[0].trim();
  const bengaliTitle = isBengali(place.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Link href={`/places/${place.slug}`} className="block">
        <motion.div
          initial={{ rotate: baseRotate }}
          whileHover={{ rotate: 0, y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="relative bg-[#fffefb] p-2 pb-6 shadow-[0_1px_3px_rgba(15,23,32,0.08)]"
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

          <div className="absolute -top-2 left-5 h-4 w-12 rotate-[-5deg] bg-accent/25" />

          <div className="absolute -right-2 -bottom-2 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border border-dashed border-stamp bg-surface">
            <span className="font-quote px-1 text-center text-[11px] leading-tight text-stamp">
              {district}
            </span>
          </div>
        </motion.div>

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
        ) : null}
      </Link>
    </motion.div>
  );
}

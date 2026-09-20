'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Route } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';

function isBengali(text) {
  return /[\u0980-\u09FF]/.test(text);
}

export default function PlaceCard({ place, index = 0 }) {
  const district = place.location.split(',')[0].trim();
  const bengaliTitle = isBengali(place.title);
  const bengaliDistrict = isBengali(district);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: Math.min(index, 6) * 0.05,
      }}
    >
      <Link href={`/places/${place.slug}`} className="block">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="relative rounded-lg bg-[#fffefb] p-2 shadow-[0_1px_3px_rgba(15,23,32,0.08)]"
        >
          <div className="relative h-44 w-full overflow-hidden rounded-md">
            <Image
              src={cloudinaryUrl(place.coverImage, 600)}
              alt={place.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 shadow-sm">
            <MapPin className="h-3 w-3 text-brand" />
            <span
              className={
                bengaliDistrict
                  ? 'font-quote text-xs text-ink'
                  : 'text-xs font-medium text-ink'
              }
            >
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

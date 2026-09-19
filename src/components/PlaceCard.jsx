'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function PlaceCard({ place }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-card border border-line bg-card shadow-sm"
    >
      <Link href={`/places/${place.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={place.coverImage}
            alt={place.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg text-ink">{place.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
            <MapPin className="h-3.5 w-3.5" />
            {place.location}
          </p>
          {place.howToGetThere ? (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-soft line-clamp-2">
              <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {place.howToGetThere}
            </p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Images } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { isBengali } from '@/lib/isBengali';
import StatusToggle from './StatusToggle';

export default function PlaceCard({ place, index = 0 }) {
  const district = place.location.split(',')[0].trim();
  const bengaliTitle = isBengali(place.title);
  const bengaliDistrict = isBengali(district);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
        delay: Math.min(index, 6) * 0.04,
      }}
    >
      <Link
        href={`/places/${place.slug}`}
        className="group block overflow-hidden rounded-card border border-line bg-card transition-all duration-200 hover:border-line-strong hover:shadow-[0_10px_28px_-10px_rgba(15,23,32,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={cloudinaryUrl(place.coverImage, 600)}
            alt={place.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>

        <div className="p-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            <span className={bengaliDistrict ? 'font-bn' : ''}>{district}</span>
          </div>
          <div className="mb-2">
            <StatusToggle placeId={place._id} status={place.status} />
          </div>
          <h3
            title={place.title}
            className={`truncate text-base text-ink ${
              bengaliTitle ? 'font-bn font-medium' : 'font-body font-semibold'
            }`}
          >
            {place.title}
          </h3>

          {place.howToGetThere ? (
            <p
              className={`mt-1.5 line-clamp-2 text-sm text-ink-soft ${
                isBengali(place.howToGetThere) ? 'font-bn' : ''
              }`}
            >
              {place.howToGetThere}
            </p>
          ) : null}

          {place.gallery?.length ? (
            <div className="mt-3 flex items-center gap-1 border-t border-line pt-3 text-xs text-ink-faint">
              <Images className="h-3.5 w-3.5" />
              {place.gallery.length} photo
              {place.gallery.length === 1 ? '' : 's'}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}

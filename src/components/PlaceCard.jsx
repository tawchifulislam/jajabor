'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Images, MapPin } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { isBengali } from '@/lib/isBengali';
import { displayLocation } from '@/lib/placeDisplay';
import { isNew } from '@/lib/isNew';
import StatusToggle from './StatusToggle';
import VisitedCount from './VisitedCount';

export default function PlaceCard({
  place,
  index = 0,
  status,
  editable = false,
  onStatusChange,
  visitedCount = 0,
}) {
  const location = displayLocation(place);
  const bengaliTitle = isBengali(place.title);
  const bengaliLocation = isBengali(location);
  const href = `/places/${place.slug}`;
  const showNew = isNew(place.createdAt);

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
      <div className="group overflow-hidden rounded-card border border-line bg-card transition-all duration-200 hover:border-line-strong hover:shadow-[0_10px_28px_-10px_rgba(15,23,32,0.18)]">
        <Link
          href={href}
          className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
          {showNew ? (
            <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 font-bn text-[10px] font-medium text-white shadow-sm">
              নতুন
            </span>
          ) : null}
        </Link>

        <div className="p-4">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-ink-soft">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span className={`truncate ${bengaliLocation ? 'font-bn' : ''}`}>
                {location}
              </span>
            </div>
            <StatusToggle
              placeId={place._id}
              status={status}
              editable={editable}
              onChange={onStatusChange}
            />
          </div>

          <Link href={href} className="block">
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
          </Link>

          {place.gallery?.length || visitedCount > 0 ? (
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              {place.gallery?.length ? (
                <span className="flex items-center gap-1 text-xs text-ink-faint">
                  <Images className="h-3.5 w-3.5" />
                  {place.gallery.length} photo
                  {place.gallery.length === 1 ? '' : 's'}
                </span>
              ) : (
                <span />
              )}
              <VisitedCount count={visitedCount} />
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

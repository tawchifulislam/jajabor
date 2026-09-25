import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, User } from 'lucide-react';
import { headers } from 'next/headers';
import Container from '@/components/layout/Container';
import TripDirectionsButton from '@/components/TripDirectionsButton';
import TripActions from '@/components/TripActions';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { canEditTrip } from '@/lib/canEditTrip';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { isBengali } from '@/lib/isBengali';
import { displayLocation } from '@/lib/placeDisplay';

async function getTrip(slug) {
  const db = await getDb();
  const trip = await db.collection('trips').findOne({ slug });
  if (!trip) return null;

  const places = await db
    .collection('places')
    .find({ _id: { $in: trip.placeIds } })
    .toArray();

  const placeMap = {};
  places.forEach(p => {
    placeMap[p._id.toString()] = p;
  });

  const orderedPlaces = trip.placeIds
    .map(id => placeMap[id.toString()])
    .filter(Boolean);

  return JSON.parse(JSON.stringify({ ...trip, places: orderedPlaces }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) return { title: 'Trip not found - Jajabor' };

  return {
    title: `${trip.name} - Jajabor`,
    description: `A ${trip.places.length}-stop trip: ${trip.places.map(p => p.title).join(', ')}`,
  };
}

export default async function TripPage({ params }) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  const editAllowed = canEditTrip(trip, session);

  return (
    <Container as="main" size="narrow" className="flex-1 py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-display text-2xl text-ink sm:text-3xl">
            {trip.name}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {trip.places.length} stop{trip.places.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <TripDirectionsButton places={trip.places} />
          {editAllowed ? <TripActions tripId={trip._id} /> : null}
        </div>
      </div>

      <ol className="space-y-3">
        {trip.places.map((place, index) => {
          const loc = displayLocation(place);
          return (
            <li key={place._id}>
              <Link
                href={`/places/${place.slug}`}
                className="flex items-center gap-3 rounded-card border border-line bg-card p-3 transition hover:border-line-strong hover:shadow-[0_6px_20px_-8px_rgba(15,23,32,0.15)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                  {index + 1}
                </span>
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={cloudinaryUrl(place.coverImage, 150)}
                    alt={place.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-base text-ink ${
                      isBengali(place.title)
                        ? 'font-bn font-medium'
                        : 'font-semibold'
                    }`}
                  >
                    {place.title}
                  </p>
                  <p
                    className={`flex items-center gap-1 truncate text-xs text-ink-soft ${
                      isBengali(loc) ? 'font-bn' : ''
                    }`}
                  >
                    <MapPin className="h-3 w-3 shrink-0" />
                    {loc}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {trip.createdBy?.name ? (
        <p className="mt-6 flex items-center gap-1.5 text-xs text-ink-faint">
          <User className="h-3.5 w-3.5" />
          Trip by {trip.createdBy.name}
        </p>
      ) : null}
    </Container>
  );
}

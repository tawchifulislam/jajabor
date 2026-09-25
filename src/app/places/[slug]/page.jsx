import Image from 'next/image';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import PlaceActions from '@/components/PlaceActions';
import ShareButton from '@/components/ShareButton';
import GalleryLightbox from '@/components/GalleryLightbox';
import QuickFacts from '@/components/QuickFacts';
import PlanningSection from '@/components/PlanningSection';
import NearbyPlaces from '@/components/NearbyPlaces';
import StatusToggle from '@/components/StatusToggle';
import Breadcrumb from '@/components/Breadcrumb';
import AddedByCredit from '@/components/AddedByCredit';
import Container from '@/components/layout/Container';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { isAdmin } from '@/lib/isAdmin';
import { canEditPlace } from '@/lib/canEditPlace';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { isBengali } from '@/lib/isBengali';
import { displayLocation } from '@/lib/placeDisplay';
import { getMyStatuses, getVisitedCounts } from '@/lib/placeStatus';
import { headers } from 'next/headers';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jajabor.vercel.app';

function PlaceJsonLd({ place }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: place.title,
    image: cloudinaryUrl(place.coverImage, 1200),
    description: place.notes || place.howToGetThere || place.title,
    address: {
      '@type': 'PostalAddress',
      addressLocality: place.area || undefined,
      addressRegion: place.district || undefined,
      addressCountry: 'BD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

async function getPlace(slug) {
  const db = await getDb();
  const place = await db.collection('places').findOne({ slug });
  return place ? JSON.parse(JSON.stringify(place)) : null;
}

async function getNearbyPlaces(district, excludeId) {
  if (!district) return [];
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({ district, _id: { $ne: new ObjectId(excludeId) } })
    .limit(3)
    .toArray();
  return JSON.parse(JSON.stringify(places));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const place = await getPlace(slug);

  if (!place) {
    return { title: 'Place not found - Jajabor' };
  }

  const description =
    place.howToGetThere?.slice(0, 155) ||
    `A place to visit in ${displayLocation(place)}.`;

  return {
    title: `${place.title} - Jajabor`,
    description,
    openGraph: {
      title: place.title,
      description,
      images: [{ url: cloudinaryUrl(place.coverImage, 1200) }],
    },
  };
}

export default async function PlaceDetailPage({ params }) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  const admin = isAdmin(session);
  const editAllowed = canEditPlace(place, session);
  const isLoggedIn = Boolean(session?.user);

  const nearby = await getNearbyPlaces(place.district, place._id);
  const nearbyIds = nearby.map(p => p._id);

  const [myStatusMap, visitedCountMap, nearbyStatuses] = await Promise.all([
    isLoggedIn
      ? getMyStatuses(session.user.id, [place._id])
      : Promise.resolve({}),
    getVisitedCounts([place._id]),
    isLoggedIn && nearbyIds.length
      ? getMyStatuses(session.user.id, nearbyIds)
      : Promise.resolve({}),
  ]);

  const myStatus = myStatusMap[place._id];
  const visitedCount = visitedCountMap[place._id] || 0;
  const pageUrl = `${siteUrl}/places/${place.slug}`;

  return (
    <>
      <PlaceJsonLd place={place} />
      <Container as="main" size="narrow" className="flex-1 py-10">
        <Breadcrumb district={place.district} title={place.title} />

        <div className="relative mb-3 h-64 w-full overflow-hidden rounded-card sm:h-72">
          <Image
            src={cloudinaryUrl(place.coverImage, 1200)}
            alt={place.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        {place.gallery?.length ? (
          <GalleryLightbox images={place.gallery} alt={place.title} />
        ) : null}

        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1
              className={`text-2xl text-ink sm:text-3xl ${
                isBengali(place.title)
                  ? 'font-bn font-semibold'
                  : 'font-display'
              }`}
            >
              {place.title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <p
                className={`flex items-center gap-1.5 text-ink-soft ${
                  isBengali(displayLocation(place)) ? 'font-bn' : ''
                }`}
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {displayLocation(place)}
              </p>
              <StatusToggle
                placeId={place._id}
                status={myStatus}
                editable={isLoggedIn}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ShareButton title={place.title} url={pageUrl} />
            <PlaceActions
              placeId={place._id}
              slug={place.slug}
              canEdit={editAllowed}
              canDelete={admin}
            />
          </div>
        </div>

        <QuickFacts
          category={place.category}
          bestTime={place.bestTime}
          photoCount={place.gallery?.length || 0}
          visitedCount={visitedCount}
        />

        <AddedByCredit
          name={place.addedBy?.name}
          createdAt={place.createdAt}
          updatedAt={place.updatedAt}
        />

        {place.notes ? (
          <section className="mb-6">
            <h2 className="mb-2 font-display text-lg text-ink">Notes</h2>
            <p
              className={`whitespace-pre-line text-ink-soft ${
                isBengali(place.notes) ? 'font-bn' : ''
              }`}
            >
              {place.notes}
            </p>
          </section>
        ) : null}

        <PlanningSection
          title={place.title}
          howToGetThere={place.howToGetThere}
          estimatedCost={place.estimatedCost}
          area={place.area}
          district={place.district}
        />

        <NearbyPlaces
          places={nearby}
          district={place.district}
          myStatuses={nearbyStatuses}
        />
      </Container>
    </>
  );
}

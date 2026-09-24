import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import PlaceActions from '@/components/PlaceActions';
import GalleryLightbox from '@/components/GalleryLightbox';
import QuickFacts from '@/components/QuickFacts';
import PlanningSection from '@/components/PlanningSection';
import StatusToggle from '@/components/StatusToggle';
import Breadcrumb from '@/components/Breadcrumb';
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
import AddedByCredit from '@/components/AddedByCredit';

async function getPlace(slug) {
  const db = await getDb();
  const place = await db.collection('places').findOne({ slug });
  return place ? JSON.parse(JSON.stringify(place)) : null;
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
  const myStatus = isLoggedIn
    ? (await getMyStatuses(session.user.id, [place._id]))[place._id]
    : undefined;
  const visitedCount = (await getVisitedCounts([place._id]))[place._id] || 0;

  return (
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
              isBengali(place.title) ? 'font-bn font-semibold' : 'font-display'
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
        <PlaceActions
          placeId={place._id}
          slug={place.slug}
          canEdit={editAllowed}
          canDelete={admin}
        />
      </div>

      <QuickFacts
        category={place.category}
        bestTime={place.bestTime}
        photoCount={place.gallery?.length || 0}
        visitedCount={visitedCount}
      />

      <AddedByCredit name={place.addedBy?.name} />

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
        howToGetThere={place.howToGetThere}
        estimatedCost={place.estimatedCost}
      />
    </Container>
  );
}

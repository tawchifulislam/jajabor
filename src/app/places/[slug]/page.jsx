import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Route as RouteIcon, Navigation } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminActions from '@/components/AdminActions';
import GalleryLightbox from '@/components/GalleryLightbox';
import QuickFacts from '@/components/QuickFacts';
import StatusToggle from '@/components/StatusToggle';
import Container from '@/components/layout/Container';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { isAdmin } from '@/lib/isAdmin';
import { cloudinaryUrl } from '@/lib/cloudinaryUrl';
import { isBengali } from '@/lib/isBengali';
import { getMyStatuses } from '@/lib/placeStatus';
import { headers } from 'next/headers';

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
    `A place to visit in ${place.location}.`;

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
  const isLoggedIn = Boolean(session?.user);
  const myStatus = isLoggedIn
    ? (await getMyStatuses(session.user.id, [place._id]))[place._id]
    : undefined;

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Container as="main" size="narrow" className="flex-1 py-10">
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-card sm:h-72">
          <Image
            src={cloudinaryUrl(place.coverImage, 1200)}
            alt={place.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

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
                  isBengali(place.location) ? 'font-bn' : ''
                }`}
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {place.location}
              </p>
              <StatusToggle
                placeId={place._id}
                status={myStatus}
                editable={isLoggedIn}
              />
            </div>
          </div>
          {admin ? (
            <AdminActions placeId={place._id} slug={place.slug} />
          ) : null}
        </div>

        <QuickFacts
          bestTime={place.bestTime}
          photoCount={place.gallery?.length || 0}
        />

        {place.howToGetThere ? (
          <section className="mb-6 rounded-card border border-line bg-card p-5">
            <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
              <Navigation className="h-4 w-4 text-brand" />
              How to get there
            </h2>
            <p
              className={`whitespace-pre-line text-ink-soft ${
                isBengali(place.howToGetThere) ? 'font-bn' : ''
              }`}
            >
              {place.howToGetThere}
            </p>
          </section>
        ) : null}

        {place.estimatedCost ? (
          <section className="mb-6 rounded-card border border-line bg-card p-5">
            <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
              <RouteIcon className="h-4 w-4 text-brand" />
              Route details
            </h2>
            <p
              className={`whitespace-pre-line text-ink-soft ${
                isBengali(place.estimatedCost) ? 'font-bn' : ''
              }`}
            >
              {place.estimatedCost}
            </p>
          </section>
        ) : null}

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

        {place.gallery?.length ? (
          <section>
            <h2 className="mb-3 font-display text-lg text-ink">Gallery</h2>
            <GalleryLightbox images={place.gallery} alt={place.title} />
          </section>
        ) : null}
      </Container>
      <Footer />
    </div>
  );
}

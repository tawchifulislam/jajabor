import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, CalendarDays, Wallet, Navigation } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AdminActions from '@/components/AdminActions';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { isAdmin } from '@/lib/isAdmin';
import { headers } from 'next/headers';

async function getPlace(slug) {
  const db = await getDb();
  const place = await db.collection('places').findOne({ slug });
  return place ? JSON.parse(JSON.stringify(place)) : null;
}

export default async function PlaceDetailPage({ params }) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  const admin = isAdmin(session);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <div className="relative mb-6 h-72 w-full overflow-hidden rounded-card">
          <Image
            src={place.coverImage}
            alt={place.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-ink">{place.title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-ink-soft">
              <MapPin className="h-4 w-4" />
              {place.location}
            </p>
          </div>
          {admin ? (
            <AdminActions placeId={place._id} slug={place.slug} />
          ) : null}
        </div>

        {place.howToGetThere ? (
          <section className="mb-6 rounded-card border border-line bg-card p-5">
            <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
              <Navigation className="h-4 w-4 text-brand" />
              How to get there
            </h2>
            <p className="whitespace-pre-line text-ink-soft">
              {place.howToGetThere}
            </p>
          </section>
        ) : null}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {place.bestTime ? (
            <div className="rounded-card border border-line bg-card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-soft">
                <CalendarDays className="h-3.5 w-3.5" />
                Best time
              </p>
              <p className="mt-1 text-ink">{place.bestTime}</p>
            </div>
          ) : null}
          {place.estimatedCost ? (
            <div className="rounded-card border border-line bg-card p-4">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink-soft">
                <Wallet className="h-3.5 w-3.5" />
                Estimated cost
              </p>
              <p className="mt-1 text-ink">{place.estimatedCost}</p>
            </div>
          ) : null}
        </div>

        {place.notes ? (
          <section className="mb-6">
            <h2 className="mb-2 font-display text-lg text-ink">Notes</h2>
            <p className="whitespace-pre-line text-ink-soft">{place.notes}</p>
          </section>
        ) : null}

        {place.gallery?.length ? (
          <section>
            <h2 className="mb-3 font-display text-lg text-ink">Gallery</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {place.gallery.map((url, idx) => (
                <div
                  key={idx}
                  className="relative h-32 overflow-hidden rounded-lg"
                >
                  <Image src={url} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

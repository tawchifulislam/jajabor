import Navbar from '@/components/Navbar';
import PlaceGrid from '@/components/PlaceGrid';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

async function getPlaces() {
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return JSON.parse(JSON.stringify(places));
}

export default async function HomePage() {
  const places = await getPlaces();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-ink">
            Places I want to go
          </h1>
          <p className="mt-1 text-ink-soft">
            {places.length} place{places.length === 1 ? '' : 's'} on the list
          </p>
        </div>
        <PlaceGrid places={places} />
      </main>
    </>
  );
}

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import PlaceGrid from '@/components/PlaceGrid';
import Footer from '@/components/Footer';
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
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Hero
        quote={
          'সারা বিশ্ব হয়ে যায় আমার নিজের ঘর\nখোলা আকাশের নিচে সবাই যাযাবর'
        }
      />
      <StatsBar places={places} />
      <main className="mx-auto max-w-7xl flex-1 px-5 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-l-4 border-brand py-1 pl-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-brand">
              Your list
            </p>
            <h2 className="font-display text-2xl text-ink">
              Places I want to go
            </h2>
          </div>

          {places.length > 0 ? (
            <p className="text-sm text-ink-soft">
              <strong className="text-ink">{places.length}</strong> place
              {places.length === 1 ? '' : 's'} saved
            </p>
          ) : null}
        </div>
        <PlaceGrid places={places} />
      </main>
      <Footer />
    </div>
  );
}

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlaceExplorer from '@/components/PlaceExplorer';
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
      <main className="mx-auto max-w-7xl flex-1 px-5 py-10">
        <PlaceExplorer places={places} />
      </main>
      <Footer />
    </div>
  );
}

import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Navbar from '@/components/Navbar';
import PlaceForm from '@/components/PlaceForm';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { isAdmin } from '@/lib/isAdmin';

async function getPlace(slug) {
  const db = await getDb();
  const place = await db.collection('places').findOne({ slug });
  return place ? JSON.parse(JSON.stringify(place)) : null;
}

export default async function EditPlacePage({ params }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!isAdmin(session)) redirect('/');

  const place = await getPlace(slug);
  if (!place) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="mb-6 font-display text-2xl text-ink">Edit place</h1>
        <PlaceForm initialData={place} placeId={place._id} />
      </main>
    </>
  );
}

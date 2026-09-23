import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import PlaceForm from '@/components/PlaceForm';
import Container from '@/components/layout/Container';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { canEditPlace } from '@/lib/canEditPlace';

async function getPlace(slug) {
  const db = await getDb();
  const place = await db.collection('places').findOne({ slug });
  return place ? JSON.parse(JSON.stringify(place)) : null;
}

export default async function EditPlacePage({ params }) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!canEditPlace(place, session)) redirect('/');

  return (
    <Container as="main" size="form" className="flex-1 py-10">
      <h1 className="mb-6 font-display text-2xl text-ink">Edit place</h1>
      <PlaceForm initialData={place} placeId={place._id} />
    </Container>
  );
}

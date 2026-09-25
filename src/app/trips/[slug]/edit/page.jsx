import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { canEditTrip } from '@/lib/canEditTrip';
import Container from '@/components/layout/Container';
import TripBuilder from '@/components/TripBuilder';

async function getTrip(slug) {
  const db = await getDb();
  return db.collection('trips').findOne({ slug });
}

export default async function EditTripPage({ params }) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) notFound();

  const session = await auth.api.getSession({ headers: await headers() });
  if (!canEditTrip(trip, session)) redirect('/');

  const db = await getDb();
  const places = await db
    .collection('places')
    .find({})
    .project({ title: 1, district: 1, area: 1, coverImage: 1, location: 1 })
    .sort({ title: 1 })
    .toArray();

  return (
    <Container as="main" size="form" className="flex-1 py-10">
      <h1 className="mb-6 font-display text-2xl text-ink">Edit trip</h1>
      <TripBuilder
        places={JSON.parse(JSON.stringify(places))}
        initialData={JSON.parse(JSON.stringify(trip))}
        tripId={trip._id.toString()}
      />
    </Container>
  );
}

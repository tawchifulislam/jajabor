import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import Container from '@/components/layout/Container';
import TripBuilder from '@/components/TripBuilder';

export default async function NewTripPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const db = await getDb();
  const places = await db
    .collection('places')
    .find({})
    .project({ title: 1, district: 1, area: 1, coverImage: 1, location: 1 })
    .sort({ title: 1 })
    .toArray();

  return (
    <Container as="main" size="form" className="flex-1 py-10">
      <h1 className="mb-2 font-display text-2xl text-ink">Plan a trip</h1>
      <p className="mb-6 text-sm text-ink-soft">
        Pick a few places from the list, put them in order, and get a shareable
        link - perfect for planning a day out with more than one stop.
      </p>
      <TripBuilder places={JSON.parse(JSON.stringify(places))} />
    </Container>
  );
}

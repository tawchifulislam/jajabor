import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import Container from '@/components/layout/Container';
import PlaceGrid from '@/components/PlaceGrid';
import SectionHeader from '@/components/layout/SectionHeader';
import { getMyStatuses } from '@/lib/placeStatus';

export const dynamic = 'force-dynamic';

export default async function MyPlacesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const db = await getDb();
  const places = await db
    .collection('places')
    .find({ 'addedBy.id': session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const serialized = JSON.parse(JSON.stringify(places));
  const myStatuses = await getMyStatuses(
    session.user.id,
    serialized.map(p => p._id),
  );

  return (
    <Container as="main" className="flex-1 py-10">
      <SectionHeader
        eyebrow="Your contributions"
        title="Places you added"
        className="mb-6"
      />
      <PlaceGrid places={serialized} myStatuses={myStatuses} isLoggedIn />
    </Container>
  );
}

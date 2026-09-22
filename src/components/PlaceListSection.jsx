import { headers } from 'next/headers';
import { getDb } from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { getMyStatuses } from '@/lib/placeStatus';
import PlaceExplorer from './PlaceExplorer';

export default async function PlaceListSection() {
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const session = await auth.api.getSession({ headers: await headers() });
  const isLoggedIn = Boolean(session?.user);
  const myStatuses = isLoggedIn
    ? await getMyStatuses(
        session.user.id,
        places.map(p => p._id.toString()),
      )
    : {};

  return (
    <PlaceExplorer
      places={JSON.parse(JSON.stringify(places))}
      myStatuses={myStatuses}
      isLoggedIn={isLoggedIn}
    />
  );
}

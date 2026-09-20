import { getDb } from '@/lib/mongodb';
import PlaceExplorer from './PlaceExplorer';

export default async function PlaceListSection() {
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return <PlaceExplorer places={JSON.parse(JSON.stringify(places))} />;
}

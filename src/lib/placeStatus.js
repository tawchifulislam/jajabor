import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';

export async function getMyStatuses(userId, placeIds) {
  if (!userId || !placeIds.length) return {};
  const db = await getDb();
  const records = await db
    .collection('placeStatuses')
    .find({ userId, placeId: { $in: placeIds.map(id => new ObjectId(id)) } })
    .toArray();

  const map = {};
  for (const r of records) {
    map[r.placeId.toString()] = r.status;
  }
  return map;
}

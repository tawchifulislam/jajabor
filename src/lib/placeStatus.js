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

export async function getVisitedCounts(placeIds) {
  if (!placeIds.length) return {};
  const db = await getDb();
  const results = await db
    .collection('placeStatuses')
    .aggregate([
      {
        $match: {
          placeId: { $in: placeIds.map(id => new ObjectId(id)) },
          status: 'visited',
        },
      },
      { $group: { _id: '$placeId', count: { $sum: 1 } } },
    ])
    .toArray();

  const map = {};
  for (const r of results) {
    map[r._id.toString()] = r.count;
  }
  return map;
}

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function PATCH(req, { params }) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { placeId } = await params;
  if (!ObjectId.isValid(placeId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json();
  const status = body.status === 'visited' ? 'visited' : 'want-to-go';

  const db = await getDb();
  await db
    .collection('placeStatuses')
    .updateOne(
      { placeId: new ObjectId(placeId), userId: session.user.id },
      { $set: { status, updatedAt: new Date() } },
      { upsert: true },
    );

  return NextResponse.json({ status });
}

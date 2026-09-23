import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDb();
  const places = await db
    .collection('places')
    .find({ 'addedBy.id': session.user.id })
    .project({ title: 1, slug: 1 })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ places: JSON.parse(JSON.stringify(places)) });
}

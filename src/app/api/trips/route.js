import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function POST(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, placeIds } = body;

  if (!name?.trim() || !Array.isArray(placeIds) || placeIds.length < 1) {
    return NextResponse.json(
      { error: 'name and at least one place are required' },
      { status: 400 },
    );
  }

  const slugBase = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  const doc = {
    name: name.trim(),
    slug: `${slugBase}-${Date.now().toString(36)}`,
    placeIds: placeIds.map(id => new ObjectId(id)),
    createdBy: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || null,
    },
    createdAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection('trips').insertOne(doc);

  return NextResponse.json(
    { trip: { ...doc, _id: result.insertedId } },
    { status: 201 },
  );
}

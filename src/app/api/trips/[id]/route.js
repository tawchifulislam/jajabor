import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { canEditTrip } from '@/lib/canEditTrip';

export async function PATCH(req, { params }) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const db = await getDb();
  const existing = await db
    .collection('trips')
    .findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (!canEditTrip(existing, session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { name, placeIds } = body;

  if (!name?.trim() || !Array.isArray(placeIds) || placeIds.length < 1) {
    return NextResponse.json(
      { error: 'name and at least one place are required' },
      { status: 400 },
    );
  }

  const update = {
    name: name.trim(),
    placeIds: placeIds.map(pid => new ObjectId(pid)),
    updatedAt: new Date(),
  };

  const result = await db
    .collection('trips')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' },
    );

  return NextResponse.json({ trip: result });
}

export async function DELETE(req, { params }) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const db = await getDb();
  const existing = await db
    .collection('trips')
    .findOne({ _id: new ObjectId(id) });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  if (!canEditTrip(existing, session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await db.collection('trips').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}

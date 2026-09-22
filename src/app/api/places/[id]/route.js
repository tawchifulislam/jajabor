import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { isAdmin } from '@/lib/isAdmin';

async function requireAdmin(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!isAdmin(session)) return null;
  return session;
}

export async function PATCH(req, { params }) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const allowed = [
      'title',
      'district',
      'area',
      'category',
      'coverImage',
      'gallery',
      'howToGetThere',
      'bestTime',
      'estimatedCost',
      'notes',
    ];

    const update = {};
    for (const key of allowed) {
      if (key in body) update[key] = body[key];
    }
    update.updatedAt = new Date();

    const db = await getDb();
    const result = await db
      .collection('places')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' },
      );

    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ place: result });
  } catch (err) {
    console.error('PATCH /api/places/[id] error:', err);
    return NextResponse.json(
      { error: 'Failed to update place' },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db
      .collection('places')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/places/[id] error:', err);
    return NextResponse.json(
      { error: 'Failed to delete place' },
      { status: 500 },
    );
  }
}

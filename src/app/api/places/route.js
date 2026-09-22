import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const places = await db
      .collection('places')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ places });
  } catch (err) {
    console.error('GET /api/places error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      district,
      area,
      category,
      coverImage,
      gallery,
      howToGetThere,
      bestTime,
      estimatedCost,
      notes,
    } = body;

    if (!title?.trim() || !district?.trim() || !area?.trim() || !coverImage) {
      return NextResponse.json(
        { error: 'title, district, area, and coverImage are required' },
        { status: 400 },
      );
    }

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const doc = {
      title: title.trim(),
      slug: `${slug}-${Date.now().toString(36)}`,
      district: district.trim(),
      area: area.trim(),
      category: category?.trim() || '',
      coverImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      howToGetThere: howToGetThere?.trim() || '',
      bestTime: bestTime?.trim() || '',
      estimatedCost: estimatedCost?.trim() || '',
      notes: notes?.trim() || '',
      addedBy: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || null,
      },
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection('places').insertOne(doc);

    return NextResponse.json(
      { place: { ...doc, _id: result.insertedId } },
      { status: 201 },
    );
  } catch (err) {
    console.error('POST /api/places error:', err);
    return NextResponse.json(
      { error: 'Failed to create place' },
      { status: 500 },
    );
  }
}

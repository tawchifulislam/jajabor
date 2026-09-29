import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://waynama.vercel.app';
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({}, { projection: { slug: 1, createdAt: 1, updatedAt: 1 } })
    .toArray();

  const placeEntries = places.map(place => ({
    url: `${siteUrl}/places/${place.slug}`,
    lastModified: place.updatedAt || place.createdAt || new Date(),
  }));

  return [{ url: siteUrl, lastModified: new Date() }, ...placeEntries];
}

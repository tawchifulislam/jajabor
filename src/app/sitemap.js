import { getDb } from '@/lib/mongodb';

export default async function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jajabor.vercel.app';
  const db = await getDb();
  const places = await db
    .collection('places')
    .find({}, { projection: { slug: 1, createdAt: 1 } })
    .toArray();

  const placeEntries = places.map(place => ({
    url: `${siteUrl}/places/${place.slug}`,
    lastModified: place.createdAt || new Date(),
  }));

  return [{ url: siteUrl, lastModified: new Date() }, ...placeEntries];
}

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Map, Plus } from 'lucide-react';
import { auth } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { isBengali } from '@/lib/isBengali';
import Container from '@/components/layout/Container';
import SectionHeader from '@/components/layout/SectionHeader';

export const dynamic = 'force-dynamic';

export default async function MyTripsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/');

  const db = await getDb();
  const trips = await db
    .collection('trips')
    .find({ 'createdBy.id': session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <Container as="main" className="flex-1 py-10">
      <SectionHeader
        eyebrow="Your trips"
        title="Planned trips"
        action={
          trips.length > 0 ? (
            <Link
              href="/trips/new"
              className="rounded-full bg-action px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Plan a trip
            </Link>
          ) : null
        }
        className="mb-6"
      />

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-alt">
            <Map className="h-6 w-6 text-ink-soft" strokeWidth={1.5} />
          </span>
          <div>
            <p className="font-display text-lg text-ink">No trips yet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Combine a few places into a shareable plan.
            </p>
          </div>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-action px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            <Plus className="h-4 w-4" />
            Plan a trip
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {trips.map(trip => (
            <li key={trip._id.toString()}>
              <Link
                href={`/trips/${trip.slug}`}
                className="flex items-center justify-between gap-4 rounded-card border border-line bg-card p-4 transition hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <div>
                  <p
                    className={`text-ink ${
                      isBengali(trip.name)
                        ? 'font-bn font-medium'
                        : 'font-medium'
                    }`}
                  >
                    {trip.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {trip.placeIds.length} stop
                    {trip.placeIds.length === 1 ? '' : 's'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

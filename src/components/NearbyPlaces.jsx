import PlaceCard from './PlaceCard';
import { isBengali } from '@/lib/isBengali';

export default function NearbyPlaces({ places, district, myStatuses = {} }) {
  if (!places?.length) return null;

  return (
    <section className="mb-6">
      <h2 className="mb-3 font-display text-lg text-ink">
        Also in{' '}
        <span className={isBengali(district) ? 'font-bn' : ''}>{district}</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {places.map((p, i) => (
          <PlaceCard
            key={p._id}
            place={p}
            index={i}
            status={myStatuses[p._id]}
          />
        ))}
      </div>
    </section>
  );
}

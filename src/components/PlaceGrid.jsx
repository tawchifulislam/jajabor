import PlaceCard from './PlaceCard';
import EmptyState from './EmptyState';

export default function PlaceGrid({ places }) {
  if (!places?.length) {
    return (
      <div className="mx-auto max-w-xl">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {places.map(place => (
        <PlaceCard key={place._id} place={place} />
      ))}
    </div>
  );
}

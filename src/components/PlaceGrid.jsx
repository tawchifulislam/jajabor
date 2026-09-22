import PlaceCard from './PlaceCard';
import EmptyState from './EmptyState';

export default function PlaceGrid({
  places,
  myStatuses = {},
  isLoggedIn = false,
  onStatusChange,
}) {
  if (!places?.length) {
    return (
      <div className="mx-auto max-w-xl">
        <EmptyState />
      </div>
    );
  }

  if (places.length < 3) {
    return (
      <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
        {places.map((place, i) => (
          <div
            key={place._id}
            className="w-full max-w-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <PlaceCard
              place={place}
              index={i}
              status={myStatuses[place._id]}
              editable={isLoggedIn}
              onStatusChange={onStatusChange}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place, i) => (
        <PlaceCard
          key={place._id}
          place={place}
          index={i}
          status={myStatuses[place._id]}
          editable={isLoggedIn}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

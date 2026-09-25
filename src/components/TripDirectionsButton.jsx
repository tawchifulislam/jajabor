import { Navigation2 } from "lucide-react";

function toQuery(place) {
  return encodeURIComponent([place.title, place.area].filter(Boolean).join(", "));
}

export default function TripDirectionsButton({ places }) {
  if (!places?.length) return null;

  let url;
  if (places.length === 1) {
    url = `https://www.google.com/maps/search/?api=1&query=${toQuery(places[0])}`;
  } else {
    const origin = toQuery(places[0]);
    const destination = toQuery(places[places.length - 1]);
    const waypoints = places.slice(1, -1).map(toQuery).join("|");
    url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ""
    }`;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-action px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
    >
      <Navigation2 className="h-4 w-4" />
      Get directions
    </a>
  );
}
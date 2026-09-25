import { Navigation2 } from 'lucide-react';

export default function DirectionsButton({ title, area, district }) {
  if (!area && !district) return null;

  const query = [title, area, district, 'Bangladesh']
    .filter(Boolean)
    .join(', ');
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-action px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
    >
      <Navigation2 className="h-4 w-4" />
      Get directions
    </a>
  );
}

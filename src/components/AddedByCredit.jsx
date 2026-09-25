import { User, Clock } from 'lucide-react';

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export default function AddedByCredit({ name, createdAt, updatedAt }) {
  const wasUpdated =
    updatedAt &&
    createdAt &&
    new Date(updatedAt) - new Date(createdAt) > 24 * 60 * 60 * 1000;

  if (!name && !wasUpdated) return null;

  return (
    <p className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-faint">
      {name ? (
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          Added by {name}
        </span>
      ) : null}
      {wasUpdated ? (
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          Updated {formatDate(updatedAt)}
        </span>
      ) : null}
    </p>
  );
}

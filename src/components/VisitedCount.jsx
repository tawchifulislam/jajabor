import { Users } from 'lucide-react';

export default function VisitedCount({ count, full = false }) {
  if (!count || count < 1) return null;

  return (
    <span className="flex items-center gap-1 text-xs text-ink-faint">
      <Users className="h-3.5 w-3.5" />
      <span className="font-bn">
        {count} জন {full ? 'ঘুরে এসেছেন' : 'গেছেন'}
      </span>
    </span>
  );
}

import { User } from 'lucide-react';

export default function AddedByCredit({ name }) {
  if (!name) return null;

  return (
    <p className="mb-6 flex items-center gap-1.5 text-xs text-ink-faint">
      <User className="h-3.5 w-3.5" />
      Added by {name}
    </p>
  );
}

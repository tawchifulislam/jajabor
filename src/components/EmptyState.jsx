import { MapPinned } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line py-24 text-center">
      <MapPinned className="h-10 w-10 text-ink-soft" strokeWidth={1.5} />
      <p className="font-display text-lg text-ink">No places yet</p>
      <p className="max-w-sm text-sm text-ink-soft">
        Sign in and add the first place you want to visit.
      </p>
    </div>
  );
}

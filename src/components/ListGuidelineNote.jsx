import { ShieldCheck } from 'lucide-react';

export default function ListGuidelineNote() {
  return (
    <div className="mt-10 flex flex-col items-center gap-2 border-t border-line pt-6 text-center text-sm text-ink-soft">
      <ShieldCheck className="h-4 w-4 text-brand" />
      <p>
        Add only places you&apos;ve personally visited, that are safe to travel
        to, and that you know well.
      </p>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Shuffle } from 'lucide-react';

export default function RandomPlaceButton({ slugs }) {
  const router = useRouter();

  if (!slugs?.length) return null;

  function goRandom() {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/places/${slug}`);
  }

  return (
    <button
      onClick={goRandom}
      className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-surface-alt px-3 text-xs font-medium text-ink-soft transition hover:bg-line active:scale-95"
    >
      <Shuffle className="h-3.5 w-3.5" />
      Surprise me
    </button>
  );
}

'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useAppSession } from './SessionProvider';

export default function AddFab() {
  const user = useAppSession();

  if (!user) return null;

  return (
    <Link
      href="/add"
      aria-label="Add place"
      className="fixed right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition active:scale-95 sm:hidden"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <Plus className="h-6 w-6" />
    </Link>
  );
}

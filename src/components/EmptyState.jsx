'use client';

import { MapPinned, LogIn } from 'lucide-react';
import { signIn, useSession } from '@/lib/auth-client';

export default function EmptyState() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-card border border-dashed border-line bg-card/40 px-6 py-20 text-center sm:py-28">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft">
        <MapPinned className="h-8 w-8 text-brand" strokeWidth={1.6} />
      </div>

      <div>
        <p className="font-display text-xl text-ink">No places yet</p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
          {session?.user
            ? "You haven't added any places yet - start with the first one."
            : 'Sign in and add the first place you want to visit.'}
        </p>
      </div>

      {!session?.user ? (
        <button
          onClick={() =>
            signIn.social({ provider: 'google', callbackURL: '/add' })
          }
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          <LogIn className="h-4 w-4" />
          Sign in with Google
        </button>
      ) : null}
    </div>
  );
}

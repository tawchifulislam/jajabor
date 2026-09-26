'use client';

import { PenLine } from 'lucide-react';
import { signIn } from '@/lib/auth-client';

export default function AddInviteNote({ isLoggedIn }) {
  if (isLoggedIn) return null;

  return (
    <p className="mb-4 flex items-center gap-1.5 text-sm text-ink-soft">
      <PenLine className="h-3.5 w-3.5 shrink-0 text-accent" />
      Know a place worth visiting?{' '}
      <button
        onClick={() =>
          signIn.social({ provider: 'google', callbackURL: '/add' })
        }
        className="font-medium text-brand hover:underline"
      >
        Sign in to add it
      </button>
    </p>
  );
}

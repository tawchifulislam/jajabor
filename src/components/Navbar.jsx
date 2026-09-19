'use client';

import Link from 'next/link';
import { Compass, Plus, LogIn, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-brand" strokeWidth={2.2} />
          <span className="font-display text-xl tracking-tight text-ink">
            Jajabor
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? null : session?.user ? (
            <>
              <Link
                href="/add"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add place
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm text-ink-soft transition hover:bg-card"
                title={session.user.email}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                signIn.social({ provider: 'google', callbackURL: '/' })
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition hover:bg-card"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Plus, LogIn, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from '@/lib/auth-client';
import JajaborMark from './JajaborMark';
import Container from './layout/Container';

export default function Navbar() {
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/80 backdrop-blur">
      <Container className="flex items-center justify-between py-3 sm:py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <JajaborMark className="h-6 w-8 sm:h-7 sm:w-9" />
          <span className="font-display text-lg tracking-tight text-ink sm:text-xl">
            Jajabor
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? null : session?.user ? (
            <>
              <Link
                href="/add"
                aria-label="Add place"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-dark sm:px-4"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add place</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink transition hover:bg-card sm:px-4"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </Container>
    </header>
  );
}

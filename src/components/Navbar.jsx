'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, LogIn, LogOut, Loader2 } from 'lucide-react';
import { signIn, signOut } from '@/lib/auth-client';
import { useAppSession } from './SessionProvider';
import JajaborMark from './JajaborMark';
import Container from './layout/Container';

export default function Navbar() {
  const user = useAppSession();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.refresh();
  }

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
          {user ? (
            <>
              <Link
                href="/add"
                className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-dark sm:inline-flex"
              >
                <Plus className="h-4 w-4" />
                Add place
              </Link>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card disabled:opacity-50"
                title={user.email}
              >
                {signingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
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
      </Container>
    </header>
  );
}

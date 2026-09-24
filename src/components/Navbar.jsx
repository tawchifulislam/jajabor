'use client';

import Link from 'next/link';
import { Plus, LogIn } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import { useAppSession } from './SessionProvider';
import ProfileMenu from './ProfileMenu';
import ThemeToggle from './ThemeToggle';
import JajaborMark from './JajaborMark';
import Container from './layout/Container';

export default function Navbar() {
  const user = useAppSession();

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
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/add"
                className="hidden items-center gap-1.5 rounded-full bg-action px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 sm:inline-flex"
              >
                <Plus className="h-4 w-4" />
                Add place
              </Link>
              <ProfileMenu />
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

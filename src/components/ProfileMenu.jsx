'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, MapPin, Loader2, User } from 'lucide-react';
import { signOut } from '@/lib/auth-client';
import { useAppSession } from './SessionProvider';

export default function ProfileMenu() {
  const user = useAppSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    router.refresh();
  }

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-card transition hover:bg-surface-alt"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || 'Profile'}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-4 w-4 text-ink-soft" />
        )}
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-card border border-line bg-card p-2 shadow-lg">
          <p className="truncate px-2 py-1.5 text-xs text-ink-soft">
            {user.email}
          </p>

          <Link
            href="/my-places"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-ink transition hover:bg-surface-alt"
          >
            <MapPin className="h-4 w-4 text-brand" />
            Your places
          </Link>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-1 flex w-full items-center gap-2 rounded-md border-t border-line px-2 pt-2 text-sm text-ink-soft transition hover:text-ink disabled:opacity-50"
          >
            {signingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

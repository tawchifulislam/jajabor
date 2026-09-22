'use client';

import { signIn } from '@/lib/auth-client';

export default function SignInPrompt() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
      <h1 className="font-display text-2xl text-ink">Sign in required</h1>
      <p className="text-ink-soft">You need a Google account to add a place.</p>
      <button
        onClick={() =>
          signIn.social({ provider: 'google', callbackURL: '/add' })
        }
        className="rounded-full bg-brand px-6 py-2.5 font-medium text-white transition hover:bg-brand-dark"
      >
        Sign in with Google
      </button>
    </div>
  );
}

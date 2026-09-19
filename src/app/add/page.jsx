'use client';

import { useSession, signIn } from '@/lib/auth-client';
import Navbar from '@/components/Navbar';
import PlaceForm from '@/components/PlaceForm';

export default function AddPlacePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  if (!session?.user) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-5 py-24 text-center">
          <h1 className="font-display text-2xl text-ink">Sign in required</h1>
          <p className="text-ink-soft">
            You need a Google account to add a place.
          </p>
          <button
            onClick={() =>
              signIn.social({ provider: 'google', callbackURL: '/add' })
            }
            className="rounded-full bg-brand px-6 py-2.5 font-medium text-white"
          >
            Sign in with Google
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="mb-6 font-display text-2xl text-ink">Add a place</h1>
        <PlaceForm />
      </main>
    </>
  );
}

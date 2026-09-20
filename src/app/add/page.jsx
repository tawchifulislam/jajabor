'use client';

import { useSession, signIn } from '@/lib/auth-client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlaceForm from '@/components/PlaceForm';
import Container from '@/components/layout/Container';

export default function AddPlacePage() {
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  if (!session?.user) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <Container
          as="main"
          className="flex flex-1 items-center justify-center py-24"
        >
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <h1 className="font-display text-2xl text-ink">Sign in required</h1>
            <p className="text-ink-soft">
              You need a Google account to add a place.
            </p>
            <button
              onClick={() =>
                signIn.social({ provider: 'google', callbackURL: '/add' })
              }
              className="rounded-full bg-brand px-6 py-2.5 font-medium text-white transition hover:bg-brand-dark"
            >
              Sign in with Google
            </button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Container as="main" size="form" className="flex-1 py-10">
        <h1 className="mb-2 font-display text-2xl text-ink">Add a place</h1>
        <p className="mb-6 text-sm text-ink-soft">
          This is where you log a new place on your list - give it a title and
          location, a cover photo, and jot down how to get there. The more
          detail you leave yourself now, the more useful it&apos;ll be later.
        </p>
        <PlaceForm />
      </Container>
      <Footer />
    </div>
  );
}

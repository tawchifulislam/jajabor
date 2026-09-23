import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import PlaceForm from '@/components/PlaceForm';
import SignInPrompt from '@/components/SignInPrompt';
import Container from '@/components/layout/Container';

export default async function AddPlacePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="flex min-h-dvh flex-col">
        <Container
          as="main"
          className="flex flex-1 items-center justify-center py-24"
        >
          <SignInPrompt />
        </Container>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Container as="main" size="form" className="flex-1 py-10">
        <h1 className="mb-2 font-display text-2xl text-ink">Add a place</h1>
        <p className="mb-6 text-sm text-ink-soft">
          This is where you log a new place on your list - give it a title and
          location, a cover photo, and jot down how to get there. The more
          detail you leave yourself now, the more useful it&apos;ll be later.
        </p>
        <PlaceForm />
      </Container>
    </div>
  );
}

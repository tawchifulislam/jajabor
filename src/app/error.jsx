'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import Container from '@/components/layout/Container';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <AlertTriangle className="h-10 w-10 text-ink-soft" strokeWidth={1.5} />
      <h1 className="font-display text-2xl text-ink">
        Something went off course
      </h1>
      <p className="max-w-sm text-ink-soft">
        That didn&apos;t load the way it should have. You can try again, or head
        back to the list.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-full bg-action px-6 py-2.5 font-medium text-white transition hover:brightness-110"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-2.5 font-medium text-ink transition hover:bg-card"
        >
          Back to the list
        </Link>
      </div>
    </Container>
  );
}

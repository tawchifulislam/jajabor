import Link from "next/link";
import { Compass } from "lucide-react";
import Container from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container
      as="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <Compass className="h-10 w-10 text-ink-soft" strokeWidth={1.5} />
      <h1 className="font-display text-2xl text-ink">This place isn&apos;t on the map</h1>
      <p className="max-w-sm text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="rounded-full bg-action px-6 py-2.5 font-medium text-white transition hover:brightness-110"
      >
        Back to the list
      </Link>
    </Container>
  );
}
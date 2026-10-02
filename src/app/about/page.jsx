import {
  ShieldCheck,
  MapPin,
  Github,
  Globe,
  CodeXml,
  Mail,
} from 'lucide-react';
import Container from '@/components/layout/Container';

export const metadata = {
  title: 'About - WayNama',
  description: "What WayNama is, who it's for, and how to add a place.",
};

export default function AboutPage() {
  return (
    <Container as="main" size="narrow" className="flex-1 py-10">
      <h1 className="mb-2 font-display text-2xl text-ink sm:text-3xl">
        About WayNama
      </h1>
      <p className="mb-8 text-ink-soft">
        WayNama (পথের-গল্প) started as one person&apos;s private list of places
        worth visiting in Bangladesh - photos, routes, and notes kept in one
        place. It&apos;s now open for anyone to add to.
      </p>

      <section className="mb-6 rounded-card border border-line bg-card p-5">
        <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
          <MapPin className="h-4 w-4 text-brand" />
          What you can do here
        </h2>
        <p className="text-ink-soft">
          Browse places by district or category, mark places as &ldquo;want to
          go&rdquo; or &ldquo;visited&rdquo;, and sign in with Google to add a
          place you&apos;ve personally been to - with photos, how to get there,
          and anything else worth remembering.
        </p>
      </section>

      <section className="mb-6 rounded-card border border-line bg-card p-5">
        <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
          <ShieldCheck className="h-4 w-4 text-brand" />
          Before you add a place
        </h2>
        <p className="text-ink-soft">
          Add only places you&apos;ve personally visited, that are safe to
          travel to, and that you know well. This keeps the list honest and
          useful for the next traveler.
        </p>
      </section>

      <section className="rounded-card border border-line bg-card p-5">
        <h2 className="mb-2 font-display text-lg text-ink">Built by</h2>
        <p className="mb-3 text-ink-soft">
          WayNama is built and maintained by Tawchiful Islam, a frontend-focused
          full-stack developer based in Chattogram, Bangladesh.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href="https://github.com/tawchifulislam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand hover:underline"
          >
            <CodeXml className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://tawchif.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand hover:underline"
          >
            <Globe className="h-4 w-4" />
            Portfolio
          </a>
        </div>
      </section>
      <section className="mt-6 rounded-card border border-line bg-surface-alt/60 p-5">
        <h2 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
          <Mail className="h-4 w-4 text-brand" />
          Found something wrong?
        </h2>
        <p className="text-ink-soft">
          If a route, photo, or detail seems outdated or incorrect, let us know
          at{' '}
          <a
            href="mailto:tawchif04@gmail.com"
            className="text-brand hover:underline"
          >
            tawchif04@gmail.com
          </a>
          .
        </p>
      </section>
    </Container>
  );
}

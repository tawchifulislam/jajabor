import Link from 'next/link';
import { Code2 } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import Container from './layout/Container';
import RaidhoMark from './RaidhoMark';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-soft sm:flex-row sm:py-8">
        <Link
          href="/"
          className="flex items-center gap-0.5 transition hover:text-ink"
        >
          <RaidhoMark className="h-6 w-6" />
          <span className="font-display text-ink">WayNama</span>
        </Link>

        <MusicPlayer />

        <a
          href="https://github.com/tawchifulislam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition hover:text-ink"
        >
          <Code2 className="h-4 w-4" />
          tawchifulislam
        </a>
      </Container>
    </footer>
  );
}

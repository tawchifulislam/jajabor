import Link from 'next/link';
import { Code2 } from 'lucide-react';
import JajaborMark from './JajaborMark';
import MusicPlayer from './MusicPlayer';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-ink-soft sm:flex-row sm:py-8">
        <Link
          href="/"
          className="flex items-center gap-1.5 transition hover:text-ink"
        >
          <JajaborMark className="h-5 w-6" />
          <span className="font-display text-ink">Jajabor</span>
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
      </div>
    </footer>
  );
}

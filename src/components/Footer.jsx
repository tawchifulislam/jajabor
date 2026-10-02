import Link from "next/link";
import { Code2 } from "lucide-react";
import RaidhoMark from "./RaidhoMark";
import Container from "./layout/Container";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row sm:py-8">
        <Link href="/" className="flex items-center gap-1 transition hover:text-ink">
          <RaidhoMark className="h-6 w-6" />
          <span className="font-display text-ink">WayNama</span>
        </Link>

        <Link href="/about" className="text-ink-soft transition hover:text-ink">
          About
        </Link>

        <a
          href="https://github.com/tawchifulislam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-ink-faint transition hover:text-ink-soft"
        >
          <Code2 className="h-3.5 w-3.5" />
          Built by Tawchiful Islam
        </a>
      </Container>
    </footer>
  );
}
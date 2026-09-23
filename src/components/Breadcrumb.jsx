import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { isBengali } from '@/lib/isBengali';

export default function Breadcrumb({ district, title }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 overflow-hidden text-xs text-ink-soft"
    >
      <Link href="/" className="shrink-0 transition hover:text-ink">
        Home
      </Link>
      {district ? (
        <>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className={`shrink-0 ${isBengali(district) ? 'font-bn' : ''}`}>
            {district}
          </span>
        </>
      ) : null}
      <ChevronRight className="h-3 w-3 shrink-0" />
      <span
        title={title}
        className={`truncate text-ink ${isBengali(title) ? 'font-bn' : ''}`}
      >
        {title}
      </span>
    </nav>
  );
}

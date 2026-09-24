import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { isBengali } from '@/lib/isBengali';

export default function Breadcrumb({ district, title }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex min-w-0 items-center gap-1.5 text-xs text-ink-soft"
    >
      <Link href="/" className="shrink-0 transition hover:text-ink">
        Home
      </Link>
      {district ? (
        <>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link
            href={`/?district=${encodeURIComponent(district)}`}
            title={district}
            className={`max-w-22.5 shrink truncate transition hover:text-ink ${
              isBengali(district) ? 'font-bn' : ''
            }`}
          >
            {district}
          </Link>
        </>
      ) : null}
      <ChevronRight className="h-3 w-3 shrink-0" />
      <span
        title={title}
        className={`min-w-0 flex-1 truncate text-ink ${isBengali(title) ? 'font-bn' : ''}`}
      >
        {title}
      </span>
    </nav>
  );
}

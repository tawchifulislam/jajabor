import { Flag } from 'lucide-react';

export default function ReportIssueLink({ title, url }) {
  const subject = encodeURIComponent(`Issue with: ${title}`);
  const body = encodeURIComponent(`Page: ${url}\n\nWhat's wrong:\n`);

  return (
    <a
      href={`mailto:tawchif04@gmail.com?subject=${subject}&body=${body}`}
      className="inline-flex items-center gap-1.5 text-xs text-ink-faint transition hover:text-ink-soft"
    >
      <Flag className="h-3.5 w-3.5" />
      Report an issue with this place
    </a>
  );
}

export default function RaidhoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path
        d="M30 10 L30 90 M30 10 L65 30 L30 50 L65 90"
        stroke="var(--color-brand)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="78" cy="22" r="7" fill="var(--color-accent)" />
    </svg>
  );
}

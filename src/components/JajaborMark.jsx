export default function JajaborMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 70 34" fill="none" className={className}>
      <path
        d="M5,5 Q20,22 35,30 Q50,22 65,8 Q58,2 50,10 Q42,16 35,14 Q28,16 20,10 Q12,2 5,5 Z"
        fill="var(--color-brand)"
      />
      <circle cx="65" cy="8" r="3" fill="var(--color-accent)" />
    </svg>
  );
}

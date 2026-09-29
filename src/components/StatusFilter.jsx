'use client';

const OPTIONS = [
  { value: null, label: 'All' },
  { value: 'want-to-go', label: 'যেতে চাই' },
  { value: 'visited', label: 'ঘুরে এসেছি' },
];

export default function StatusFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {OPTIONS.map(opt => (
        <button
          key={opt.label}
          onClick={() => onSelect(opt.value)}
          className={`flex h-10 shrink-0 items-center rounded-full px-3 text-xs font-medium transition active:scale-95 ${
            selected === opt.value
              ? 'bg-action text-white'
              : 'bg-surface-alt text-ink-soft hover:bg-line'
          } ${opt.value ? 'font-bn' : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

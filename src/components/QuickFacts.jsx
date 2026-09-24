import { CalendarDays, Images, Users } from 'lucide-react';
import { isBengali } from '@/lib/isBengali';
import { getCategory } from '@/lib/categories';

export default function QuickFacts({
  category,
  bestTime,
  photoCount,
  visitedCount,
}) {
  const items = [];
  const cat = getCategory(category);

  if (cat) {
    items.push({ icon: cat.icon, content: cat.label, bengali: true });
  }

  if (bestTime) {
    items.push({
      icon: CalendarDays,
      content: bestTime,
      bengali: isBengali(bestTime),
    });
  }

  if (photoCount > 0) {
    items.push({
      icon: Images,
      content: `${photoCount} photo${photoCount === 1 ? '' : 's'}`,
      bengali: false,
    });
  }

  if (visitedCount > 0) {
    items.push({
      icon: Users,
      content: `${visitedCount} জন ঘুরে এসেছেন`,
      bengali: true,
    });
  }

  if (!items.length) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-line bg-surface-alt/60 px-4 py-3">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 text-sm text-ink-soft"
        >
          <item.icon className="h-4 w-4 text-brand" />
          <span className={item.bengali ? 'font-bn' : ''}>{item.content}</span>
        </span>
      ))}
    </div>
  );
}

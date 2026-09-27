'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import StatusToggle from './StatusToggle';

export default function PlaceStatusRow({
  placeId,
  initialStatus,
  editable,
  initialVisitedCount = 0,
}) {
  const [status, setStatus] = useState(initialStatus || 'want-to-go');
  const [visitedCount, setVisitedCount] = useState(initialVisitedCount);

  function handleChange(id, next) {
    setVisitedCount(prev => {
      if (next === 'visited' && status !== 'visited') return prev + 1;
      if (status === 'visited' && next !== 'visited')
        return Math.max(0, prev - 1);
      return prev;
    });
    setStatus(next);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <StatusToggle
        placeId={placeId}
        status={status}
        editable={editable}
        onChange={handleChange}
      />
      {visitedCount > 0 ? (
        <span className="flex items-center gap-1 text-xs text-ink-faint">
          <Users className="h-3.5 w-3.5" />
          <span className="font-bn">{visitedCount} জন ঘুরে এসেছেন</span>
        </span>
      ) : null}
    </div>
  );
}

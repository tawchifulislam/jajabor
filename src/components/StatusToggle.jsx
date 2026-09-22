'use client';

import { useState } from 'react';
import { CheckCircle2, Compass, Loader2 } from 'lucide-react';
import { useToast } from './ToastProvider';

const LABELS = {
  'want-to-go': 'যেতে চাই',
  visited: 'ঘুরে এসেছি',
};

export default function StatusToggle({ placeId, status, editable = false }) {
  const { showToast } = useToast();
  const [current, setCurrent] = useState(status || 'want-to-go');
  const [loading, setLoading] = useState(false);

  if (!editable) return null;

  const isVisited = current === 'visited';

  async function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    const next = isVisited ? 'want-to-go' : 'visited';
    setLoading(true);
    try {
      const res = await fetch(`/api/place-status/${placeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error('Update failed');
      setCurrent(next);
      showToast(
        next === 'visited' ? 'Marked as visited' : 'Moved back to want-to-go',
      );
    } catch {
      showToast("Couldn't update status", 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 font-bn text-xs font-medium transition hover:opacity-80 ${
        isVisited
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-brand-soft text-brand-dark'
      }`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isVisited ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Compass className="h-3.5 w-3.5" />
      )}
      {LABELS[current]}
    </button>
  );
}

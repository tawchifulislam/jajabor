'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminActions({ placeId, slug }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this place permanently?')) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/places/${placeId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/');
      router.refresh();
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/places/${slug}/edit`}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:bg-card"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        {deleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Delete
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from './ToastProvider';

export default function TripActions({ tripId, slug }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/trips/${tripId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Trip deleted');
      router.push('/my-trips');
      router.refresh();
    } catch (err) {
      showToast(err.message || "Couldn't delete this trip", 'error');
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/trips/${slug}/edit`}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
        <button
          onClick={() => setConfirmOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-danger/30 px-4 py-2 text-sm text-danger-text transition hover:bg-danger-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this trip?"
        description="This can't be undone — the trip itself will be removed. The places on it stay in the main list."
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

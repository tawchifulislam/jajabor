'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from './ToastProvider';

export default function PlaceActions({ placeId, slug, canEdit, canDelete }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!canEdit && !canDelete) return null;

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/places/${placeId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setConfirmOpen(false);
      showToast('Place deleted');
      router.push('/');
      router.refresh();
    } catch (err) {
      showToast(err.message || "Couldn't delete this place", 'error');
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {canEdit ? (
          <Link
            href={`/places/${slug}/edit`}
            className="inline-flex items-center gap-1.5 rounded-full border border-danger/30 px-4 py-2 text-sm text-danger-text transition hover:bg-danger-soft"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        ) : null}
        {canDelete ? (
          <button
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-danger/30 px-4 py-2 text-sm text-danger transition hover:bg-danger-soft"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        ) : null}
      </div>

      {canDelete ? (
        <ConfirmDialog
          open={confirmOpen}
          title="Delete this place?"
          description="This can't be undone - the entry and its photos will be removed from your list."
          confirmLabel="Delete"
          danger
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}
    </>
  );
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-sm rounded-card border border-line bg-card p-5 shadow-lg"
          >
            <h3 className="font-display text-lg text-ink">{title}</h3>
            {description ? (
              <p className="mt-1.5 text-sm text-ink-soft">{description}</p>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={onCancel}
                disabled={loading}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:bg-surface disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`rounded-full px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${
                  danger
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-brand hover:bg-brand-dark'
                }`}
              >
                {loading ? 'Please wait...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

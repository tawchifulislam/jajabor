'use client';

import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function Hero({ quote, attribution }) {
  const lines = quote.split('\n');

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="route-dots absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
          }}
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft"
        >
          <Compass className="h-6 w-6 text-brand" strokeWidth={2} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="quote-mark select-none text-6xl text-brand/25"
        >
          “
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="-mt-4 font-quote text-3xl leading-relaxed text-ink sm:text-4xl"
        >
          {lines.map((line, idx) => (
            <span key={idx} className="block">
              {idx === lines.length - 1 ? (
                <>
                  {line.replace('যাযাবর', '')}
                  <span className="text-brand">যাযাবর</span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.blockquote>

        <svg
          viewBox="0 0 200 20"
          className="route-line mx-auto mt-6 h-5 w-40"
          fill="none"
        >
          <path
            d="M2 10 Q 50 -5, 100 10 T 198 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-brand/40"
          />
        </svg>

        {attribution ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-sm tracking-wide text-ink-soft"
          >
            — {attribution}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import Container from './layout/Container';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const DOT_DURATION = 4500;

function AnimatedRouteDot({ pathRef }) {
  const dotRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useAnimationFrame(t => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const length = path.getTotalLength();
    const progress = reducedMotion ? 0 : (t % DOT_DURATION) / DOT_DURATION;
    const point = path.getPointAtLength(progress * length);
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
  });

  return <circle ref={dotRef} r="4" fill="var(--color-accent)" />;
}

export default function Hero({ quote, attribution }) {
  const pathRef = useRef(null);
  const lines = quote.split('\n');

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="route-dots absolute inset-0" />

      <Container size="narrow" className="relative py-16 text-center sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="quote-mark select-none text-5xl text-brand/25 sm:text-6xl"
        >
          “
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="-mt-3 font-quote text-xl leading-snug text-ink sm:-mt-4 sm:text-2xl sm:leading-relaxed md:text-3xl lg:text-4xl"
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
          viewBox="0 0 200 24"
          className="mx-auto mt-8 h-6 w-40 overflow-visible"
          fill="none"
        >
          <path
            ref={pathRef}
            d="M2 12 Q 50 -3, 100 12 T 198 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-brand/40"
          />
          <AnimatedRouteDot pathRef={pathRef} />
        </svg>

        {attribution ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-sm tracking-wide text-ink-soft"
          >
            — {attribution}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}

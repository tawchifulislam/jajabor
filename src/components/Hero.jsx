'use client';

import { motion } from 'framer-motion';
import Container from './layout/Container';

export default function Hero({ quote, attribution }) {
  const lines = quote.split('\n');

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="route-dots absolute inset-0" />

      <Container size="narrow" className="relative py-14 text-center sm:py-20">
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
            id="hero-route-path"
            d="M2 12 Q 50 -3, 100 12 T 198 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-brand/40"
          />
          <g className="text-brand">
            <path
              d="M0,1.4 Q4.3,6.3 7.5,8.6 Q10.7,6.3 13.9,2.3 Q12.4,0.6 10.7,2.3 Q9,3.4 7.5,4 Q6,3.4 4.3,2.3 Q2.6,0.6 0,1.4 Z"
              fill="currentColor"
            />
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-route-path" />
            </animateMotion>
          </g>
        </svg>

        {attribution ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 text-sm tracking-wide text-ink-soft"
          >
            - {attribution}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TAGLINES = [
  "Web design and development",
  "Email marketing",
  "Digital media",
] as const;

const INTERVAL_MS = 2800;

export function HeroTaglines() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % TAGLINES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="mt-6 min-h-[5rem] max-w-5xl overflow-visible sm:min-h-[4rem]"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="relative inline-grid min-h-[1.15em] align-baseline">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={TAGLINES[index]}
            initial={{
              y: -34,
              opacity: 0,
              scale: 0.92,
              filter: "blur(12px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              y: 28,
              opacity: 0,
              scale: 0.96,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="col-start-1 row-start-1 inline-block origin-center bg-gradient-to-r from-[var(--color-accent)] via-cyan-200 to-white bg-clip-text text-2xl font-semibold leading-tight tracking-tight text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,.18)] sm:text-3xl lg:text-4xl"
          >
            {TAGLINES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
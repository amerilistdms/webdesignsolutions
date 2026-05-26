"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, ease },
  },
};

export const revealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -12% 0px",
} as const;

type RevealUpProps = {
  children: ReactNode;
  className?: string;
};

/** Un solo bloque con fade-in hacia arriba (tarjetas absolutas, teléfono, etc.). */
export function RevealUp({ children, className }: RevealUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 1.15, ease }}
    >
      {children}
    </motion.div>
  );
}

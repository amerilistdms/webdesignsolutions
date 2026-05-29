"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Slow ease-in-out — entrada y salida del hover */
const PROCESS_STEP_HOVER_TRANSITION = {
  type: "tween" as const,
  duration: 1.55,
  ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
};

type ProcessStepHoverProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "right";
};

export function ProcessStepHover({
  children,
  className = "",
  align = "left",
}: ProcessStepHoverProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.012,
              y: -3,
            }
      }
      transition={PROCESS_STEP_HOVER_TRANSITION}
      style={{
        transformOrigin: align === "right" ? "right center" : "left center",
      }}
    >
      {children}
    </motion.div>
  );
}

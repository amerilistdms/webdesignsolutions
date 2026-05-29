"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";
import "./about-inline-cta.css";

export function AboutInlineCta() {
  return (
    <section className="about-inline-cta" aria-labelledby="about-inline-cta-title">
      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        className="about-inline-cta__inner"
      >
        <motion.h2
          id="about-inline-cta-title"
          variants={revealItem}
          className="about-inline-cta__title"
        >
          Ready to get started?
        </motion.h2>
        <motion.p variants={revealItem} className="about-inline-cta__lead">
          Speak with one of our web experts and see how data-driven design can move
          your brand forward.
        </motion.p>
        <motion.div variants={revealItem} className="about-inline-cta__action">
          <Link href="/get-started" className="about-inline-cta__btn">
            Get started
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

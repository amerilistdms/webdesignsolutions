"use client";

import { BarChart3, Palette } from "lucide-react";
import { motion } from "framer-motion";
import {
  revealContainer,
  revealItem,
  revealViewport,
} from "../home/reveal-up";
import { SectionGlows } from "../shared/section-glows";
import "./about-capture-section.css";

const pillars = [
  {
    icon: Palette,
    title: "Design chops",
    body: "We’re not new to the digital rodeo. We’ve been crafting and pioneering successful web solutions for over 15 years. Our designers and developers know what works—and they research what works for your customers.",
  },
  {
    icon: BarChart3,
    title: "Data savvy",
    body: "We don’t believe in smoke and mirrors. We take the time to know your business, build custom data for your needs, and apply it to digital creations that engineer marketing solutions and stand-out web design.",
  },
] as const;

export function AboutCaptureSection() {
  return (
    <section className="about-capture" aria-labelledby="about-capture-heading">
      <SectionGlows density="rich" />
      <div className="about-capture__inner">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.h2
            id="about-capture-heading"
            variants={revealItem}
            className="about-capture__title"
          >
            How we capture <span>attention</span>
          </motion.h2>
          <motion.p variants={revealItem} className="about-capture__lead">
            Our web design triggers response in two ways
          </motion.p>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          className="about-capture__grid"
        >
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.article
              key={title}
              variants={revealItem}
              className="about-capture__card"
            >
              <div className="about-capture__card-body">
                <div className="about-capture__icon" aria-hidden>
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="about-capture__card-title">{title}</h3>
                <p className="about-capture__card-text">{body}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home-faq-section.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "How long does a website project typically take?",
    a: "Most websites take 4–8 weeks from kickoff to launch. E-commerce and complex platforms can take 8–16 weeks. We'll give you a precise timeline during discovery based on your specific scope.",
  },
  {
    q: "What does a website project cost?",
    a: "Projects range from $3,000 for a focused landing page to $50,000+ for enterprise e-commerce platforms. We work across all budgets and always align scope to what will actually move the needle for your business.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — all clients get a 30-day post-launch support window included. After that, we offer monthly retainer plans covering updates, monitoring, performance optimization, and priority support.",
  },
  {
    q: "Will my website rank on Google?",
    a: "We build every site with technical SEO as a foundation — clean code, fast load times, proper structure. For aggressive ranking, our dedicated SEO plans add on-page optimization, content strategy, and link building.",
  },
  {
    q: "Can you work with our existing branding?",
    a: "Absolutely. We can extend your existing brand into a web experience, or if your brand needs a refresh, our designers can evolve it while respecting your existing equity.",
  },
  {
    q: "Who owns the website and code after launch?",
    a: "You do. 100%. We hand over all source code, assets, and credentials at launch. No lock-in, no hostage code, no proprietary systems you can't escape.",
  },
] as const;

export function HomeFaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const prev = open;

    if (prev !== null && prev !== i && bodyRefs.current[prev]) {
      gsap.to(bodyRefs.current[prev], {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }

    const el = bodyRefs.current[i];
    if (!el) return;

    if (open === i) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
      setOpen(null);
      return;
    }

    gsap.set(el, { height: "auto", opacity: 1 });
    gsap.from(el, { height: 0, opacity: 0, duration: 0.4, ease: "power3.out" });
    setOpen(i);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll(".home-faq__reveal"), {
          y: "105%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 78%" },
        });
      }

      bodyRefs.current.forEach((el) => {
        if (el) gsap.set(el, { height: 0, opacity: 0 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-faq" aria-labelledby="home-faq-title">
      <div className="home-faq__inner">
        <div className="home-faq__header" ref={titleRef}>
          <p className="home-faq__label">FAQ</p>
          <h2 id="home-faq-title" className="home-faq__title">
            <span className="home-faq__line-wrap">
              <span className="home-faq__reveal">Common</span>
            </span>
            <span className="home-faq__line-wrap">
              <span className="home-faq__reveal home-faq__title-accent">Questions.</span>
            </span>
          </h2>
          <p className="home-faq__note">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="home-faq__email-link">
              Email us your question →
            </Link>
          </p>
        </div>

        <div className="home-faq__list">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`home-faq__item ${open === i ? "home-faq__item--open" : ""}`}
            >
              <button
                type="button"
                className="home-faq__btn"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span className="home-faq__q">{faq.q}</span>
                <span className="home-faq__icon" aria-hidden>
                  +
                </span>
              </button>
              <div
                className="home-faq__body"
                ref={(el) => {
                  bodyRefs.current[i] = el;
                }}
              >
                <p className="home-faq__a">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

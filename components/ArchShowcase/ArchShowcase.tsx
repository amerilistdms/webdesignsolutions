"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  getSectionBgColors,
  getServiceImage,
  SERVICE_PRODUCTS,
} from "@/components/services/services-products-data";
import "lenis/dist/lenis.css";
import "./ArchShowcase.css";

gsap.registerPlugin(ScrollTrigger);

function handleMobileLayout(root: HTMLElement) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const leftItems = gsap.utils.toArray<HTMLElement>(
    ".arch__left .arch__info",
    root,
  );
  const rightItems = gsap.utils.toArray<HTMLElement>(
    ".arch__right .img-wrapper",
    root,
  );

  if (isMobile) {
    leftItems.forEach((item, i) => {
      item.style.order = String(i * 2);
    });
    rightItems.forEach((item, i) => {
      item.style.order = String(i * 2 + 1);
    });
    return;
  }

  leftItems.forEach((item) => {
    item.style.order = "";
  });
  rightItems.forEach((item) => {
    item.style.order = "";
  });
}

type ArchShowcaseProps = {
  footer?: ReactNode;
};

export default function ArchShowcase({ footer }: ArchShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const serviceCount = SERVICE_PRODUCTS.length;

  useEffect(() => {
    const root = rootRef.current;
    const arch = archRef.current;
    const archRight = archRightRef.current;
    if (!root || !arch || !archRight) return;

    const bgColors = getSectionBgColors(serviceCount);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
      syncTouch: true,
      touchMultiplier: 2,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    gsap.utils.toArray<HTMLElement>(".arch__right .img-wrapper", root).forEach(
      (element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) {
          element.style.zIndex = order;
        }
      },
    );

    handleMobileLayout(root);

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleMobileLayout(root);
        ScrollTrigger.refresh();
      }, 100);
    };
    window.addEventListener("resize", onResize);

    const imgs = gsap.utils.toArray<HTMLImageElement>(".img-wrapper img", root);

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: arch,
              start: "top top",
              end: "bottom bottom",
              pin: archRight,
              scrub: true,
              pinReparent: false,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(imgs, {
            clipPath: "inset(0)",
            objectPosition: "0px 60%",
          });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ?? null;

            const sectionTimeline = gsap.timeline();

            if (nextImage) {
              sectionTimeline
                .to(
                  root,
                  {
                    backgroundColor: bgColors[index],
                    duration: 1.5,
                    ease: "power2.inOut",
                  },
                  0,
                )
                .to(
                  currentImage,
                  {
                    clipPath: "inset(0px 0px 100%)",
                    objectPosition: "0px 60%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0,
                )
                .to(
                  nextImage,
                  {
                    objectPosition: "0px 40%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0,
                );
            }

            mainTimeline.add(sectionTimeline);
          });
        },

        "(max-width: 768px)": function () {
          const mbTimeline = gsap.timeline();

          gsap.set(imgs, {
            clipPath: "none",
            objectPosition: "0px 60%",
          });

          imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: image,
                start: "top-=70% top+=50%",
                end: "bottom+=200% bottom",
                scrub: true,
              },
            });

            innerTimeline
              .to(image, {
                objectPosition: "0px 40%",
                duration: 5,
                ease: "none",
              })
              .to(root, {
                backgroundColor: bgColors[index] ?? "#0f1b33",
                duration: 1.5,
                ease: "power2.inOut",
              });

            mbTimeline.add(innerTimeline);
          });
        },
      });

      ScrollTrigger.refresh();
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", refresh, { once: true });
      }
    });

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      ScrollTrigger.getAll()
        .filter((trigger) => root.contains(trigger.trigger as Node))
        .forEach((trigger) => trigger.kill(true));
    };
  }, [serviceCount]);

  return (
    <section ref={rootRef} className="arch-section">
      <div className="container">
        <div className="spacer" />

        <div ref={archRef} className="arch">
          <div className="arch__left">
            {SERVICE_PRODUCTS.map((service) => (
              <div className="arch__info" id={service.id} key={service.id}>
                <div className="content">
                  <h2 className="header">{service.title}</h2>
                  <p className="desc">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div ref={archRightRef} className="arch__right">
            {SERVICE_PRODUCTS.map((service, index) => {
              const image = getServiceImage(index);

              return (
                <div
                  key={service.id}
                  className="img-wrapper"
                  data-index={String(serviceCount - index)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {footer ? (
          <div className="arch-section__footer">{footer}</div>
        ) : (
          <div className="spacer" />
        )}
      </div>
    </section>
  );
}

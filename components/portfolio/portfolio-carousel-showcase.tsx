"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  getPortfolioCategoryLabel,
  type PortfolioCategory,
  type PortfolioItem,
} from "./portfolio-data";
import { ShowcaseWatermarkTitle } from "../shared/showcase-watermark-title";
import { PortfolioCarouselFilters } from "./portfolio-carousel-filters";
import {
  buildCarouselSlides,
  getCarouselItemsKey,
  resolveTextureUrl,
  type CarouselSlide,
} from "./portfolio-carousel-images";
import "./portfolio-carousel-showcase.css";

gsap.registerPlugin(ScrollTrigger);

function debounce<T extends (...args: never[]) => void>(
  func: T,
  timeout = 300,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}

function loadTexture(
  loader: InstanceType<
    Awaited<typeof import("three")>["TextureLoader"]
  >,
  url: string,
  THREE: typeof import("three"),
): Promise<InstanceType<typeof THREE.Texture>> {
  return new Promise((resolve, reject) => {
    loader.load(
      resolveTextureUrl(url),
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      reject,
    );
  });
}

type PortfolioCarouselShowcaseProps = {
  items: PortfolioItem[];
  watermarkLabel: string;
  filter: PortfolioCategory;
  onFilterChange: (category: PortfolioCategory) => void;
};

export function PortfolioCarouselShowcase({
  items,
  watermarkLabel,
  filter,
  onFilterChange,
}: PortfolioCarouselShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const watermarkWrapRef = useRef<HTMLDivElement>(null);
  const watermarkTextRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLParagraphElement>(null);
  const itemsKey = getCarouselItemsKey(items);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const isLoading = loadedKey !== itemsKey;

  useEffect(() => {
    const root = rootRef.current;
    const watermarkWrap = watermarkWrapRef.current;
    const watermarkText = watermarkTextRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const titleEl = titleRef.current;
    const categoryEl = categoryRef.current;

    if (!root || !watermarkWrap || !watermarkText || !wrap || !canvas) {
      return;
    }

    let disposed = false;
    let lenisRafId = 0;
    let renderRafId = 0;
    let gsapCtx: gsap.Context | null = null;
    let lenis: Lenis | null = null;
    let disposeThree: (() => void) | null = null;
    let onResize: (() => void) | null = null;

    watermarkText.textContent = watermarkLabel;

    const setup = async () => {
      const THREE = await import("three");

      if (disposed) return;

      const slides = buildCarouselSlides(items);
      const firstSlide = slides[0];

      if (titleEl && firstSlide) {
        titleEl.textContent = firstSlide.title;
      }
      if (categoryEl && firstSlide) {
        categoryEl.textContent = firstSlide.categoryLabel;
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        gestureOrientation: "vertical",
        touchMultiplier: 2,
      });

      const lenisRaf = (time: number) => {
        lenis?.raf(time);
        ScrollTrigger.update();
        lenisRafId = requestAnimationFrame(lenisRaf);
      };

      lenisRafId = requestAnimationFrame(lenisRaf);

      const textureLoader = new THREE.TextureLoader();

      let textures: InstanceType<typeof THREE.Texture>[] = [];

      try {
        textures = await Promise.all(
          slides.map((slide) => loadTexture(textureLoader, slide.textureUrl, THREE)),
        );
      } catch (error) {
        console.error("Portfolio carousel texture load failed:", error);
        setLoadedKey(itemsKey);
        return;
      }

      if (disposed) {
        textures.forEach((texture) => texture.dispose());
        return;
      }

      setLoadedKey(itemsKey);

      gsapCtx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: watermarkWrap,
            start: "top top",
            end: "+=600%",
            scrub: true,
            pin: true,
            pinReparent: false,
            pinSpacing: false,
          },
          defaults: { ease: "none" },
        }).fromTo(watermarkText, { x: "20%" }, { x: "-60%" });

        const carouselPin = ScrollTrigger.create({
          trigger: wrap,
          start: "top top",
          end: "+=500%",
          pin: true,
          pinReparent: false,
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          100,
        );
        camera.position.z = 1.75;
        camera.position.y = 0;
        camera.rotation.z = 0;

        type MeshEntry = {
          mesh: InstanceType<typeof THREE.Mesh>;
          index: number;
          slide: CarouselSlide;
        };

        const meshItems: MeshEntry[] = [];

        textures.forEach((texture, i) => {
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 0.75),
            new THREE.MeshBasicMaterial({
              map: texture,
              toneMapped: false,
              transparent: false,
            }),
          );

          meshItems.push({ mesh, index: i, slide: slides[i] });
          scene.add(mesh);
        });

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });

        const resizeCanvas = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        resizeCanvas();

        const updateMeshes = () => {
          const width = 1.1;
          const wholeWidth = meshItems.length * width;
          const progress = carouselPin.progress;
          let activeSlide = slides[0];
          let closestDistance = Infinity;

          meshItems.forEach((item) => {
            item.mesh.position.x =
              (width * item.index - progress * 10 + 42069 * wholeWidth) %
                wholeWidth -
              2 * width;
            item.mesh.rotation.y = 0;

            const distance = Math.abs(item.mesh.position.x);
            if (distance < closestDistance) {
              closestDistance = distance;
              activeSlide = item.slide;
            }
          });

          if (titleEl && activeSlide) {
            titleEl.textContent = activeSlide.title;
          }
          if (categoryEl && activeSlide) {
            categoryEl.textContent = activeSlide.categoryLabel;
          }
        };

        const render = () => {
          if (disposed) return;

          updateMeshes();
          renderer.render(scene, camera);
          renderRafId = requestAnimationFrame(render);
        };

        renderRafId = requestAnimationFrame(render);

        onResize = debounce(resizeCanvas);
        window.addEventListener("resize", onResize);

        disposeThree = () => {
          window.removeEventListener("resize", onResize!);
          cancelAnimationFrame(renderRafId);
          carouselPin.kill(true);
          meshItems.forEach(({ mesh }) => {
            mesh.geometry.dispose();
            const material = mesh.material;
            if (material instanceof THREE.MeshBasicMaterial) {
              material.dispose();
            }
            mesh.removeFromParent();
          });
          textures.forEach((texture) => texture.dispose());
          renderer.dispose();
        };
      }, root);

      window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    void setup();

    return () => {
      disposed = true;
      cancelAnimationFrame(lenisRafId);
      cancelAnimationFrame(renderRafId);
      disposeThree?.();
      gsapCtx?.revert();
      lenis?.destroy();
      ScrollTrigger.refresh();
    };
  }, [items, itemsKey, watermarkLabel, filter]);

  return (
    <div ref={rootRef} className="portfolio-carousel">
      <div className="portfolio-carousel__header">
        <div ref={watermarkWrapRef}>
          <ShowcaseWatermarkTitle
            label={watermarkLabel}
            watermarkRef={watermarkTextRef}
            scrollVariant
          />
        </div>
        <div className="portfolio-carousel__filters-bar">
          <PortfolioCarouselFilters
            filter={filter}
            onFilterChange={onFilterChange}
            resultCount={items.length}
          />
        </div>
      </div>

      <div ref={wrapRef} className="portfolio-carousel__wrap">
        <canvas ref={canvasRef} className="portfolio-carousel__canvas" />
        <div
          className={`portfolio-carousel__loading${isLoading ? "" : " portfolio-carousel__loading--hidden"}`}
          aria-hidden={!isLoading}
        >
          Loading projects…
        </div>
        <div className="portfolio-carousel__meta">
          <p ref={titleRef} className="portfolio-carousel__active-title">
            {items[0]?.title ?? "Portfolio"}
          </p>
          <p ref={categoryRef} className="portfolio-carousel__active-category">
            {items[0] ? getPortfolioCategoryLabel(items[0].category) : ""}
          </p>
        </div>
        <p className="portfolio-carousel__hint">Scroll to explore</p>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */

const MARQUEE_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
] as const;

const LOGO_ALTS = [
  "Sony",
  "Spotify",
  "BMW",
  "Google",
  "Amazon",
  "Airbnb",
] as const;

const CYCLES_PER_HALF = 6;

function LogoRow({ duplicate }: { duplicate?: boolean }) {
  const slots = CYCLES_PER_HALF * MARQUEE_LOGOS.length;

  return (
    <div
      className="logo-track-group flex shrink-0 flex-row items-center gap-[38px] sm:gap-[54px]"
      aria-hidden={duplicate ? true : undefined}
    >
      {Array.from({ length: slots }, (_, idx) => {
        const i = idx % MARQUEE_LOGOS.length;
        const src = MARQUEE_LOGOS[i];
        const cycle = Math.floor(idx / MARQUEE_LOGOS.length);
        const showAlt = !duplicate && cycle === 0;

        return (
          <div
            key={`${duplicate ? "d" : "s"}-${cycle}-${i}`}
            className="logo-pill flex h-[60px] w-[140px] shrink-0 items-center justify-center sm:h-[70px] sm:w-[180px]"
          >
            <img
              src={src}
              alt={showAlt ? LOGO_ALTS[i] : ""}
              className="max-h-[42px] max-w-[120px] object-contain opacity-90 transition-[opacity,transform] duration-200 ease-out hover:scale-105 hover:opacity-100"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

type TrustMarqueeLogosProps = {
  className?: string;
};

export function TrustMarqueeLogos({ className = "" }: TrustMarqueeLogosProps) {
  return (
    <div
      className={`trust-marquee-logos logo-marquee relative w-full overflow-hidden ${className}`.trim()}
      role="region"
      aria-label="Partner logos"
    >
      <div className="trust-marquee-track">
        <LogoRow />
        <LogoRow duplicate />
      </div>
    </div>
  );
}

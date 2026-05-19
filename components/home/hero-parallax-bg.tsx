"use client";

type HeroParallaxBgProps = {
  /** Pixels — small coefficient already applied in hook; backdrop moves ~4× less than foreground. */
  bgLift: number;
};

export function HeroParallaxBg({ bgLift }: HeroParallaxBgProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgLift}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(56,189,248,0.28),transparent_34%),radial-gradient(circle_at_70%_58%,rgba(59,130,246,0.2),transparent_42%),linear-gradient(118deg,#040c1c_0%,#0a1730_45%,#0f1b33_100%)]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:64px_64px] will-change-transform"
        style={{
          transform: `translate3d(0, ${bgLift * 1.04}px, 0)`,
        }}
      />
      <div
        className="absolute -right-28 top-1/4 h-[24rem] w-[24rem] rounded-full bg-cyan-400/18 blur-3xl will-change-transform"
        style={{
          transform: `translate3d(0, ${bgLift * 1.08}px, 0)`,
        }}
      />
      <div
        className="absolute -left-20 bottom-[-6rem] h-[20rem] w-[20rem] rounded-full bg-blue-500/18 blur-3xl will-change-transform"
        style={{
          transform: `translate3d(0, ${bgLift * 1.02}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.24)_0%,rgba(2,6,23,0.72)_100%)] will-change-transform"
        style={{
          transform: `translate3d(0, ${bgLift * 0.98}px, 0)`,
        }}
      />
    </div>
  );
}

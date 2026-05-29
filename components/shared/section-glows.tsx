import "./section-glows.css";

type SectionGlowsProps = {
  density?: "default" | "rich";
  className?: string;
};

export function SectionGlows({
  density = "default",
  className = "",
}: SectionGlowsProps) {
  const rich = density === "rich";

  return (
    <div
      className={`section-glows${rich ? " section-glows--rich" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden
    >
      <div className="section-glows__orb section-glows__orb--1" />
      <div className="section-glows__orb section-glows__orb--2" />
      <div className="section-glows__orb section-glows__orb--3" />
      {rich ? (
        <>
          <div className="section-glows__orb section-glows__orb--4" />
          <div className="section-glows__orb section-glows__orb--5" />
        </>
      ) : null}
    </div>
  );
}

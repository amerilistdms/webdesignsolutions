import type { ReactNode, Ref } from "react";
import "./showcase-watermark-title.css";

type ShowcaseWatermarkTitleProps = {
  label: string;
  className?: string;
  /** Use on portfolio carousel where GSAP pans the label horizontally */
  scrollVariant?: boolean;
  watermarkRef?: Ref<HTMLSpanElement>;
  actions?: ReactNode;
};

export function ShowcaseWatermarkTitle({
  label,
  className = "",
  scrollVariant = false,
  watermarkRef,
  actions,
}: ShowcaseWatermarkTitleProps) {
  const wrapClass = [
    "showcase-watermark-wrap",
    scrollVariant ? "showcase-watermark-wrap--scroll" : "",
    actions ? "showcase-watermark-wrap--with-actions" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${wrapClass} ${className}`.trim()}>
      <span ref={watermarkRef} className="showcase-watermark">
        {label}
      </span>
      {actions ? <div className="showcase-watermark-actions">{actions}</div> : null}
    </div>
  );
}

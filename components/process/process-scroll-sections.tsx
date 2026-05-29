"use client";

import dynamic from "next/dynamic";

const ProcessHorizontalScroll = dynamic(
  () =>
    import("./process-horizontal-scroll").then((mod) => mod.ProcessHorizontalScroll),
  { ssr: false },
);

const ProcessTimeline = dynamic(
  () => import("./process-timeline").then((mod) => mod.ProcessTimeline),
  { ssr: false },
);

export function ProcessScrollSections() {
  return (
    <>
      <ProcessHorizontalScroll />
      <ProcessTimeline />
    </>
  );
}

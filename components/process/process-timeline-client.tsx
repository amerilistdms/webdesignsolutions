"use client";

import dynamic from "next/dynamic";

export const ProcessTimelineClient = dynamic(
  () => import("./process-timeline").then((mod) => mod.ProcessTimeline),
  { ssr: false },
);

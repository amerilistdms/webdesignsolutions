import { processSteps } from "./process-data";

export type ProcessTimelineStep = {
  num: string;
  title: string;
  desc: string;
  details: string[];
};

const fallbackDetails: Record<number, string[]> = {
  1: ["Client interview", "Development agreement", "NDA"],
  3: ["Interactive prototype", "Scope refinement", "Client feedback"],
};

export const processTimelineSteps: ProcessTimelineStep[] = processSteps.map(
  (step) => ({
    num: String(step.number).padStart(2, "0"),
    title: step.title,
    desc: step.paragraphs[0] ?? "",
    details:
      step.team ??
      step.subsections?.map((section) => section.title) ??
      fallbackDetails[step.number] ??
      [],
  }),
);

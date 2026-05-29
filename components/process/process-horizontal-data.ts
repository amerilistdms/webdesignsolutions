import { processTimelineSteps } from "./process-timeline-data";

export type ProcessHorizontalStep = {
  num: string;
  title: string;
  desc: string;
  icon: string;
};

const PROCESS_ICONS = ["◈", "◉", "◎", "◫", "◬", "◭", "◮", "◲"] as const;

function formatCardTitle(title: string): string {
  if (title.includes(" and ")) {
    const index = title.indexOf(" and ");
    return `${title.slice(0, index)}\n& ${title.slice(index + 5)}`;
  }

  const words = title.split(" ");
  if (words.length === 2) {
    return words.join("\n");
  }

  return title;
}

function shortenText(text: string, max = 200): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max).trimEnd();
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export const processHorizontalSteps: ProcessHorizontalStep[] =
  processTimelineSteps.map((step, index) => ({
    num: step.num,
    title: formatCardTitle(step.title),
    desc: shortenText(step.desc),
    icon: PROCESS_ICONS[index] ?? PROCESS_ICONS[0],
  }));

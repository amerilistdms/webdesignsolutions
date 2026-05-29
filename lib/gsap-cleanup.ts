import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Tear down ScrollTrigger pins/reparents before React unmounts routed pages.
 * Always call with reset=true so pinned nodes return to their original parents.
 */
export function killGsapDomEffects() {
  const triggers = ScrollTrigger.getAll();
  for (let i = triggers.length - 1; i >= 0; i -= 1) {
    triggers[i].kill(true);
  }

  if (typeof ScrollTrigger.clearScrollMemory === "function") {
    ScrollTrigger.clearScrollMemory();
  }

  ScrollTrigger.refresh();
}

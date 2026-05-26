import type { LucideIcon } from "lucide-react";
import {
  Code2,
  FileCode,
  Layout,
  Mail,
  MousePointerClick,
  PenTool,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

export const getStartedBanner =
  "https://amerilistwebdesign.com/images/get-started-banner.jpg";

export type ServiceOption = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const serviceOptions: ServiceOption[] = [
  { id: "web-design", label: "Web Design", icon: Layout },
  { id: "web-development", label: "Web Development", icon: Code2 },
  { id: "graphic-design", label: "Graphic Design", icon: PenTool },
  { id: "e-commerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "logo-design", label: "Logo Design", icon: Sparkles },
  { id: "seo", label: "SEO", icon: Search },
  { id: "email-marketing", label: "Email Marketing", icon: Mail },
  { id: "html-design", label: "HTML Design", icon: FileCode },
  { id: "landing-pages", label: "Landing Pages", icon: MousePointerClick },
  { id: "social-media", label: "Social Media", icon: Share2 },
];

export const timelineOptions = [
  { id: "15-days", label: "15 days", short: "Rush" },
  { id: "1-month", label: "1 Month", short: "Fast track" },
  { id: "1-3-months", label: "1–3 Months", short: "Standard" },
  { id: "3-6-months", label: "3–6 Months", short: "Extended" },
  { id: "6-12-months", label: "6–12 Months", short: "Long-term" },
] as const;

export const budgetOptions = [
  { id: "under-1k", label: "Less than $1k" },
  { id: "1k-5k", label: "$1k–$5k" },
  { id: "5k-10k", label: "$5k–$10k" },
  { id: "over-10k", label: "More than $10k" },
  { id: "not-sure", label: "Not sure" },
] as const;

export const wizardSteps = [
  {
    number: 1,
    title: "Let us roll up our sleeves and get started?",
    subtitle: "Tell us which digital media services you need our help with.",
  },
  {
    number: 2,
    title: "What should be the timeline for the project?",
    subtitle: "Choose the timeframe that best matches your goals.",
  },
  {
    number: 3,
    title: "Do you have a budget in mind?",
    subtitle: "No wrong answers—we'll shape a plan that fits.",
  },
  {
    number: 4,
    title: "Your contact details",
    subtitle: "We'll reach out within one business day.",
  },
] as const;

import type { Metadata } from "next";
import { GetStartedWizard } from "../../components/get-started/get-started-wizard";
import "./get-started-page.css";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start a creative revolution with Amerilist Web Design—tell us about your project, timeline, and budget. We respond within one business day.",
};

export default function GetStartedPage() {
  return <GetStartedWizard />;
}

import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  Code2,
  Layers,
  PenTool,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export type ProcessSubsection = {
  title: string;
  paragraphs: string[];
};

export type ProcessStep = {
  number: number;
  title: string;
  icon: LucideIcon;
  paragraphs: string[];
  subsections?: ProcessSubsection[];
  team?: string[];
  accent: string;
};

export const processIntro = {
  headline: "Our 8-Step Approach to Web Design & Development",
  body: "Creating a fully functional website is an involved process. We work with you every step of the way to ensure that you get the site you need for your business. AmeriList takes an eight-step approach to Web Design & Development. This process ensures that all of your needs and expectations are met, from the initial paperwork all the way down to the ongoing support. AmeriList is committed to providing high-quality, engaging websites that stand the test of time and operate with peak performance.",
};

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Initial Evaluation and Paperwork",
    icon: ClipboardCheck,
    accent: "from-cyan-400/30 to-sky-600/10",
    paragraphs: [
      "We don't take projects on before conducting an initial evaluation. This allows us to determine whether we are a good fit for the prospective client. Our evaluation includes an interview where we go over the customer's needs and expectations to ensure we provide top-of-the-line services to each client we serve.",
      "AmeriList is committed to providing the highest level of customer service combined with expert level design and development. This evaluation ensures the client's needs and expectations align with our services and core values for the best results.",
    ],
    subsections: [
      {
        title: "Additional Paperwork",
        paragraphs: [
          "After going over the paperwork, we will ask you to sign a web development agreement. In some cases, you will also need to sign a non-disclosure agreement.",
          "After all of the paperwork is in order, we will be ready to move on to the next step.",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Technical Analysis",
    icon: ScanSearch,
    accent: "from-blue-400/25 to-indigo-600/10",
    paragraphs: [
      "During this phase, we compile all of the necessary research and make sure the project aligns with the business requirements set forth. While some companies only use a single department to perform a technical analysis, we involve both system and business analysts. This allows us to conduct a comprehensive analysis.",
      "Additionally, the project is passed over to a user experience analyst. He is tasked with preparing use cases. These cases ensure that all goals are reached in the most efficient way possible.",
      "Lastly, we introduce the project manager that strategically prepares a scope and timeline for your project. The assigned project manager will assist with communicating the needs of the client to our development team and vice versa to ensure all deadlines and expectations are met.",
    ],
    team: ["System analyst", "Business analyst", "UX analyst", "Project manager"],
  },
  {
    number: 3,
    title: "Simulation",
    icon: Layers,
    accent: "from-violet-400/25 to-purple-600/10",
    paragraphs: [
      "Simulation is an important part of the web development process. We take all of the information at our disposal and simulate the project in order to create a prototype that looks and acts like the final deliverable. You can navigate the web-based prototype just as you would the finished product.",
      "This allows us to work directly with you and make changes based on your wishes and needs. By doing this, we are able to solve problems and change the scope of the project before we move forward with the final design.",
    ],
  },
  {
    number: 4,
    title: "Design",
    icon: PenTool,
    accent: "from-[var(--color-accent)]/35 to-cyan-600/10",
    paragraphs: [
      "This is the stage most people think about in regard to web development, but it is just one step in the process. During this step, we create a mockup based on the site simulation we made. Just like in the simulation stage, we will go over the design with you to make sure you are completely satisfied. We will make any necessary changes and then code the design.",
      "This is a very involved step and includes the project manager, design and UI lead, graphic designer, web designer, and front-end developer.",
    ],
    team: [
      "Project manager",
      "Design & UI lead",
      "Graphic designer",
      "Web designer",
      "Front-end developer",
    ],
  },
  {
    number: 5,
    title: "Pre Implementation",
    icon: Workflow,
    accent: "from-teal-400/25 to-emerald-600/10",
    paragraphs: [
      "During this step of the process, our project manager, database architect, and lead back-end developer plan for the implementation phase. This involves several steps, including identifying the site's structural elements, creating a system decomposition analysis, and building a class diagram. All of the essential functional algorithms are also created during this step, and the development framework is selected.",
    ],
    team: ["Project manager", "Database architect", "Lead back-end developer"],
  },
  {
    number: 6,
    title: "Implementation",
    icon: Code2,
    accent: "from-sky-400/30 to-blue-700/10",
    paragraphs: [
      "Now it is time to do our programming work and load the site's content. With our project manager, lead back-end developer, and back-end developer on hand, we go through a complicated process, beginning with preparing the development framework. Then we code each template, perform our front-end integration tasks, and handle the programming duties.",
      "In addition, we develop all of the site's special features during this phase. We also test them to ensure they operate as intended.",
    ],
    team: ["Project manager", "Lead back-end developer", "Back-end developer"],
  },
  {
    number: 7,
    title: "Site Testing",
    icon: ShieldCheck,
    accent: "from-amber-400/20 to-orange-600/10",
    paragraphs: [
      "Before a website goes live, it needs to be properly tested to ensure that it does not contain any errors or bugs. Our project manager, quality assurance lead, and quality assurance analyst run a series of tests, ranging from testing for bugs to looking for compatibility issues. This stage is performed on a number of browsers and devices to further ensure there are no issues with functionality. Should any issues present itself, we fix any issues before moving on to the next and final step.",
    ],
    team: ["Project manager", "QA lead", "QA analyst"],
  },
  {
    number: 8,
    title: "Site Launch",
    icon: Rocket,
    accent: "from-[var(--color-accent)]/40 to-blue-500/15",
    paragraphs: [
      "While many people think we just launch a site, this is actually an involved process that includes our project manager, server administrator, and lead back-end developer. The three work together to determine the right hosting option. Then we move the site over to the server and make all necessary configurations so that the site runs at peak performance.",
      "When everything is ready, we publish the site. Immediately after, we watch the server logs to ensure that everything is running smoothly. We take all of the necessary actions to fix any problems before they become serious. Furthermore, we continue monitoring the logs for a week and then go over a post-launch review with all of our clients. This final review is designed to ensure exceptional satisfaction and includes vital information about the site's analytics and suggested marketing ideas.",
    ],
    team: ["Project manager", "Server administrator", "Lead back-end developer"],
  },
];

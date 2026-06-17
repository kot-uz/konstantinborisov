export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Tech Company",
    period: "2023 — Present",
    description:
      "Building and maintaining production React/Next.js applications.",
    highlights: [
      "Led migration of a legacy app to Next.js App Router, improving LCP by 40%.",
      "Implemented a shared component library with TypeScript and Storybook.",
      "Set up GitLab CI/CD pipelines with Docker for automated deployments.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Startup Studio",
    period: "2021 — 2023",
    description: "Delivered client web apps from design to deployment.",
    highlights: [
      "Built reusable UI with React, Redux Toolkit, and Material UI.",
      "Integrated REST APIs with RTK Query, reducing boilerplate significantly.",
    ],
  },
  {
    role: "Junior Frontend Developer",
    company: "Web Agency",
    period: "2020 — 2021",
    description:
      "Started career building responsive marketing sites and SPAs.",
    highlights: [
      "Developed pixel-perfect, accessible interfaces from Figma designs.",
      "Collaborated with backend team on Node.js/PostgreSQL features.",
    ],
  },
];

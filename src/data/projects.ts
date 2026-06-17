export type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    name: "TaskFlow — Project Management App",
    description:
      "A Kanban-style project management tool with drag-and-drop boards, real-time updates, and role-based access. Built with a focus on performance and clean state management.",
    tech: ["Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS"],
    github: "https://github.com/konstantinborisov/taskflow",
    demo: "https://taskflow.konstantinborisov.dev",
  },
  {
    name: "ShopWave — E-commerce Storefront",
    description:
      "A modern e-commerce frontend with product filtering, cart, checkout flow, and a NestJS + PostgreSQL backend. Fully responsive and SEO-optimized.",
    tech: ["React", "NestJS", "PostgreSQL", "Material UI", "Docker"],
    github: "https://github.com/konstantinborisov/shopwave",
    demo: "https://shopwave.konstantinborisov.dev",
  },
  {
    name: "DevBoard — Developer Dashboard",
    description:
      "A customizable analytics dashboard aggregating GitHub, CI/CD, and deployment metrics into a single view with charts and dark mode support.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GitLab CI/CD"],
    github: "https://github.com/konstantinborisov/devboard",
    demo: "https://devboard.konstantinborisov.dev",
  },
];

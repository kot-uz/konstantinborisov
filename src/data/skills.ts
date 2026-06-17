export type SkillGroup = { category: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "RTK Query",
      "Material UI",
    ],
  },
  {
    category: "Backend",
    skills: ["NestJS", "Node.js", "PostgreSQL"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "GitLab CI/CD", "Linux"],
  },
];

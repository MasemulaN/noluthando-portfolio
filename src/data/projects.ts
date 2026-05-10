// 📌 Edit this file to add, update, or remove projects.
// Each project will automatically appear on the Projects section.
//
// To add a new project:
//   1. Drop your image in `src/assets/` (e.g. my-project.jpg)
//   2. Import it at the top of this file
//   3. Add a new entry to the `projects` array below
//
// Leave `image`, `github`, or `demo` as undefined to hide that piece.

import projectPlaceholder from "@/assets/project-placeholder.jpg";

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "This very website — built with React, TanStack Start and Tailwind. A clean, minimalist showcase of my work.",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "https://github.com/",
    demo: "#",
    image: projectPlaceholder,
  },
  {
    title: "AI Prompt Playground",
    description:
      "An interactive sandbox for experimenting with prompt engineering techniques across different LLMs.",
    tech: ["React", "OpenAI API", "TypeScript"],
    github: "https://github.com/",
    image: projectPlaceholder,
  },
  {
    title: "Coming Soon",
    description:
      "A new project is in the works — check back soon to see what I'm building next.",
    tech: ["Stay tuned"],
    image: projectPlaceholder,
  },
];

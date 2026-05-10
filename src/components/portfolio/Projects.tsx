import { ArrowUpRight, Github, FolderGit2 } from "lucide-react";

const projects = [
  {
    title: "Project Coming Soon",
    description:
      "A placeholder for an upcoming DevOps project — automated CI/CD pipeline with GitHub Actions and Docker.",
    tags: ["Docker", "GitHub Actions", "CI/CD"],
    live: "#",
    repo: "#",
  },
  {
    title: "AI Prompt Playground",
    description:
      "An interactive playground for experimenting with prompt engineering techniques across different LLMs.",
    tags: ["React", "OpenAI", "TypeScript"],
    live: "#",
    repo: "#",
  },
  {
    title: "Cloud Deploy Dashboard",
    description:
      "A monitoring dashboard concept for visualizing cloud deployments, build status, and infrastructure health.",
    tags: ["React", "Tailwind", "AWS"],
    live: "#",
    repo: "#",
  },
  {
    title: "Future Project",
    description:
      "Reserved for the next exciting build — stay tuned as the portfolio grows.",
    tags: ["Coming Soon"],
    live: "#",
    repo: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-sm text-primary mb-2">03. Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Things I've been building
            </h2>
          </div>
          <div className="h-px flex-1 bg-border max-w-xs hidden md:block" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative p-7 rounded-2xl border border-border bg-card/60 backdrop-blur hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 card-glow"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <FolderGit2 size={22} />
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Repository"
                    className="hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Live"
                    className="hover:text-primary transition-colors"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border hover:border-primary hover:text-primary transition"
          >
            <Github size={16} />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

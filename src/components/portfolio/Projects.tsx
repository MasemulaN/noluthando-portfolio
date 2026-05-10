import { Github } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Things I've been building
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A small selection of projects. More on the way.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border hover:border-primary hover:text-primary transition text-sm"
          >
            <Github size={16} />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

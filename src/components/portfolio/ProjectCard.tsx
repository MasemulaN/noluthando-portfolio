import { ArrowUpRight, Github, Pencil, Trash2 } from "lucide-react";
import type { StoredProject } from "@/hooks/use-projects";

type Props = {
  project: StoredProject;
  onEdit?: (p: StoredProject) => void;
  onDelete?: (p: StoredProject) => void;
};

export function ProjectCard({ project, onEdit, onDelete }: Props) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:-translate-y-1 transition-all duration-300">
      {project.image && (
        <div className="aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(project)}
              aria-label="Edit project"
              className="p-1.5 rounded-md bg-background/90 backdrop-blur border border-border hover:text-primary"
            >
              <Pencil size={14} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(project)}
              aria-label="Delete project"
              className="p-1.5 rounded-md bg-background/90 backdrop-blur border border-border hover:text-destructive"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} repository`}
                className="p-1.5 hover:text-primary transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="p-1.5 hover:text-primary transition-colors"
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {project.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-mono"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

import { useState } from "react";
import { Plus } from "lucide-react";
import { useProjects, type StoredProject } from "@/hooks/use-projects";
import { ProjectCard } from "./ProjectCard";
import { EditProjectDialog } from "./EditProjectDialog";
import { Button } from "@/components/ui/button";

export function Projects() {
  const { projects, loading, remove } = useProjects();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<StoredProject | null>(null);

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (p: StoredProject) => {
    setEditing(p);
    setOpen(true);
  };

  const onDelete = (p: StoredProject) => {
    if (confirm(`Delete "${p.title}"?`)) remove(p.id);
  };

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Things I've been building
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Upload your own projects — add a title, description, tech stack, links, and a cover
            image. Saved permanently to your portfolio.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Button onClick={openAdd}>
              <Plus size={16} />
              Add project
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading projects…</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No projects yet.</p>
            <Button onClick={openAdd}>
              <Plus size={16} />
              Add your first project
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onEdit={openEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </div>

      <EditProjectDialog open={open} onOpenChange={setOpen} editing={editing} />
    </section>
  );
}

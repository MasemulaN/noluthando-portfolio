import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { projects as defaultProjects, type Project } from "@/data/projects";

export type StoredProject = Project & { id: string };

const STORAGE_KEY = "portfolio.projects.v1";

const withIds = (list: Project[]): StoredProject[] =>
  list.map((p, i) => ({ ...p, id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}` }));

const DEFAULTS: StoredProject[] = withIds(defaultProjects);

type Ctx = {
  projects: StoredProject[];
  add: (p: Omit<StoredProject, "id">) => void;
  update: (id: string, patch: Partial<StoredProject>) => void;
  remove: (id: string) => void;
  reset: () => void;
};

const ProjectsContext = createContext<Ctx | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<StoredProject[]>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProject[];
        if (Array.isArray(parsed)) setProjects(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: StoredProject[]) => {
    setProjects(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        add: (p) =>
          persist([
            { ...p, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
            ...projects,
          ]),
        update: (id, patch) =>
          persist(projects.map((p) => (p.id === id ? { ...p, ...patch } : p))),
        remove: (id) => persist(projects.filter((p) => p.id !== id)),
        reset: () => {
          persist(DEFAULTS);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            /* ignore */
          }
        },
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
}

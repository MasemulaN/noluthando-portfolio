import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type StoredProject = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  caseStudy?: string;
  caseStudyImages: string[];
};

type DbRow = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  image_url: string | null;
  case_study: string | null;
  case_study_images: string[] | null;
};

const fromRow = (r: DbRow): StoredProject => ({
  id: r.id,
  title: r.title,
  description: r.description,
  tech: r.tech ?? [],
  github: r.github ?? undefined,
  demo: r.demo ?? undefined,
  image: r.image_url ?? undefined,
  caseStudy: r.case_study ?? undefined,
  caseStudyImages: r.case_study_images ?? [],
});

type Ctx = {
  projects: StoredProject[];
  loading: boolean;
  add: (p: Omit<StoredProject, "id">) => Promise<void>;
  update: (id: string, patch: Partial<Omit<StoredProject, "id">>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const ProjectsContext = createContext<Ctx | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Could not load projects");
      setLoading(false);
      return;
    }
    setProjects((data as DbRow[]).map(fromRow));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add: Ctx["add"] = async (p) => {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: p.title,
        description: p.description,
        tech: p.tech,
        github: p.github ?? null,
        demo: p.demo ?? null,
        image_url: p.image ?? null,
        case_study: p.caseStudy ?? null,
      })
      .select()
      .single();
    if (error) {
      toast.error("Failed to add project");
      return;
    }
    setProjects((prev) => [fromRow(data as DbRow), ...prev]);
  };

  const update: Ctx["update"] = async (id, patch) => {
    const dbPatch: Partial<{
      title: string;
      description: string;
      tech: string[];
      github: string | null;
      demo: string | null;
      image_url: string | null;
      case_study: string | null;
    }> = {};
    if (patch.title !== undefined) dbPatch.title = patch.title;
    if (patch.description !== undefined) dbPatch.description = patch.description;
    if (patch.tech !== undefined) dbPatch.tech = patch.tech;
    if (patch.github !== undefined) dbPatch.github = patch.github ?? null;
    if (patch.demo !== undefined) dbPatch.demo = patch.demo ?? null;
    if (patch.image !== undefined) dbPatch.image_url = patch.image ?? null;
    if (patch.caseStudy !== undefined) dbPatch.case_study = patch.caseStudy ?? null;
    const { data, error } = await supabase
      .from("projects")
      .update(dbPatch)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      toast.error("Failed to update project");
      return;
    }
    setProjects((prev) => prev.map((p) => (p.id === id ? fromRow(data as DbRow) : p)));
  };

  const remove: Ctx["remove"] = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete project");
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectsContext.Provider value={{ projects, loading, add, update, remove, refresh }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
}

export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from("project-images")
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

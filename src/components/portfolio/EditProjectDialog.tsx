import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjects, uploadProjectImage, type StoredProject } from "@/hooks/use-projects";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: StoredProject | null;
};

const EMPTY = {
  title: "",
  description: "",
  techInput: "",
  github: "",
  demo: "",
  image: "" as string | undefined,
  caseStudy: "",
  caseStudyImages: [] as string[],
};

export function EditProjectDialog({ open, onOpenChange, editing }: Props) {
  const { add, update } = useProjects();
  const [draft, setDraft] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const csFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setDraft({
        title: editing.title,
        description: editing.description,
        techInput: editing.tech.join(", "),
        github: editing.github ?? "",
        demo: editing.demo ?? "",
        image: editing.image,
        caseStudy: editing.caseStudy ?? "",
        caseStudyImages: editing.caseStudyImages ?? [],
      });
    } else {
      setDraft(EMPTY);
    }
  }, [open, editing]);

  const onPhoto = async (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadProjectImage(file);
      setDraft((d) => ({ ...d, image: url }));
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onCaseStudyPhotos = async (files: File[]) => {
    const valid = files.filter((f) => {
      if (f.size > 3 * 1024 * 1024) {
        toast.error(`${f.name} is over 3MB`);
        return false;
      }
      return true;
    });
    if (valid.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(valid.map((f) => uploadProjectImage(f)));
      setDraft((d) => ({ ...d, caseStudyImages: [...d.caseStudyImages, ...urls] }));
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeCaseStudyImage = (url: string) =>
    setDraft((d) => ({ ...d, caseStudyImages: d.caseStudyImages.filter((u) => u !== url) }));

  const save = async () => {
    if (!draft.title.trim()) {
      toast.error("Title is required");
      return;
    }
    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      tech: draft.techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github: draft.github.trim() || undefined,
      demo: draft.demo.trim() || undefined,
      image: draft.image || undefined,
      caseStudy: draft.caseStudy.trim() || undefined,
      caseStudyImages: draft.caseStudyImages,
    };
    setSaving(true);
    try {
      if (editing) {
        await update(editing.id, payload);
        toast.success("Project updated");
      } else {
        await add(payload);
        toast.success("Project added");
      }
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit project" : "Add project"}</DialogTitle>
          <DialogDescription>
            Fill in your project details. Saved to this browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cover image</Label>
            <div className="flex items-center gap-4">
              {draft.image ? (
                <div className="relative">
                  <img
                    src={draft.image}
                    alt="Preview"
                    className="w-24 h-16 rounded-md object-cover border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, image: undefined }))}
                    className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-0.5"
                    aria-label="Remove image"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-16 rounded-md border border-dashed border-border bg-secondary/50" />
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPhoto(f);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={14} />
                {uploading ? "Uploading…" : "Upload"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-title">Title *</Label>
            <Input
              id="p-title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="My awesome project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-desc">Description</Label>
            <Textarea
              id="p-desc"
              rows={4}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="What it does and why it matters."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-tech">Tech stack</Label>
            <Input
              id="p-tech"
              value={draft.techInput}
              onChange={(e) => setDraft({ ...draft, techInput: e.target.value })}
              placeholder="React, TypeScript, Tailwind"
            />
            <p className="text-xs text-muted-foreground">Comma-separated.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-github">GitHub link</Label>
            <Input
              id="p-github"
              value={draft.github}
              onChange={(e) => setDraft({ ...draft, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-demo">Live demo link</Label>
            <Input
              id="p-demo"
              value={draft.demo}
              onChange={(e) => setDraft({ ...draft, demo: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="p-case-study">Case study</Label>
            <Textarea
              id="p-case-study"
              rows={6}
              value={draft.caseStudy}
              onChange={(e) => setDraft({ ...draft, caseStudy: e.target.value })}
              placeholder="Describe the problem, your approach, and the outcome..."
            />
            <p className="text-xs text-muted-foreground">Optional. Shown as a detailed project write-up.</p>
          </div>

          <div className="space-y-2">
            <Label>Case study images</Label>
            {draft.caseStudyImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {draft.caseStudyImages.map((url) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt="Case study"
                      className="w-full h-20 rounded-md object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeCaseStudyImage(url)}
                      className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-0.5"
                      aria-label="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              ref={csFileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (files.length) onCaseStudyPhotos(files);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => csFileRef.current?.click()}
              disabled={uploading}
            >
              <Upload size={14} />
              {uploading ? "Uploading…" : "Add images"}
            </Button>
            <p className="text-xs text-muted-foreground">Optional. Shown inside the case study.</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={save} disabled={saving || uploading}>
            {saving ? "Saving…" : editing ? "Save changes" : "Add project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

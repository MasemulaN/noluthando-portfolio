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
import { useProjects, type StoredProject } from "@/hooks/use-projects";
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
};

export function EditProjectDialog({ open, onOpenChange, editing }: Props) {
  const { add, update } = useProjects();
  const [draft, setDraft] = useState(EMPTY);
  const fileRef = useRef<HTMLInputElement>(null);

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
      });
    } else {
      setDraft(EMPTY);
    }
  }, [open, editing]);

  const onPhoto = (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const save = () => {
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
    };
    if (editing) {
      update(editing.id, payload);
      toast.success("Project updated");
    } else {
      add(payload);
      toast.success("Project added");
    }
    onOpenChange(false);
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
              >
                <Upload size={14} />
                Upload
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
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={save}>
            {editing ? "Save changes" : "Add project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

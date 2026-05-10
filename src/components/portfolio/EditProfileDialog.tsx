import { useEffect, useRef, useState } from "react";
import { Upload, RotateCcw } from "lucide-react";
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
import { useProfile, type ProfileData } from "@/hooks/use-profile";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditProfileDialog({ open, onOpenChange }: Props) {
  const { profile, update, reset } = useProfile();
  const [draft, setDraft] = useState<ProfileData>(profile);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);

  const onPhoto = (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, photo: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    update(draft);
    toast.success("Profile updated");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your photo, name, and bio. Changes are saved to this browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <img
              src={draft.photo}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border border-border"
            />
            <div className="flex flex-col gap-2">
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
                Upload photo
              </Button>
              <p className="text-xs text-muted-foreground">PNG or JPG, up to 3MB.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Hero tagline</Label>
            <Textarea
              id="tagline"
              rows={3}
              value={draft.tagline}
              onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">About / Bio</Label>
            <Textarea
              id="bio"
              rows={6}
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (confirm("Reset profile to defaults?")) {
                reset();
                onOpenChange(false);
              }
            }}
            className="mr-auto"
          >
            <RotateCcw size={14} />
            Reset
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={save}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

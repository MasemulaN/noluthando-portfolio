import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import defaultPhoto from "@/assets/profile.jpg";
import { toast } from "sonner";

export type ProfileData = {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo: string;
  githubUrl: string;
  linkedinUrl: string;
};

const DEFAULTS: ProfileData = {
  name: "Noluthando Masemula",
  title: "Software Developer · AI & Tech Enthusiast",
  tagline:
    "I design and build modern web applications with a focus on clean code, thoughtful UX, and emerging AI technologies.",
  bio: "I'm a software developer who enjoys turning ideas into clean, reliable products that people actually love using. My focus is modern web development with React, TypeScript and Node.js. I'm also deeply curious about AI and prompt engineering, and how they shape the next generation of software.",
  photo: defaultPhoto,
  githubUrl: "https://github.com/",
  linkedinUrl: "https://www.linkedin.com/",
};

type Row = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
};

const fromRow = (r: Row): ProfileData => ({
  name: r.name || DEFAULTS.name,
  title: r.title || DEFAULTS.title,
  tagline: r.tagline || DEFAULTS.tagline,
  bio: r.bio || DEFAULTS.bio,
  photo: r.photo_url || DEFAULTS.photo,
  githubUrl: r.github_url || DEFAULTS.githubUrl,
  linkedinUrl: r.linkedin_url || DEFAULTS.linkedinUrl,
});

type Ctx = {
  profile: ProfileData;
  loading: boolean;
  update: (patch: Partial<ProfileData>) => Promise<void>;
  reset: () => Promise<void>;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", "me")
        .maybeSingle();
      if (!error && data) setProfile(fromRow(data as Row));
      setLoading(false);
    })();
  }, []);

  const update: Ctx["update"] = async (patch) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    const { error } = await supabase
      .from("profile")
      .update({
        name: next.name,
        title: next.title,
        tagline: next.tagline,
        bio: next.bio,
        photo_url: next.photo,
        github_url: next.githubUrl,
        linkedin_url: next.linkedinUrl,
      })
      .eq("id", "me");
    if (error) toast.error("Failed to save profile");
  };

  const reset: Ctx["reset"] = async () => {
    await update(DEFAULTS);
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, update, reset }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

export async function uploadProfilePhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `profile/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from("project-images")
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

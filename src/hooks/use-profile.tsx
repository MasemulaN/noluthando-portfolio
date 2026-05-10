import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import defaultPhoto from "@/assets/profile.jpg";

export type ProfileData = {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo: string;
};

const DEFAULTS: ProfileData = {
  name: "Noluthando Masemula",
  title: "Software Developer · AI & Tech Enthusiast",
  tagline:
    "I design and build modern web applications with a focus on clean code, thoughtful UX, and emerging AI technologies.",
  bio: "I'm a software developer who enjoys turning ideas into clean, reliable products that people actually love using. My focus is modern web development with React, TypeScript and Node.js. I'm also deeply curious about AI and prompt engineering, and how they shape the next generation of software.",
  photo: defaultPhoto,
};

const STORAGE_KEY = "portfolio.profile.v1";

type Ctx = {
  profile: ProfileData;
  update: (patch: Partial<ProfileData>) => void;
  reset: () => void;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: ProfileData) => {
    setProfile(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        update: (patch) => persist({ ...profile, ...patch }),
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
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

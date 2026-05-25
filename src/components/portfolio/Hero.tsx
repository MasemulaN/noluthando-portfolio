import { ArrowRight, Github, Linkedin, Pencil } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { EditProfileDialog } from "./EditProfileDialog";

export function Hero() {
  const { profile } = useProfile();
  const [editing, setEditing] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-hero opacity-80 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-20 w-full">
        <div className="grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-14 animate-fade-up">
          <div className="relative mx-auto md:mx-0 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl" />
            <img
              src={profile.photo}
              alt={profile.name}
              width={192}
              height={192}
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-border shadow-card"
            />
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit profile"
              className="absolute bottom-1 right-1 p-2 rounded-full bg-primary text-primary-foreground border border-background shadow-md hover:opacity-90 transition"
            >
              <Pencil size={14} />
            </button>
          </div>

          <div className="text-center md:text-left">
            <p className="font-mono text-sm text-primary mb-3">Hi, I'm</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {profile.name}
            </h1>
            <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
              {profile.title}
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                View my work
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="/cv-noluthando-masemula.pdf"
                download
                className="hidden"
                aria-hidden
              />
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card/50 hover:bg-card transition font-medium"
              >
                <Pencil size={16} />
                Edit profile
              </button>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
                >
                  <Github size={18} />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileDialog open={editing} onOpenChange={setEditing} />
    </section>
  );
}

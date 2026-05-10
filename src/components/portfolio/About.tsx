import { useProfile } from "@/hooks/use-profile";

export function About() {
  const { profile } = useProfile();

  // Render bio as paragraphs, splitting on blank lines or single newlines.
  const paragraphs = profile.bio
    .split(/\n\s*\n|\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="relative py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-mono text-sm text-primary mb-3">About</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          A bit about me
        </h2>

        <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg text-left sm:text-center">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

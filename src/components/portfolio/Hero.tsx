import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-hero overflow-hidden pt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl animate-glow pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl animate-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-xs text-muted-foreground mb-8">
            <Sparkles size={14} className="text-primary" />
            Available for opportunities
          </div>

          <p className="font-mono text-sm text-primary mb-4">Hi, my name is</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Noluthando<br />
            <span className="text-gradient">Masemula.</span>
          </h1>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground tracking-tight">
            I build, automate &amp; deploy.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Software developer studying{" "}
            <span className="text-foreground">AI Foundations</span> &amp;{" "}
            <span className="text-foreground">Prompt Engineering</span>, on a
            mission to become a <span className="text-foreground">DevOps Engineer</span>.
            I love turning ideas into reliable, scalable systems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition glow"
            >
              View my work
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="/cv-noluthando-masemula.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border bg-card/50 backdrop-blur text-foreground font-medium hover:bg-card transition"
            >
              <Download size={16} />
              Download CV
            </a>
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

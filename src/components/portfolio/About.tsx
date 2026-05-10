import { Code2, Cloud, BrainCircuit } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Software Developer",
    text: "Crafting clean, maintainable code with a focus on solving real-world problems.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Prompt Engineering",
    text: "Currently studying AI Foundations and Prompt Engineering to build smarter products.",
  },
  {
    icon: Cloud,
    title: "Aspiring DevOps Engineer",
    text: "Passionate about CI/CD, cloud infrastructure, and automating everything in sight.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-sm text-primary mb-2">01. About</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              A bit about me
            </h2>
          </div>
          <div className="h-px flex-1 bg-border max-w-xs hidden md:block" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-foreground font-medium">Noluthando Masemula</span>,
              a software developer who genuinely enjoys building things — from clean
              user interfaces to the pipelines that ship them to production.
            </p>
            <p>
              Right now, I'm deepening my expertise through studies in{" "}
              <span className="text-foreground">AI Foundations</span> and{" "}
              <span className="text-foreground">Prompt Engineering</span>, while
              actively working toward a career as a{" "}
              <span className="text-foreground">DevOps Engineer</span>. I'm
              fascinated by the space where development meets operations: where
              automation, observability, and reliability come together.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new tools, contributing
              to side projects, and learning something new — because in tech, the
              learning never really stops.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="group p-5 rounded-xl border border-border bg-card/50 backdrop-blur hover:border-primary/50 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <h.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{h.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{h.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

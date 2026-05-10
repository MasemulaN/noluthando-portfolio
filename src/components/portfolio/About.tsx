export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-mono text-sm text-primary mb-3">About</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          A bit about me
        </h2>

        <div className="space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p>
            I'm <span className="text-foreground font-medium">Noluthando Masemula</span>,
            a software developer who enjoys turning ideas into clean,
            reliable products that people actually love using.
          </p>
          <p>
            My focus is modern web development with{" "}
            <span className="text-foreground">React</span>,{" "}
            <span className="text-foreground">TypeScript</span> and{" "}
            <span className="text-foreground">Node.js</span>. I'm also deeply
            curious about <span className="text-foreground">AI</span> and{" "}
            <span className="text-foreground">prompt engineering</span>, and how
            they shape the next generation of software.
          </p>
          <p>
            I believe the best code is simple, the best designs are intentional,
            and the best engineers never stop learning.
          </p>
        </div>
      </div>
    </section>
  );
}

const groups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Node.js", "Tailwind CSS", "Express"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Git", "GitHub Actions", "Docker", "Linux", "CI/CD", "AWS (learning)"],
  },
  {
    title: "AI & Tools",
    items: ["Prompt Engineering", "OpenAI APIs", "VS Code", "Figma"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-sm text-primary mb-2">02. Skills</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Tools I work with
            </h2>
          </div>
          <div className="h-px flex-1 bg-border max-w-xs hidden md:block" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g) => (
            <div
              key={g.title}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-mono"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, type FormEvent } from "react";
import { Mail, Send, Github, Linkedin, MapPin } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-28 bg-card/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-sm text-primary mb-2">04. Contact</p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Let's <span className="text-gradient">build something</span> together.
        </h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          I'm always open to chatting about new opportunities, collaborations,
          or just a friendly hello. Drop me a message below.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12 grid gap-4 text-left max-w-2xl mx-auto p-8 rounded-2xl border border-border bg-card/60 backdrop-blur card-glow"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground">Name</label>
              <input
                required
                type="text"
                placeholder="Your name"
                className="mt-1.5 w-full px-4 py-3 rounded-md bg-input/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground">Email</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full px-4 py-3 rounded-md bg-input/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Tell me about your project or just say hi…"
              className="mt-1.5 w-full px-4 py-3 rounded-md bg-input/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition glow"
          >
            {sent ? "Message sent ✓" : (<>Send message <Send size={16} /></>)}
          </button>
        </form>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 hover:text-primary transition"
          >
            <Mail size={16} /> hello@example.com
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary transition"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} /> South Africa
          </span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground font-mono">
      Designed &amp; built by Noluthando Masemula · © {new Date().getFullYear()}
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { ProfileProvider } from "@/hooks/use-profile";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Noluthando Masemula — Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Noluthando Masemula — software developer with an interest in AI and modern web technologies.",
      },
      { property: "og:title", content: "Noluthando Masemula — Portfolio" },
      {
        property: "og:description",
        content: "Software developer building modern web applications with React, TypeScript, and AI.",
      },
    ],
  }),
});

function Index() {
  return (
    <ProfileProvider>
      <main className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <Toaster />
      </main>
    </ProfileProvider>
  );
}

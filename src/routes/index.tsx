import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Contact, Footer } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Noluthando Masemula — Software Developer & Aspiring DevOps Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Noluthando Masemula — software developer studying AI Foundations & Prompt Engineering, building toward a DevOps career.",
      },
      { property: "og:title", content: "Noluthando Masemula — Portfolio" },
      {
        property: "og:description",
        content:
          "Software developer studying AI & Prompt Engineering, on a journey to becoming a DevOps Engineer.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

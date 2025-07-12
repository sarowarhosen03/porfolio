import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <footer className="bg-muted/30 py-8 text-center">
        <p className="text-muted-foreground">
          © 2024 Sarowar Hossain. Built with ❤️ using React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Index;

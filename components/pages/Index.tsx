import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Hero from "@/components/Hero";

import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { Project } from "@/lib/generated/prisma";

const Index = ({ data }: { data: [Project[]] }) => {
  const [projects] = data
  return (

    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="skills" >
        <Skills />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="projects">
        <Projects
          isHome={projects.length > 3}
          projects={projects.slice(0, 3)} />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>

  );
};

export default Index;

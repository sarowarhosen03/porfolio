import Contact from "@/components/Contact";
import Hero from "@/components/Hero";

import { SocialLink } from "@/app/dashboard/profile/action";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { PersonalInfo, Project, Skill } from "@/lib/generated/prisma";

const Index = ({ data }: { data: [PersonalInfo, Skill[], Project[]] }) => {
  const [personalInfo, skill, projects] = data
  return (

    <main>
      <section id="home">
        <Hero name={personalInfo.name} bio={personalInfo.description} socialLinks={personalInfo.socialLinks as SocialLink} />
      </section>
      <section id="skills" >
        <Skills skill={skill} />
      </section>
      <section id="projects">
        <Projects
          isHome={projects.length > 3}
          projects={projects} />
      </section>
      <section id="contact">
        <Contact
          personalInfo={personalInfo}
        />
      </section>
    </main>

  );
};

export default Index;

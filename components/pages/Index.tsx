import Contact from "@/components/Contact";
import Hero from "@/components/Hero";

import { SocialLink } from "@/app/dashboard/profile/action";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { PersonalInfo, Project, Skill } from "@/lib/generated/prisma";
import Navigation from "../Navigation";

const Index = ({ data }: { data: [PersonalInfo, Skill[], Project[]] }) => {
  const [personalInfo, skill, projects] = data
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero name={personalInfo.name} bio={personalInfo.description} socialLinks={personalInfo.socialLinks as SocialLink} />
        </section>
        <section id="skills" >
          <Skills skill={skill} />
        </section>
        <section id="projects">
          <Projects projects={projects} />
        </section>
        <section id="contact">
          <Contact
            personalInfo={personalInfo}
          />
        </section>
      </main>
      <footer className="bg-muted/30 py-8 text-center">
        <p className="text-muted-foreground">
          © 2025 Sarowar Hossain.
        </p>
      </footer>
    </div>
  );
};

export default Index;

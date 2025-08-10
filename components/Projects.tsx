import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/generated/prisma";
import { encodeSlug } from "@/lib/projectSlug";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Projects = ({
  projects
}: {
  projects: Project[]
}) => {
  // Sort projects to put featured ones first
  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });


  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`overflow-hidden group hover:shadow-glow transition-smooth border-0 ${project.featured ? 'lg:col-span-2' : ''
                }`}
            >
              <div className={`${project.featured ? 'md:flex' : ''}`}>
                {/* Project Image */}
                <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : ''
                  }`}>
                  <div className="aspect-video bg-gradient-primary/20 flex items-center justify-center">
                    <span className="text-muted-foreground">

                      {project.gallery.length ?
                        <Image
                          height={200}
                          width={300}
                          className="h-auto w-full"
                          src={project.gallery[0]}
                          alt="project image"
                        /> : "Project image"

                      }


                    </span>
                  </div>
                  <div
                    className="absolute inset-0  bg-gradient-primary/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <div className="flex gap-3">

                      {project.sourceCodeUrl && <Link href={project.sourceCodeUrl} target="_blank">
                        <Button variant="secondary" size="sm" className="shadow-lg">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      </Link>}
                      {project.liveUrl && <Link href={project.liveUrl} target="_blank">

                        <Button
                          variant="secondary" size="sm" className="shadow-lg">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      </Link>}

                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className={`p-6 ${project.featured ? 'md:w-1/2' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.featured && (
                      <Badge className="bg-gradient-primary text-xs">Featured</Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {/* <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button> */}
                    <Link
                      href={`/project/${encodeSlug(project.title, project.id)}`}
                    >
                      <Button variant="default" size="sm" className="flex-1 sm:flex-none bg-gradient-primary">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
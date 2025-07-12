import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "PostgreSQL", "Socket.io", "Tailwind"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and weather analytics.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Personal Blog",
      description: "A modern blog platform with markdown support, comment system, and admin dashboard for content management.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "MDX", "Tailwind", "Vercel"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    }
  ];

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
              className={`overflow-hidden group hover:shadow-glow transition-smooth border-0 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`${project.featured ? 'md:flex' : ''}`}>
                {/* Project Image */}
                <div className={`relative overflow-hidden ${
                  project.featured ? 'md:w-1/2' : ''
                }`}>
                  <div className="aspect-video bg-gradient-primary/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-primary/80 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm" className="shadow-lg">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      <Button variant="secondary" size="sm" className="shadow-lg">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
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
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="default" size="sm" className="flex-1 sm:flex-none bg-gradient-primary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from "@/components/ui/pagination";
import { Project } from "@/lib/generated/prisma";
import { encodeSlug } from "@/lib/projectSlug";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Projects = ({
  projects,
  isHome = false,
  currentPage,
  totalPages,
  totalProjects,
  itemsPerPage,
}: {
  isHome?: boolean;
  projects: Project[];
  currentPage?: number;
  totalPages?: number;
  totalProjects?: number;
  itemsPerPage?: number;
}) => {
  // Sort projects to put featured ones first
  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!currentPage || !totalPages) return [];

    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Show first page
      items.push(1);

      if (currentPage > 3) {
        items.push('ellipsis-start');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        items.push('ellipsis-end');
      }

      // Show last page
      if (totalPages > 1) {
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {isHome && <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </div>}

        {!isHome && <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">All Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through all my projects and work
          </p>
          {totalProjects && (
            <p className="text-sm text-muted-foreground mt-2">
              Showing {((currentPage || 1) - 1) * (itemsPerPage || 8) + 1} to {Math.min((currentPage || 1) * (itemsPerPage || 8), totalProjects)} of {totalProjects} projects
            </p>
          )}
        </div>}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="lg:col-span-2 text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  {!isHome && currentPage && currentPage > 1
                    ? "No projects found on this page. Try navigating to an earlier page."
                    : "No projects are currently available."
                  }
                </p>
                {!isHome && currentPage && currentPage > 1 && (
                  <Link
                    href="/project"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Go to First Page
                  </Link>
                )}
              </div>
            </div>
          ) : (
            projects.map((project) => (
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

                        <div className="aspect-video bg-gradient-primary/20 flex items-center justify-center">
                          {project.gallery.length ? (
                            <div className="flex items-center justify-center w-full h-full">
                              <Image
                                src={project.gallery[0]}
                                alt="project image"
                                width={600}
                                height={400}
                                className="h-full w-full object-cover"
                              />

                            </div>
                          ) : (
                            <span className="text-muted-foreground">Project image</span>
                          )}
                        </div>



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
                      {project?.subTitle}
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
            ))
          )}
        </div>

        {/* Pagination */}
        {!isHome && totalPages && totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                {currentPage && currentPage > 1 && (
                  <PaginationItem>
                    <Link
                      href={`/project?page=${currentPage - 1}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded-md hover:bg-accent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Link>
                  </PaginationItem>
                )}

                {/* Page Numbers */}
                {generatePaginationItems().map((item, index) => (
                  <PaginationItem key={index}>
                    {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                      <PaginationEllipsis />
                    ) : (
                      <Link
                        href={`/project?page=${item}`}
                        className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md transition-colors ${currentPage === item
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'text-muted-foreground hover:text-primary hover:bg-accent border border-border'
                          }`}
                      >
                        {item}
                      </Link>
                    )}
                  </PaginationItem>
                ))}

                {/* Next Button */}
                {currentPage && totalPages && currentPage < totalPages && (
                  <PaginationItem>
                    <Link
                      href={`/project?page=${currentPage + 1}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded-md hover:bg-accent"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* View All Projects Button */}
        {isHome && <div className="text-center mt-12">
          <Link href={"/project"} className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
            View All Projects
          </Link>
        </div>}
      </div>
    </section>
  );
};

export default Projects;
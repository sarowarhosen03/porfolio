import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import { Project } from '@/lib/generated/prisma'
import { encodeSlug } from '@/lib/projectSlug'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Projects = ({
  projects,
  isHome = false,
  currentPage,
  totalPages,
  totalProjects,
  itemsPerPage,
}: {
  isHome?: boolean
  projects: Project[]
  currentPage?: number
  totalPages?: number
  totalProjects?: number
  itemsPerPage?: number
}) => {
  // Sort projects to put featured ones first
  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!currentPage || !totalPages) return []

    const items = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Show first page
      items.push(1)

      if (currentPage > 3) {
        items.push('ellipsis-start')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(i)
        }
      }

      if (currentPage < totalPages - 2) {
        items.push('ellipsis-end')
      }

      // Show last page
      if (totalPages > 1) {
        items.push(totalPages)
      }
    }

    return items
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {isHome && (
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-gradient-primary">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              A showcase of my recent work and personal projects
            </p>
          </div>
        )}

        {!isHome && (
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-gradient-primary">All Projects</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Browse through all my projects and work
            </p>
            {totalProjects && (
              <p className="text-muted-foreground mt-2 text-sm">
                Showing {((currentPage || 1) - 1) * (itemsPerPage || 8) + 1} to{' '}
                {Math.min((currentPage || 1) * (itemsPerPage || 8), totalProjects)} of{' '}
                {totalProjects} projects
              </p>
            )}
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {projects.length === 0 ? (
            <div className="py-16 text-center lg:col-span-2">
              <div className="mx-auto max-w-md">
                <div className="mb-4 text-6xl">📂</div>
                <h3 className="mb-2 text-xl font-semibold">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  {!isHome && currentPage && currentPage > 1
                    ? 'No projects found on this page. Try navigating to an earlier page.'
                    : 'No projects are currently available.'}
                </p>
                {!isHome && currentPage && currentPage > 1 && (
                  <Link
                    href="/project"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 transition-colors"
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
                className={`group hover:shadow-glow transition-smooth h-full overflow-hidden border-0 ${project.featured ? 'lg:col-span-2' : ''}`}
              >
                <div className={`flex flex-col ${project.featured ? 'md:flex-row' : ''} h-full`}>
                  {/* Project Image */}
                  <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : ''}`}>
                    <div className="bg-gradient-primary/20 flex aspect-video items-center justify-center">
                      <span className="text-muted-foreground">
                        <div className="bg-gradient-primary/20 flex aspect-video items-center justify-center">
                          {project.gallery.length ? (
                            <div className="flex h-full w-full items-center justify-center">
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
                    <div className="bg-gradient-primary/80 transition-smooth absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        {project.sourceCodeUrl && (
                          <Link href={project.sourceCodeUrl} target="_blank">
                            <Button variant="secondary" size="sm" className="shadow-lg">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Button>
                          </Link>
                        )}
                        {project.liveUrl && (
                          <Link href={project.liveUrl} target="_blank">
                            <Button variant="secondary" size="sm" className="shadow-lg">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={`p-6 ${project.featured ? 'md:w-1/2' : ''} flex flex-1 flex-col`}>
                    <div className="mb-3 flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      {project.featured && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project?.subTitle}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex gap-3">
                      {/* <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Code className="h-4 w-4 mr-2" />
                      Code
                    </Button> */}
                      <Link href={`/project/${encodeSlug(project.title, project.id)}`}>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex-1 sm:flex-none"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
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
                      className="text-muted-foreground hover:text-primary border-border hover:bg-accent inline-flex items-center justify-center gap-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
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
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                          currentPage === item
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'text-muted-foreground hover:text-primary hover:bg-accent border-border border'
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
                      className="text-muted-foreground hover:text-primary border-border hover:bg-accent inline-flex items-center justify-center gap-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
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
        {isHome && (
          <div className="mt-12 text-center">
            <Link
              href={'/project'}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth px-8 py-3 text-lg"
            >
              View All Projects
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

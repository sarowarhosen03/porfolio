import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { decodeSlug } from '@/lib/projectSlug'
import resolvePromise from '@/lib/resolvePromise'
import { dbClient } from '@/prismaClient'
import { ArrowLeft, Calendar, Clock, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import ImageCarousel from '../_components/ImageCarousel'

export default async function projectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const { title, id } = decodeSlug(projectId)

  const [data, error] = await resolvePromise(
    dbClient.project.findFirst({
      where: {
        title: title,
      },
    })
  )
  if (error) {
    throw new Error('Failed to load project details')
  }
  if (!data) {
    notFound()
  }

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(data.description)
  const contentHtml = processedContent.toString()

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/project">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 transition-all hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        <div className="mx-auto max-w-6xl">
          <Card className="from-card to-card/80 overflow-hidden border-0 bg-gradient-to-r shadow-xl backdrop-blur-sm">
            {/* Image Carousel */}
            <div className="relative">
              <ImageCarousel gallery={JSON.stringify(data.gallery)} />
            </div>

            <CardContent className="p-6 md:p-8">
              {/* Project Header */}
              <div className="mb-8">
                <h1 className="from-primary to-accent mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                  {data.title}
                </h1>

                {/* Project Meta */}
                <div className="text-muted-foreground mb-6 flex flex-wrap items-center gap-4">
                  {data.createdAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(data.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  {data.updatedAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        Updated{' '}
                        {new Date(data.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {data.technologies.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-3 py-1 text-sm font-medium transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <div
                  className="markdown-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>

              {/* Project Links */}
              <div className="border-border flex flex-wrap gap-4 border-t pt-6">
                {data.liveUrl && (
                  <Link href={data.liveUrl} target="_blank">
                    <Button
                      size="lg"
                      className="from-primary to-primary/90 hover:from-primary/90 hover:to-primary bg-gradient-to-r shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                )}
                {data.sourceCodeUrl && (
                  <Link href={data.sourceCodeUrl} target="_blank">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Project, Skill } from '@/lib/generated/prisma'
import { Edit } from 'lucide-react'

import DeleteDialog from '@/components/comon/DeleteDialog'
import { useState } from 'react'
import AddAndEditProject from '../../_components/AddAndEditProject'
import { deleteProjectAction } from '../action'

export default function ProjectComponent({
  projects: data,
  skills,
}: {
  projects: Project[]
  skills: Skill[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [editState, setEditState] = useState<null | Project>(null)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <AddAndEditProject
          skills={skills}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editState={editState}
          setEditState={setEditState}
        />
      </div>

      <div className="grid gap-4">
        {data.map((project) => (
          <Card key={project.id} className="bg-gradient-card border-0 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.featured && (
                    <Badge className="bg-gradient-primary text-xs">Featured</Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{project.subTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditState(project)
                    setIsOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <DeleteDialog
                  id={project.id}
                  images={project.gallery}
                  title={project.title}
                  deleteAction={deleteProjectAction}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

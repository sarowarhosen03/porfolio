'use client'
import { Card } from '@/components/ui/card'
import { PersonalInfo, Project, Skill } from '@/lib/generated/prisma'
import { useState } from 'react'

import { toast } from 'sonner'

const Admin = ({
  data,
}: {
  data: {
    projects: Project[]
    skills: Skill[]
    personalInfo: PersonalInfo
  }
}) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB'],
      status: 'completed',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      technologies: ['Next.js', 'PostgreSQL', 'Socket.io'],
      status: 'in-progress',
      featured: true,
    },
  ])

  const [skills, setSkills] = useState([
    { id: 1, name: 'React', level: 88, category: 'Frontend' },
    { id: 2, name: 'Node.js', level: 85, category: 'Backend' },
    { id: 3, name: 'MongoDB', level: 78, category: 'Database' },
  ])

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
    toast.message('Project deleted', {
      description: 'The project has been successfully deleted.',
    })
  }

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id))
    toast.message('Skill deleted', {
      description: 'The skill has been successfully deleted.',
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-card border-0 p-6">
          <h3 className="mb-2 text-lg font-semibold">Total Projects</h3>
          <p className="text-primary text-3xl font-bold">{projects.length}</p>
        </Card>
        <Card className="bg-gradient-card border-0 p-6">
          <h3 className="mb-2 text-lg font-semibold">Skills</h3>
          <p className="text-primary text-3xl font-bold">{skills.length}</p>
        </Card>
        <Card className="bg-gradient-card border-0 p-6">
          <h3 className="mb-2 text-lg font-semibold">Featured Projects</h3>
          <p className="text-primary text-3xl font-bold">
            {projects.filter((p) => p.featured).length}
          </p>
        </Card>
      </div>

      <Card className="bg-gradient-card border-0 p-6">
        <h3 className="mb-4 text-xl font-semibold">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-success h-2 w-2 rounded-full"></div>
            <span>Added new project: Task Management App</span>
            <span className="text-muted-foreground ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-primary h-2 w-2 rounded-full"></div>
            <span>Updated React skill level</span>
            <span className="text-muted-foreground ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="bg-accent h-2 w-2 rounded-full"></div>
            <span>Profile information updated</span>
            <span className="text-muted-foreground ml-auto">3 days ago</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Admin

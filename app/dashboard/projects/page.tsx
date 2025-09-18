import resolvePromise from '@/lib/resolvePromise'
import { dbClient } from '@/prismaClient'
import ProjectComponent from './_components/Projects'

export default async function page() {
  // const [[totalProject, totalSkill, featuredProject], error] =
  const [data, error] = await resolvePromise(
    Promise.all([
      dbClient.project.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      dbClient.skill.findMany(),
    ])
  )

  if (error || !data) {
    return <div>Error loading dashboard data.</div>
  }

  const [projects, skills] = data

  return <ProjectComponent projects={projects} skills={skills} />
}

import Index from '@/components/pages/Index'
import resolvePromise from '@/lib/resolvePromise'
import { dbClient } from '@/prismaClient'

export default async function Home() {
  const [data, error] = await resolvePromise(
    Promise.all([
      dbClient.project.findMany({
        where: {
          status: 'PUBLISHED',
        },
        take: 4,
      }),
    ])
  )

  if (error) return <div>Error happened</div>
  if (!data || !data[0]) return <div>No personal info found</div>
  const [projects] = data

  return <Index data={[projects]} />
}

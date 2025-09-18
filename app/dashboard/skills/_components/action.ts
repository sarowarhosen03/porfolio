'use server'
import { Skill } from '@/lib/generated/prisma'
import resolvePromise from '@/lib/resolvePromise'
import { dbClient } from '@/prismaClient'
import { revalidatePath } from 'next/cache'

export async function addSkillAction(
  payload: Skill | Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>
) {
  delete (payload as Partial<Skill>).id
  const [data, error] = await resolvePromise(
    dbClient.skill.create({
      data: {
        ...payload,
        level: Number(payload.level),
      },
    })
  )

  if (error) return { success: false, error: 'Failed to add Skill.' }
  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard')
  revalidatePath('/')
  return { success: true, message: 'Skill added successfully!', data }
}

export async function editSkillAction(payload: Skill | Omit<Skill, 'createdAt' | 'updatedAt'>) {
  const [data, error] = await resolvePromise(
    dbClient.skill.update({
      where: {
        id: payload.id,
      },
      data: {
        ...payload,
        createdAt: undefined,
        updatedAt: undefined,
      },
    })
  )
  if (error) return { success: false, error: 'Failed to update Skill.' }
  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard')
  revalidatePath('/')

  return { success: true, message: 'Skill updated successfully!', data }
}

export async function deleteSkillAction(id: string) {
  const [data, error] = await resolvePromise(
    dbClient.skill.delete({
      where: {
        id: id,
      },
    })
  )
  if (error) return { success: false, error: 'Failed to deleted Skill.' }
  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard')
  return { success: true, message: 'Skill deleted successfully!', data }
}

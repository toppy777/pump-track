import { prisma } from '@/lib/prisma'
import { Exercise } from '@prisma/client'

export default async function getExercises(): Promise<Exercise[]> {
  const exercises = await prisma.exercise.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return exercises
}

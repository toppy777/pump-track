'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type ExerciseWithMuscles = Prisma.ExerciseGetPayload<{
  include: {
    muscles: true
  }
}>

export default async function getExercises(): Promise<ExerciseWithMuscles[]> {
  const exercises = await prisma.exercise.findMany({
    orderBy: {
      name: 'asc',
    },
    include: { muscles: true },
  })

  return exercises
}
